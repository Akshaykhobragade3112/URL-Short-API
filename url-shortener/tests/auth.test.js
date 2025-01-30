const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

chai.use(chaiHttp);
const { expect } = chai;

describe("Authentication API", () => {
    it("should return 400 if no token is provided", (done) => {
        chai.request(server)
            .post("/api/auth/google")
            .send({})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.message).to.equal("No token provided. Please sign in with Google.");
                done();
            });
    });
});
