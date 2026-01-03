import RouterView from "@attayjs/client";
import { render } from "preact";
import { LocationProvider } from "preact-iso";

export function App() {
  return (
    <LocationProvider>
      <RouterView />
    </LocationProvider>
  );
}

render(<App />, document.getElementById("shopify-app"));
