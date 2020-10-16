"use strict";

const { sanitizeEntity, parseMultipartData } = require("strapi-utils");
const pluginId = "python-script-executor";
const modelName = "script";
const socketChannel = "console";
/**
 * Script.js controller
 *
 * @description: A set of functions called "actions" of the `python-script-executor` plugin.
 */

module.exports = {
  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx) => {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.query(modelName, pluginId).search(ctx.query);
    } else {
      entities = await strapi.query(modelName, pluginId).find(ctx.query);
    }
    const scripts = entities.map((entity) =>
      sanitizeEntity(entity, {
        model: strapi.query(modelName, pluginId).model,
      })
    );
    ctx.body = {
      data: scripts,
    };
  },

  findOne: async (ctx) => {
    const { id } = ctx.params;
    const entities = await strapi.query(modelName, pluginId).find({ id: id }); //OK
    const scripts = entities.map((entity) =>
      sanitizeEntity(entity, {
        model: strapi.query(modelName, pluginId).model,
      })
    );
    ctx.body = {
      data: scripts,
    };
  },

  store: async (ctx) => {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.query(modelName, pluginId).create(data, { files });
    } else {
      entity = await strapi.query(modelName, pluginId).create(ctx.request.body);
    }
    const result = sanitizeEntity(entity, {
      model: strapi.query(modelName, pluginId).model,
    });
    ctx.body = {
      data: result,
    };
  },

  update: async (ctx) => {
    ctx.noContent();
  },

  delete: async (ctx) => {
    ctx.noContent();
  },

  executeCommand: async (ctx) => {
    const { socketId, id, isForceUpdate } = ctx.request.body;

    const entity = await strapi.query(modelName, pluginId).findOne({ id: id });
    if (!entity) {
      ctx.badRequest("Script is not exist");
    }

    const { spawn } = require("child_process");
    let ls;

    var pythonExecutable = "python3";

    if (entity.params) {
      ls = spawn(
        pythonExecutable,
        [entity.script, ...entity.params.split(" ")],
        {
          cwd: entity.location,
        }
      );
    } else {
      ls = spawn(pythonExecutable, [entity.script], { cwd: entity.location });
    }

    ls.stdout.on("data", (data) => {
      strapi.io.to(socketId).emit(socketChannel, `${data}`);
    });

    ls.stderr.on("data", (data) => {
      strapi.io.to(socketId).emit(socketChannel, `${data}`);
    });

    ls.on("error", (error) => {
      strapi.io.to(socketId).emit(socketChannel, `${error.message}`);
    });

    ls.on("close", (code) => {
      strapi.io.to(socketId).emit(socketChannel, `${code}`);
    });

    ctx.body = {
      message: "Your script was executed",
    };
  },
};
