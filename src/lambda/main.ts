import ServerlessHttp from "serverless-http";
import app from "../app";

module.exports.handler = ServerlessHttp(app);
