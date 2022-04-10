import chai from 'chai';
import chaiHttp from 'chai-http';
import app, { apiBaseUrl, initDevTables } from '../src/app';

chai.use(chaiHttp);
chai.should();

describe('Health checks', () => {
  before((done) => {
    initDevTables().then(done);
  });

  it('GET / should return a test object', (done) => {
    chai
      .request(app)
      .get(apiBaseUrl)
      .end((err, res) => {
        res.body.should.deep.equal({ hello: 'world' });
        done();
      });
  });
});

describe('Users', () => {
  it('list should start empty', (done) => {
    chai
      .request(app)
      .get(`${apiBaseUrl}/user`)
      .end((err, res) => {
        res.body.should.deep.equal({ users: [] });
        done();
      });
  });

  it('adding a new user should show up', (done) => {
    chai
      .request(app)
      .post(`${apiBaseUrl}/user`)
      .send({
        facebookId: 'test',
        phoneNumber: '123'
      })
      .end((err, res) => {
        const { id, facebookId, phoneNumber, userType } = res.body;
        userType.should.equal('User');
        facebookId.should.equal('test');
        phoneNumber.should.equal('123');
        id.should.have.lengthOf(21);
        done();
      });
  });

  it('deleting a user should remove them', (done) => {
    chai
      .request(app)
      .get(`${apiBaseUrl}/user`)
      .end((err, res) => {
        const { users } = res.body;
        users.should.have.lengthOf(1);
        const { id } = users[0];
        chai
          .request(app)
          .delete(`${apiBaseUrl}/user/${id}`)
          .end((err, res) => {
            chai
              .request(app)
              .get(`${apiBaseUrl}/user`)
              .end((err, res) => {
                res.body.should.deep.equal({ users: [] });
                done();
              })
          });
      });
  });
});

describe('Opportunities', () => {
  it('list should start empty', (done) => {
    chai
      .request(app)
      .get(`${apiBaseUrl}/opportunity`)
      .end((err, res) => {
        res.body.should.deep.equal({ opportunities: [] });
        done();
      });
  });

  it('adding a new opportunity should show up', (done) => {
    chai
      .request(app)
      .post(`${apiBaseUrl}/opportunity`)
      .send({
        creatorUserId: 'test',
        contactName: 'contact',
        opportunityName: 'opp',
        description: '',
        location: 'loc',
        peopleRequired: 5,
        startTime: '2021-01-01T08:00:00Z',
        endTime: '2021-01-01T12:00:00Z',
        criminalCheckRequired: false
      })
      .end((err, res) => {
        const { id } = res.body;
        chai
          .request(app)
          .delete(`${apiBaseUrl}/opportunity/:id`)
          .end((err, res) => {
            const { id: deletedId } = res.body;
            id.should.equal(deletedId);
            done();
          });
      });
  });
});
