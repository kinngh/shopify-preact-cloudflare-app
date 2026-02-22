import serverRouter from "@/server/serverRouter.js";
import { AutoRouter } from "itty-router";

const router = AutoRouter();
const routeModules = import.meta.glob(
  "./api/**/{get,post,put,delete,options}.js",
  {
    eager: true,
  }
);

serverRouter(router, routeModules);

//Register routes normally
router.all("*", () =>
  Response.json({ message: "404 Not found" }, { status: 404 })
);

export default { ...router };
