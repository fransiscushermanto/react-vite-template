import { useRef } from "react";
import { type FieldValues, useForm as useDefaultForm } from "react-hook-form";

import type { UseFormProps, UseFormReturn } from "./types";

const useForm = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
>(
  props: UseFormProps<TFieldValues, TContext> = {},
): UseFormReturn<TFieldValues, TContext> => {
  const form = useDefaultForm<TFieldValues, TContext>(props);

  const fieldsRef = useRef<Record<string, HTMLElement | null>>({});

  return { fieldsRef, ...form };
};

export default useForm;
