/**
 * Helper to help execute multiple function in HOF way
 *
 * @remarks
 * [HOF](https://www.freecodecamp.org/news/higher-order-functions-in-javascript/)
 *
 * @param fns - Array of function that need to be executed
 *
 * @returns method - function to execute all fn that is passed
 *
 * @example
 * ```tsx
 *
 * const ExtendComponent = (props: ExtendComponentProps) => {
 *   const {onClick, ...resProps} = props;
 *
 *   function defaultOnClick() {
 *     // some code
 *   }
 *
 *   return <Component onClick={callAllFn(defaultOnClick, onClick)} {...resProps}/>
 * }
 *
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const callAllFn = <T extends (...args: any[]) => any>(
  ...fns: (T | undefined)[]
): ((...args: Parameters<T>) => void) => {
  return (...args: Parameters<T>) => {
    fns.forEach((fn) => {
      if (typeof fn === "function") {
        fn(...args);
      }
    });
  };
};
