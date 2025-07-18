import { css } from "@styled-system/css";

export const errorCss = css({
  width: "100%",
  minH: ["100vh", "100dvh"],

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  padding: "8",

  "& .error": {
    "&__title": {
      fontWeight: "bold",
      fontSize: "5xl",
    },

    "&__details": {
      maxW: "100%",
      mt: "4",
      fontSize: "2xl",
      textAlign: "center",
      backgroundColor: "token(colors.gray.100)",

      borderRadius: "md",
      padding: "4",

      "& code": {
        display: "block",

        whiteSpace: "break-spaces",
        textAlign: "left",
        fontSize: "lg",
      },
    },
  },
});
