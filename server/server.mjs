import express from "express";
import mime from "mime-types";

import * as db from "./db.mjs";

const app = express();
const port = process.env.PORT || 4000;

const sightings = express.Router();
// get sightings
sightings.get("/", async (request, response) => {
  const sightings = await db.getSightings();
  response.json(sightings);
});

// for post method
sightings.use(express.json());
// sightings.post("/", async (request, response) => {
//   const { name } = request.body;
//   const task = await db.addTask(name);
//   response.status(201).json(task);
// });

app.use("/api/sightings", sightings);

app.get("/api/ping", (request, response) =>
  response.json({ response: "pong" }),
);

if (process.env?.SERVE_REACT?.toLowerCase() === "true") {
  app.use(
    express.static("/app", {
      maxAge: "1d",
      setHeaders: (res, path) =>
        ["application/json", "text/html"].includes(mime.lookup(path)) &&
        res.setHeader("Cache-Control", "public, max-age=0"),
    }),
  );

  app.get("*", (req, res) => {
    res.sendFile("/app/index.html");
  });
}

app.listen(port, () => {
  console.info(`Example server listening at http://localhost:${port}`);
});
