const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const expect = chai.expect;

chai.use(chaiHttp);

describe('User Authentication', () => {
    it('should authenticate user via Google Sign-In', (done) => {
        const userCredentials = {
            tokenId: "fakeGoogleTokenId" // This should be a mock token or handled accordingly
        };
        chai.request(server)
            .post('/api/auth/google')
            .send(userCredentials)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('user');
                done();
            });
    });
});
