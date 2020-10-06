"use strict";

//I only need this if I am returning content type data/collection
//parseMultipartData is used when get all data from submitted form with files - upload files
// const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
const { sanitizeEntity, parseMultipartData } = require("strapi-utils");
const pluginId = "strapi-plugin-python-script-executor";
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
    //to access underline model, use this: strapi.query(modelName, plugin).model;
    let entities;
    if (ctx.query._q) {
      entities = await strapi.query(modelName, pluginId).search(ctx.query);
    } else {
      entities = await strapi.query(modelName, pluginId).find(ctx.query);
    }
    // const scripts = await strapi.query("script", "python-script-executor").search(); //OK
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
      // console.log(ctx.request.body);
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
      ctx.badRequest("Command is not exist");
    }

    const { spawn } = require("child_process");
    let ls;

    /** ******************/
    var myPythonScript = "../scripts/src/programs/program.py";
    var pythonExecutable = "python";

    // Function to convert an Uint8Array to a string
    // var uint8arrayToString = function (data) {
    //   return String.fromCharCode.apply(null, data);
    // };

    // // spawn = require("child_process").spawn;
    // const scriptExecution = spawn(pythonExecutable, [myPythonScript]);
    // // Handle normal output
    // scriptExecution.stdout.on("data", (data) => {
    //   strapi.io.to(socketId).emit(socketChannel, `${data}`);
    //   console.log(`${data}`);
    // });

    // // Handle error output
    // scriptExecution.stderr.on("data", (data) => {
    //   // As said before, convert the Uint8Array to a readable string.
    //   console.log(uint8arrayToString(data));
    //   strapi.io.to(socketId).emit(socketChannel, `${data}`);
    //   // console.log(`${data}`);
    // });

    // scriptExecution.on("exit", (code) => {
    //   console.log("Process quit with code : " + code);
    //   strapi.io.to(socketId).emit(socketChannel, `${code}`);
    //   // console.log(`${code}`);
    // });

    // ctx.send({
    //   message: "ok",
    // });

    /** ******************/
    // ls = spawn("python", ["program.py", "PBDCIS"], {
    //   cwd: entity.location,
    // });
    if (entity.params) {
      console.log([entity.script, ...entity.params.split(" ")]);
      ls = spawn(
        pythonExecutable,
        [entity.script, ...entity.params.split(" ")],
        {
          cwd: entity.location,
        }
      );
    } else {
      console.log([entity.script]);
      ls = spawn(pythonExecutable, [entity.script], { cwd: entity.location });
    }

    // if (entity.params) {
    //   ls = spawn(entity.script, entity.params.split(" "), { cwd: "./" });
    // } else {
    //   ls = spawn(entity.script, [], { cwd: "./" });
    // }

    // ls = spawn(pythonExecutable, myPythonScript, { cwd: "./" });
    // ls = spawn(entity.script, "__main__.py PBDCIS".split(" "), {
    //   cwd: "../scripts/src/programs/",
    // });

    ls.stdout.on("data", (data) => {
      strapi.io.to(socketId).emit(socketChannel, `${data}`);
      console.log(`${data}`);
    });

    ls.stderr.on("data", (data) => {
      strapi.io.to(socketId).emit(socketChannel, `${data}`);
      console.log(`${data}`);
    });

    ls.on("error", (error) => {
      strapi.io.to(socketId).emit(socketChannel, `${error.message}`);
      console.log(`${error}`);
    });

    ls.on("close", (code) => {
      strapi.io.to(socketId).emit(socketChannel, `${code}`);
      console.log(`${code}`);
    });

    ctx.body = {
      message: "Your command was executed",
    };
  },
};
