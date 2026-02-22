import { AutoRouter } from "itty-router";
import registerFileBasedRoutes from "../../utils/server-file-based-routing";

const router = AutoRouter({ base: "/api" });

const routeModules = import.meta.glob("./**/{get,post,put,delete,options}.js", {
  eager: true,
});

registerFileBasedRoutes(router, routeModules);

router.all("*", () => ({ message: "404 Not found" }));

export default { ...router };
