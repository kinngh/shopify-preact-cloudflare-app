import { AutoRouter } from "itty-router";

const router = AutoRouter({ base: "/api" });


//TODO: File based routing + middleware
router
  .get("/json", () => ({ foo: "bar" }))
  .all("*", () => ({ message: "404 Not found" }));

export default { ...router };
