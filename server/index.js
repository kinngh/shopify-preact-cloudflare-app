import registerFileBasedRoutes from "@/utils/server-file-based-routing.js";
import { AutoRouter } from "itty-router";

const router = AutoRouter({ base: "/api" });
const routeModules = import.meta.glob("./**/{get,post,put,delete,options}.js", {
  eager: true,
});

registerFileBasedRoutes(router, routeModules);

//Register routes normally
router.all("*", () => ({ message: "404 Not found" }));

export default { ...router };
