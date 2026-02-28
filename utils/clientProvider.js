import sessionHandler from "./sessionHandler";
import Cryptr from "cryptr";

// const cryption = new Cryptr(env.ENCRYPTION_STRING);

const online = {
  graphqlClient: async () => {},
  storefrontClient: async () => {},
};
const offline = {
  graphqlClient: async () => {},
  storefrontClient: async () => {},
};

const clientProvider = {
  offline,
  online,
};

export default clientProvider;
