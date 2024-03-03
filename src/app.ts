import "dotenv/config";
import { default as express } from "express";

import { router } from "./routes";
import { isValidSlackRequest } from "./utils";

const app = express();
app.use(
  express.json({
    verify: (req, _, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(
  express.urlencoded({
    extended: true,
    verify: (req, _, buf) => {
      req.rawBody = buf;
    },
  })
);

app.use(isValidSlackRequest);

app.use(router);

export { app };
