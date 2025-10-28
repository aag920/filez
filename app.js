import express from "express";
const app = express();
export default app;

import foldersRouter from "#api/folders-router";
import filesRouter from "#api/files-router";

app.use(express.json());

app.use("/folders", foldersRouter);
app.use("/files", filesRouter);

app.use((err, req, res, next) => {
  if (err.code === "23505") {
    return res.status(400).send(err.detail);
  }

  next(err);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.send(500).send("Sorry! Something went wrong.");
});
