import { inject, TestContext } from "@tsed/testing";
import { expect } from "chai";
import { User } from "./User";

describe("User", () => {
  let result: any;
  before(TestContext.create);
  after(TestContext.reset);

  it("should data from db", () => {});
});
