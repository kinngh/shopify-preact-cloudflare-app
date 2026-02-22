const SUPPORTED_METHODS = new Set(["get", "post", "put", "delete", "options"]);

/**
 * @typedef {{ default?: unknown }} RouteModule
 */

/**
 * @typedef {{
 *   method: "get" | "post" | "put" | "delete" | "options",
 *   path: string,
 *   filePath: string,
 *   handler: Function
 * }} ParsedRoute
 */

/**
 * Converts a route module path into itty-router method + path.
 * Keeps all folder segments as-is to support itty patterns such as:
 * `:id`, `:action?`, `:url+`, `*`, and `:file.:extension`.
 *
 * @param {string} filePath
 * @returns {{ method: string, path: string } | null}
 */
function parseFilePath(filePath) {
  const normalizedPath = filePath.replace(/\\/g, "/").replace(/^\.\//, "");
  const segments = normalizedPath.split("/").filter(Boolean);
  const fileName = segments.pop();

  if (!fileName || !fileName.endsWith(".js")) {
    return null;
  }

  const method = fileName.slice(0, -3).toLowerCase();
  if (!SUPPORTED_METHODS.has(method)) {
    return null;
  }

  const path = segments.length === 0 ? "/" : `/${segments.join("/")}`;
  return { method, path };
}

/**
 * Scores a route path so more specific routes are registered first.
 * @param {string} path
 * @returns {{ score: number, segmentCount: number, wildcardCount: number, dynamicCount: number }}
 */
function getPathSpecificityMetrics(path) {
  if (path === "/") {
    return { score: 0, segmentCount: 0, wildcardCount: 0, dynamicCount: 0 };
  }

  const segments = path.slice(1).split("/");
  return segments.reduce(
    (metrics, segment) => {
      if (segment === "*") {
        metrics.wildcardCount += 1;
        return metrics;
      }
      if (segment.startsWith(":")) {
        metrics.dynamicCount += 1;
        if (segment.includes("+")) {
          metrics.score += 1;
          return metrics;
        }
        if (segment.includes("?")) {
          metrics.score += 1;
          return metrics;
        }
        metrics.score += 2;
        return metrics;
      }
      metrics.score += 3;
      return metrics;
    },
    { score: 0, segmentCount: segments.length, wildcardCount: 0, dynamicCount: 0 },
  );
}

/**
 * @param {ParsedRoute} a
 * @param {ParsedRoute} b
 * @returns {number}
 */
function compareRoutes(a, b) {
  const aMetrics = getPathSpecificityMetrics(a.path);
  const bMetrics = getPathSpecificityMetrics(b.path);

  const scoreDiff = bMetrics.score - aMetrics.score;
  if (scoreDiff !== 0) {
    return scoreDiff;
  }

  const wildcardDiff = aMetrics.wildcardCount - bMetrics.wildcardCount;
  if (wildcardDiff !== 0) {
    return wildcardDiff;
  }

  const dynamicDiff = aMetrics.dynamicCount - bMetrics.dynamicCount;
  if (dynamicDiff !== 0) {
    return dynamicDiff;
  }

  const segmentCountDiff = bMetrics.segmentCount - aMetrics.segmentCount;
  if (segmentCountDiff !== 0) {
    return segmentCountDiff;
  }

  return a.filePath.localeCompare(b.filePath);
}

/**
 * Registers routes into an itty router from a Vite glob module map.
 *
 * Expected route module shape:
 * `export default function handler(request, ...args) {}`
 *
 * Path convention:
 * - Folders become route segments (`todos/:id/:action?`)
 * - File name becomes method (`get.js`, `post.js`, `put.js`, `delete.js`, `options.js`)
 *
 * @param {{ [method: string]: Function }} router
 * @param {Record<string, RouteModule>} routeModules
 * @returns {ParsedRoute[]}
 */
export default function registerFileBasedRoutes(router, routeModules) {
  /** @type {ParsedRoute[]} */
  const parsedRoutes = [];

  for (const [filePath, routeModule] of Object.entries(routeModules)) {
    const parsedPath = parseFilePath(filePath);
    if (!parsedPath) {
      continue;
    }

    const handler = routeModule?.default;
    if (typeof handler !== "function") {
      throw new TypeError(
        `Route file "${filePath}" must export a default handler function`,
      );
    }

    parsedRoutes.push({
      method: /** @type {ParsedRoute["method"]} */ (parsedPath.method),
      path: parsedPath.path,
      filePath,
      handler,
    });
  }

  parsedRoutes.sort(compareRoutes);

  for (const route of parsedRoutes) {
    router[route.method](route.path, route.handler);
  }

  return parsedRoutes;
}
