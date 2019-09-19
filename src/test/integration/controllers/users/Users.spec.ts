import { ExpressApplication } from "@tsed/common";
import { TestContext } from "@tsed/testing";
import { expect } from "chai";
import SuperTest from "supertest";
import { Server } from "../../../../Server";

describe("Users", () => {
  let request;
  // bootstrap your expressApplication in first
  before(TestContext.bootstrap(Server));
  before(
    TestContext.inject([ExpressApplication], (expressApplication: ExpressApplication) => {
      request = SuperTest(expressApplication);
    }),
  );
  after(TestContext.reset);

  // INDEX
  describe("GET /api/v1/users", () => {
    it("should return all users", async () => {
      const response = await request
        .get("/api/v1/users")
        .expect("Content-Type", /json/)
        .expect(200);
      expect(response.body).to.be.an("array");
    });
  });

  // GET
  describe("GET /api/v1/users/:id", () => {
    it("should return a user", async () => {
      const id = 1;
      const response = await request.get(`/api/v1/users/${id}`).expect(200);
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property("id");
      expect(response.body)
        .to.have.property("id")
        .eql(1);
      expect(response.body).to.have.property("name");
    });

    it("should return a 404 response", async () => {
      const id = 100000;
      const response = await request.get(`/api/v1/users/${id}`).expect(404);
    });
  });

  // CREATE
  describe("POST /api/v1/users/", () => {
    it("should create a user", async () => {
      const response = await request
        .post("/api/v1/users")
        .send({
          name: "Tran B. V. Son",
        })
        .expect(200);

      expect(response.body).to.have.property("id");
      expect(response.body).to.have.property("name");
      expect(response.body)
        .to.have.property("name")
        .eql("Tran B. V. Son");
    });
  });
});
