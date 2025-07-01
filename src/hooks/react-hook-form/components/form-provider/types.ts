import type { RefObject } from "react";
import type {
  FormProviderProps as DefaultFormProviderProps,
  FieldValues,
} from "react-hook-form";

export interface FormProviderProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
> extends DefaultFormProviderProps<TFieldValues, TContext> {
  fieldsRef: RefObject<Record<string, HTMLElement | null>>;
  scrollToFieldOnError?: boolean;
}

export interface FormContextProps {
  fieldsRef: RefObject<Record<string, HTMLElement | null>>;
}
