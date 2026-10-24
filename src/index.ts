import { Hono } from "hono";

import apiInteractionsEndpoint from "./endpoints/apiInteractionsEndpoint.js";
import timerEndpoint from "./endpoints/timerEndpoint.js";

const app: Hono = new Hono();
apiInteractionsEndpoint(app);
timerEndpoint(app);
export default app;
