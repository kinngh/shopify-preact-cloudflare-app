import crypto from "crypto";
import shopifyProvider from "@/utils/shopify";

const verifyHmac = async (request, env) => {
  const { shopify } = await shopifyProvider(env);
  try {
    const generateHash = crypto
      .createHmac("SHA256", process.env.SHOPIFY_API_SECRET)
      .update(JSON.stringify(request.body), "utf8")
      .digest("base64");

    const hmac = request.headers["x-shopify-hmac-sha256"];

    if (shopify.auth.safeCompare(generateHash, hmac)) {
      //   await next();
    } else {
      return Response.json(
        { success: "false", message: "HMAC verification failed" },
        { status: 401 }
      );
    }
  } catch (e) {
    console.log(`---> An error occured while verifying HMAC`, e.message);

    return Response.json(
      {
        success: false,
        message: "HMAC verification failed",
      },
      { status: 401 }
    );
  }
};

export default verifyHmac;
