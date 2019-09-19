import {Server} from "./Server";
import {ServerLoader} from "@tsed/common";

async function bootstrap() {
  const server = await ServerLoader.bootstrap(Server);

  await server.listen();
  console.log("Server started...");

  return;
}

bootstrap();
