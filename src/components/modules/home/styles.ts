import { css } from "@styled-system/css";

export const homeCss = css({
  w: "token(100dvw,100vw)",
  h: "token(100dvh, 100vh)",

  display: "flex",
  flexDirection: "column",

  py: "20",

  textAlign: "center",

  "& .text-wrapper": {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    w: "full",
  },

  "& .home": {
    "&__title": {
      fontSize: "4xl",
      "& a": {
        color: "token(colors.blue.500)",
        fontWeight: "bold",
        "&:hover": {
          textDecoration: "underline",
        },
      },
    },

    "&__subtitle": {
      mt: "2",
      fontSize: "2xl",
    },

    "&__cards": {
      mt: "auto",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      flexWrap: "wrap",

      gap: "4",
      "&__card": {
        cursor: "pointer",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        width: "18.75rem",
        height: "150px",

        padding: "4",
        borderRadius: "md",
        border: "1px solid token(colors.gray.200)",

        transition: "background-color 0.2s, box-shadow 0.2s",

        "&:hover": {
          backgroundColor: "token(colors.gray.50)",
          boxShadow: "0 1px 3px token(colors.gray.300)",
        },

        "& h3": {
          fontSize: "lg",
          fontWeight: "bold",
        },

        "& p": {
          fontSize: "sm",
          color: "token(colors.gray.600)",
        },
      },
    },
  },

  "& .footer-notes": {
    mt: "4",
    fontSize: "sm",
    color: "token(colors.gray.500)",
    "& a": {
      color: "token(colors.blue.500)",
      textDecoration: "underline",
    },
  },
});
