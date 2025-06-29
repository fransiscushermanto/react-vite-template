import express from "express";

import COOKIES_KEY from "../../src/constants/cookies";

const router = express.Router();

router.post("/login", (req, res, next) => {
  const { referer = "" } = req.headers;
  const { access_token } = req.cookies;

  if (!access_token) {
    next();
    return;
  }

  res.cookie("is_logged_in", "true");

  const url = new URL(referer);
  const protocol = req.protocol;
  const host = req.get("host");
  const nextPath = url.searchParams.get("next") ?? "";
  url.searchParams.delete("next");
  const newURL = new URL(`/${nextPath}${url.search}`, `${protocol}://${host}`);

  res.redirect(302, newURL.toString());
});

router.post("/logout", (_, res) => {
  res.clearCookie(COOKIES_KEY.ACCESS_TOKEN, {
    path: "/",
    domain: ".julo.co.id",
  });
  res.clearCookie(COOKIES_KEY.IS_LOGGED_IN);

  res.status(204).end();
});

export default router;
