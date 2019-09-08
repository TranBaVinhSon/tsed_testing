import { TestContext } from "@tsed/testing";
import Sinon from "Sinon";
import { UserController } from "./UserController";
import { NotFound } from "ts-httpexceptions";
import { UsersService } from "../../db/service/UsersService";
import { TypeORMService } from "@tsed/typeorm";

describe("UserController", () => {
  describe("get()", () => {
    describe("without IOC", () => {
      it("should do something", () => {
        const userController = new UserController(
          new UsersService(new TypeORMService())
        );
        console.log("userController", userController);
      });
    });

    describe("via TestContext to mock other service", () => {
      before(() => TestContext.create());
      after(() => TestContext.reset());

      it("should return a result from mocked service", async () => {
        // GIVEN
        // GIVEN
        let users = [
          {
            id: 1,
            name: "son"
          },
          {
            id: 2,
            name: "won"
          }
        ];
        const connection = {
          manager: {
            find: Sinon.stub().resolves(users)
          }
        };
        const typeORMService = {
          get: Sinon.stub().returns(connection)
        };

        const usersService = await TestContext.invoke(UsersService, [
          { provide: TypeORMService, use: typeORMService }
        ]);

        // WHEN
        const userController = await TestContext.invoke(UserController, [
          {
            provide: UsersService,
            use: usersService
          }
        ]);

        // WHEN
        const result = await userController.get(1);
        console.log("result", result);
        // THEN
        result.should.deep.equal({ id: "1" });
        // usersService.find.should.be.calledWithExactly(1);

        userController.should.be.an.instanceof(UserController);
        userController.usersService.should.deep.equal(usersService);
      });
    });
  });
});
