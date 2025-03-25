import { app } from ".";
import { env } from "./config/env";

const { serverPort } = env;

app.listen(serverPort, () => {
  console.log(`> Server is running at http://localhost:${serverPort}`);
});
