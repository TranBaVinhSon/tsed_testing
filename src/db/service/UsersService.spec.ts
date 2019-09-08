import { TestContext } from "@tsed/testing";
import { expect } from "chai";
import { UsersService } from "./UsersService";
import Sinon from "sinon";
import { TypeORMService } from "@tsed/typeorm";
import { User } from "../entities/User";

describe("UsersService", () => {
  describe("findAll", () => {
    before(TestContext.create);
    after(TestContext.reset);
    it("should return array data from db", async () => {
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
      usersService.$afterRoutesInit();
      const result = await usersService.findAll();

      // THEN
      expect(result).to.be.an("array");
      expect(result).equal(users);
      // typeORMService.get.should.have.been.calledWithExactly();
      // connection.manager.find.should.have.been.calledWithExactly(User);
    });
  });

  describe("find", () => {
    before(TestContext.create);
    after(TestContext.reset);
    it("should return a data from db", async () => {
      // GIVEN
      let user = {
        id: 1,
        name: "my name"
      };

      const getOne = Sinon.stub().resolves(user);
      const where = Sinon.stub().callsArg(0);
      const createQueryBuilder = Sinon.stub().callsArg(0);
      const connection = {
        getRepository: Sinon.stub()
      };

      connection.getRepository.withArgs(User).returns(createQueryBuilder);
      createQueryBuilder.withArgs("user").returns(where);
      where.withArgs("user.id = :id", { id: user.id }).returns(getOne);

      const typeORMService = {
        get: Sinon.stub().returns(connection)
      };

      const usersService = await TestContext.invoke(UsersService, [
        { provide: TypeORMService, use: typeORMService }
      ]);

      // WHEN
      usersService.$afterRoutesInit();
      const result = await usersService.find(user.id);

      // THEN
      expect(result).to.be.an("object");
      expect(result).equal(user);
    });
  });

  describe("create", () => {
    before(TestContext.create);
    after(TestContext.reset);
    it("should save data to db", async () => {
      // GIVEN
      let user = {
        name: "son"
      };
      const connection = {
        manager: {
          save: Sinon.stub().resolves(user)
        }
      };
      const typeORMService = {
        get: Sinon.stub().returns(connection)
      };

      const usersService = await TestContext.invoke(UsersService, [
        { provide: TypeORMService, use: typeORMService }
      ]);

      // WHEN
      usersService.$afterRoutesInit();
      const result = await usersService.create(user);

      // THEN
      expect(result).to.be.an("object");
      expect(result).equal(user);
    });
  });
});
