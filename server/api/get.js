/**
 * Request object enriched by itty-router (for example with `params`, `query`, etc.).
 *
 * @typedef {Request & {
 *   params?: Record<string, string>,
 *   query?: Record<string, string>,
 *   route?: string,
 *   [key: string]: unknown,
 * }} ApiRouteRequest
 *
 * @param {ApiRouteRequest} request
 * @param {Record<string, unknown>} env
 * @returns {Response}
 */
function handler(request, env) {
  console.log(env.MY_VARIABLE);

  return Response.json({
    message: "hi from /api",
    variable: env?.MY_VARIABLE ?? "None found",
  });
}

export default handler;
