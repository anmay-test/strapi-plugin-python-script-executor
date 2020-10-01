module.exports = async (ctx, next) => {
  if (ctx.state.user) {
    // strapi-super-admin
    if (
      ctx.state.user.roles.some((role) => role.code === "strapi-super-admin")
    ) {
      // Go to next policy or will reach the controller's action.
      return await next();
    }
  }

  // ctx.forbidden(`You're not Super Admin!`);
  throw strapi.errors.forbidden(`You're not Super Admin!`);
};
