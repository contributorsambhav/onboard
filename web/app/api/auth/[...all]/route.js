export const config = {
  runtime: "nodejs", // Forces the route to use the Node.js runtime
};

import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);
