export function pascalCamelSplit(
  text: string,
  caseType: "PASCAL" | "CAMEL" = "PASCAL",
) {
  return (
    text
      // Look for long acronyms and filter out the last letter
      .replace(/([A-Z]+)([A-Z][a-z])/g, " $1 $2")
      // Look for lower-case letters followed by upper-case letters
      .replace(/([a-z\d])([A-Z])/g, "$1 $2")
      // Look for lower-case letters followed by numbers
      .replace(/([a-zA-Z])(\d)/g, "$1 $2")
      .replace(/^./, function (str) {
        if (caseType === "CAMEL") return str;

        return str.toUpperCase();
      })
      // Remove any white space left around the word
      .trim()
      .split(" ")
  );
}
