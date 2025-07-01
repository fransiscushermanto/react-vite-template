import type {
  UseFormProps as DefaultUseFormProps,
  FieldValues,
  UseFormReturn as DefaultUseFormReturn,
} from "react-hook-form";

import type { FormProviderProps } from "./components/form-provider";

export type UseFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
> = DefaultUseFormProps<TFieldValues, TContext>;

export interface UseFormReturn<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
> extends DefaultUseFormReturn<TFieldValues, TContext>,
    Pick<FormProviderProps, "scrollToFieldOnError" | "fieldsRef"> {}
