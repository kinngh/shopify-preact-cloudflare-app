import { LogSeverity, shopifyApi } from "@shopify/shopify-api";
import "@shopify/shopify-api/adapters/cf-worker";
import clientProvider from "@/utils/clientProvider.js";

const shopifyProvider = async (env) => {
  const isDev = env.NODE_ENV === "development";

  // Setup Shopify configuration
  let shopify = shopifyApi({
    apiKey: env.SHOPIFY_API_KEY,
    apiSecretKey: env.SHOPIFY_API_SECRET,
    scopes: env.SHOPIFY_API_SCOPES,
    hostName: env.SHOPIFY_APP_URL.replace(/https:\/\//, ""),
    hostScheme: "https",
    apiVersion: env.SHOPIFY_API_VERSION,
    isEmbeddedApp: true,
    logger: { level: isDev ? LogSeverity.Info : LogSeverity.Error },
  });

  return { shopify, clientProvider };
};
export default shopifyProvider;
