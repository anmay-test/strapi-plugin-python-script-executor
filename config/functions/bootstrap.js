const pluginId = require("../../admin/src/pluginId");
module.exports = async () => {
  const io = require("socket.io")(strapi.server);
  io.on("connection", async (socket) => {
    socket.on("disconnect", (...data) => {
      socket.removeAllListeners();
    });
  });

  strapi.io = io;

  const actions = [
    {
      section: "plugins",
      displayName: "Read",
      uid: "read",
      pluginName: `${pluginId}`,
    },
  ];

  const { actionProvider } = strapi.admin.services.permission;
  actionProvider.register(actions);
};
