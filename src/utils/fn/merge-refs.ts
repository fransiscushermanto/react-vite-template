import type { ForwardedRef, RefObject } from "react";

import isFn from "../validator/is-fn";

type RefCb<T> = (instance: T | null) => void;
type Ref<T> = RefCb<T> | RefObject<T>;

/**
 * Helper to help share reference
 *
 * @remarks
 * [Docs](https://www.davedrinks.coffee/how-do-i-use-two-react-refs/)
 *
 * @returns method - function to execute all ForwaredRef
 *
 * @example
 * ```tsx
 *
 * const ForwaredComponent = forwardRef<HTMLDivElement, ForwaredComponentProps>((props, ref) => {
 *   const localRef = useRef<HTMLDivElement>(null);
 *
 *   return <div ref={mergeRefs(ref, localRef)}/>
 * })
 *
 * ```
 */
export const mergeRefs = <T = unknown>(...refs: ForwardedRef<T>[]) => {
  const filteredRefs = refs.filter(Boolean) as Ref<T>[];

  return (inst: T) =>
    filteredRefs.forEach((ref) =>
      isFn(ref) ? ref(inst) : (ref.current = inst),
    );
};
