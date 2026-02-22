import type { ComponentChildren } from "preact";
import "@shopify/polaris-types";

/**
 * Polaris web components are declared across multiple JSX namespaces.
 * In Preact projects this can make `children` resolve to an overly strict type.
 *
 * This shim keeps the existing Polaris element props, but rewrites `children`
 * for all `s-*` elements to use Preact's `ComponentChildren`.
 */
type PolarisIntrinsicElements = globalThis.JSX.IntrinsicElements;

type PolarisElementsWithPreactChildren = {
  [K in keyof PolarisIntrinsicElements as K extends `s-${string}`
    ? K
    : never]: PolarisIntrinsicElements[K] extends { children?: unknown }
    ? Omit<PolarisIntrinsicElements[K], "children"> & {
        children?: ComponentChildren;
      }
    : PolarisIntrinsicElements[K] & {
        children?: ComponentChildren;
      };
};

declare module "preact/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements extends PolarisElementsWithPreactChildren {}
  }
}
