//!
//TODO: Do I want to write `@attayjs/server` for routing on CF workers, or use itty-router?
//!

export default {
  /**
   * @param {Request} request
   * @param {Object} env //! Should probably be doing something to read from env and spitting out types?
   * @param {ExecutionContext} ctx
   * @returns {Response}
   */
  fetch(request, env, ctx) {
    const url = new URL(request.url);
    console.log(url);

    if (url.pathname.startsWith("/api")) {
      return Response.json({
        name: "Cloudflare",
      });
    }

    return new Response(null, { status: 404 });
  },
};
