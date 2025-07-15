import type { FieldValues, Path, UseFormSetError } from "react-hook-form";

function setErrors<T extends FieldValues>(
  errors: T | Record<string, string>,
  setError: UseFormSetError<T>,
  options: { shouldFocus: boolean } = { shouldFocus: false },
) {
  if (typeof errors !== "object" || !errors) return;

  Object.entries(errors).forEach(([name, message]) => {
    setError(name as Path<T>, { message, type: "http-error" }, options);
  });
}

export default setErrors;
