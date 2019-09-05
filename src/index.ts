import { Server } from "./Server";

new Server()
  .start()
  .then(() => {
    console.log("Server started...");
  })
  .catch(err => {
    console.error(err);
  });
