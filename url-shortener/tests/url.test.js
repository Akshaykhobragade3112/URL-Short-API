const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server'); // Import your Express server
const expect = chai.expect;

chai.use(chaiHttp);

describe('URL Shortening', () => {
    it('should create a new short URL', (done) => {
        const url = {
            longUrl: "https://example.com"
        };
        chai.request(server)
            .post('/api/shorten')
            .send(url)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('shortUrl');
                done();
            });
    });

    it('should redirect to the original URL when short URL is accessed', (done) => {
        chai.request(server)
            .get('/api/shorten/someShortId')
            .redirects(0) // Prevent chai-http from following redirects
            .end((err, res) => {
                expect(res).to.redirectTo(/^https:\/\/example.com$/);
                done();
            });
    });
});
