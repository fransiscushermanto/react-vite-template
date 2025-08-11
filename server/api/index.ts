import express from "express";

import auth from "./auth";

export const api = express.Router();

api.get("/health", (_, res) => {
  res.status(200).send({ message: "SSR API Healthy" });
});

api.use("/auth", auth);

export default api;
