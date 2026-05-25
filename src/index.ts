import { Hono } from "hono";

const app: Hono = new Hono();

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
app.get("/", (c) => c.text("Hello, Hono!"));

export default app;
