import { AutoRouter } from "itty-router";
import registerFileBasedRoutes from "@/utils/server-file-based-routing.js";

/**
 * itty-router instance mounted under `/api`.
 */
const router = AutoRouter({ base: "/api" });

/**
 * Eager route module map for file-based routing.
 * Keys are file paths and values are route modules with a default handler export.
 *
 * @type {Record<string, { default?: unknown }>}
 */
const routeModules = import.meta.glob("./**/{get,post,put,delete,options}.js", {
  eager: true,
});

registerFileBasedRoutes(router, routeModules);

router.all("*", () => ({ message: "404 Not found" }));

export default { ...router };
