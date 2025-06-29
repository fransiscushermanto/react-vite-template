import { pascalCamelSplit } from "./pascal-camel-split";

export function kebabize(text: string) {
  const splittedText = pascalCamelSplit(text);

  return splittedText.map((v) => v.toLowerCase()).join("-");
}
