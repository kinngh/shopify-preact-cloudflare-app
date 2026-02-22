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
 * @param {ApiRouteRequest} context
 * @returns {Response}
 */
function handler(context) {
  return Response.json({ message: "hi from /api" });
}

export default handler;
