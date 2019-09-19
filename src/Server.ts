import {GlobalAcceptMimesMiddleware, ServerLoader, ServerSettings} from "@tsed/common";
import "@tsed/typeorm";
import "@tsed/swagger";

import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import compress from "compression";
import methodOverride from "method-override";

const rootDir = __dirname;

// DB params

@ServerSettings({
  rootDir,
  acceptMimes: ["application/json"],
  httpPort: "3000",
  httpsPort: false,
  // // config typeorm
  // typeorm: [
  //   {
  //     type: "mysql",
  //     host: "localhost",
  //     port: 3306,
  //     username: "root",
  //     password: "root",
  //     database: "tsed_testing",
  //     synchronize: true,
  //     logging: false,
  //     entities: [User, Post]
  //   }
  // ],
  debug: false,
  mount: {
    "/api/v1": `${rootDir}/controllers/v1/UserController.ts`
  },
  swagger: [
    {
      path: "/api-docs"
    }
  ]
})
export class Server extends ServerLoader {
  /**
   * This method let you configure the express middleware required by your application to works.
   * @returns {Server}
   */

  public $beforeRoutesInit(): void | Promise<any> {
    console.log("=====> $onBeforeRoutesInit");
    this
      .use(GlobalAcceptMimesMiddleware)
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }));

    return null;
  }
}
