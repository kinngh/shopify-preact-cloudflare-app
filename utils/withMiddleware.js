/**
 * Additional worker/runtime arguments passed by itty-router after `request`.
 * In Cloudflare Workers, this is typically `(env, executionCtx)`.
 *
 * @typedef {unknown[]} RouteArgs
 */

/**
 * Request object enriched by itty-router (for example with `params`, `query`, etc.).
 *
 * @typedef {Request & {
 *   params?: Record<string, string>,
 *   query?: Record<string, string>,
 *   route?: string,
 *   [key: string]: unknown,
 * }} RouteRequest
 */

/**
 * @typedef {(request: RouteRequest, ...args: RouteArgs) => unknown | Promise<unknown>} RouteHandler
 */

/**
 * @typedef {(request: RouteRequest, ...args: RouteArgs) => unknown | Promise<unknown> | undefined} Middleware
 */

/**
 * Composes middlewares with a final route handler.
 * Middlewares execute in order and can short-circuit by returning any value other than `undefined`.
 *
 * Handler signature:
 * `handler(request, env, executionCtx, ...rest)`
 *
 * @param {...(Middleware | RouteHandler)} functions
 * @returns {RouteHandler}
 */
export function withMiddleware(...functions) {
  if (functions.length === 0) {
    throw new TypeError("withMiddleware requires at least one function");
  }

  const handler = functions[functions.length - 1];
  const middlewares = functions.slice(0, -1);

  if (typeof handler !== "function") {
    throw new TypeError("withMiddleware expects the final argument to be a function");
  }

  for (const middleware of middlewares) {
    if (typeof middleware !== "function") {
      throw new TypeError("withMiddleware expects every middleware to be a function");
    }
  }

  return async function runWithMiddleware(request, ...args) {
    for (const middleware of middlewares) {
      const result = await middleware.call(this, request, ...args);
      if (result !== undefined) {
        return result;
      }
    }

    return handler.call(this, request, ...args);
  };
}

export default withMiddleware;
