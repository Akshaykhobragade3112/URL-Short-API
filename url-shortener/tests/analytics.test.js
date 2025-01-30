const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Analytics', () => {
    it('should retrieve analytics for a specific short URL', (done) => {
        chai.request(server)
            .get('/api/analytics/someShortId')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('analytics');
                expect(res.body.analytics).to.include.keys(['totalClicks', 'uniqueUsers']);
                done();
            });
    });
});
