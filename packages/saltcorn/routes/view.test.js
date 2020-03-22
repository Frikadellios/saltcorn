const request = require("supertest");
const app = require("../app");
const {
  toRedirect,
  getStaffLoginCookie,
  itShouldRedirectUnauthToLogin,
  toInclude,
  toNotInclude
} = require("../auth/testhelp");

describe("root endpoint", () => {
  it("renders", async done => {
    await request(app)
      .get("/")
      .expect(200);

    done();
  });
});
describe("view list endpoint", () => {
  it("should show view to unauth", async done => {
    await request(app)
      .get("/view/authorlist")
      .expect(toInclude("Tolstoy"))
      .expect(toNotInclude("728"));

    done();
  });
});
describe("view patients list endpoint", () => {
  itShouldRedirectUnauthToLogin("/view/patientlist");

  it("should show view to staff", async done => {
    const loginCookie = await getStaffLoginCookie();
    await request(app)
      .get("/view/patientlist")
      .set("Cookie", loginCookie)
      .expect(toInclude("Douglas"))
      .expect(toNotInclude("728"));

    done();
  });
});
describe("view list endpoint", () => {
  it("should show view to unauth", async done => {
    await request(app)
      .get("/view/authorlist?pages=967")
      .expect(toInclude("Melville"))
      .expect(toNotInclude("Tolstoy"));

    done();
  });
});
describe("view list endpoint", () => {
  it("should show view to unauth", async done => {
    await request(app)
      .get("/view/authorlist?author=Tol")
      .expect(toNotInclude("Melville"))
      .expect(toInclude("Tolstoy"));

    done();
  });
});
describe("view show endpoint", () => {
  it("should show view to unauth", async done => {
    await request(app)
      .get("/view/authorshow?id=1")
      .expect(toInclude("Herman Melville"));

    done();
  });
});
