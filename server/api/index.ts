import express from "express";

import auth from "./auth";

export const api = express.Router();

api.use("/auth", auth);

export default api;
