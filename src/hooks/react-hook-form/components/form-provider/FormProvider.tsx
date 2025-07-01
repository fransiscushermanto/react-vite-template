import { createContext } from "react";
import {
  FormProvider as DefaultFormProvider,
  type FieldValues,
} from "react-hook-form";

import useScrollOnFieldError from "./usecase/use-scroll-on-field-error";
import type { FormContextProps, FormProviderProps } from "./types";

// eslint-disable-next-line react-refresh/only-export-components
export const FormContext = createContext<FormContextProps>({
  fieldsRef: { current: {} },
});

const FormProvider = <TFieldValues extends FieldValues, TContext = unknown>(
  props: FormProviderProps<TFieldValues, TContext>,
) => {
  const {
    fieldsRef,
    children,
    scrollToFieldOnError = false,
    formState,
    ...resProps
  } = props;

  useScrollOnFieldError({
    errors: formState.errors,
    fieldsRef,
    scrollToFieldOnError,
    submitCount: formState.submitCount,
  });

  return (
    <DefaultFormProvider<TFieldValues, TContext>
      formState={formState}
      {...resProps}
    >
      <FormContext.Provider value={{ fieldsRef }}>
        {children}
      </FormContext.Provider>
    </DefaultFormProvider>
  );
};

export default FormProvider;
