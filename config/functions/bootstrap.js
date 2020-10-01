const pluginId = require("../../admin/src/pluginId");
module.exports = async () => {
  const io = require("socket.io")(strapi.server);
  io.on("connection", async (socket) => {
    console.log("a user connected", socket.id);
    socket.emit("hello", "can you hear me?", 1, 2, "abc");
    socket.on("fromClient", (...data) => {
      console.log("message from client", data);
    });

    socket.on("disconnecting", () => {
      const rooms = Object.keys(socket.rooms);
      console.log("a user is disconnecting", rooms);
      // the rooms array contains at least the socket ID
    });

    socket.on("disconnect", (...data) => {
      socket.removeAllListeners();
      console.log("a user disconnected", data);
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
