const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);
const { puzzlesAndSolutions } = require('../controllers/puzzle-strings.js');

suite('Functional Tests', () => {
  test('Solve a puzzle with valid puzzle string', done => {
    chai.request(server)
      .post('/api/solve')
      .send({ puzzle: puzzlesAndSolutions[0][0] })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isObject(res.body);
        assert.property(res.body, 'solution');
        assert.equal(res.body.solution, puzzlesAndSolutions[0][1]);
        done();
      });
  });

  test('Solve a puzzle with missing puzzle string', done => {
    chai.request(server)
      .post('/api/solve')
      .send({ puzzle: '' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isObject(res.body);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'Required field missing');
        done();
      });
  });

  test('Solve a puzzle with invalid characters', done => {
    chai.request(server)
      .post('/api/solve')
      .send({ puzzle: '1.5..2.84..63.12.7.2..5..?..9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37A' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isObject(res.body);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'Invalid characters in puzzle');
        done();
      });
  });

  test('Solve a puzzle with incorrect length', done => {
    chai.request(server)
      .post('/api/solve')
      .send({ puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47.....8..1..16....926914.37' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isObject(res.body);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
        done();
      });
  });

  test('Solve a puzzle that cannot be solved', done => {
    chai.request(server)
      .post('/api/solve')
      .send({ puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.73.' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isObject(res.body);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'Puzzle cannot be solved');
        done();
      });
  });

  test('Check a puzzle placement with all fields', done => {
    chai.request(server)
      .post('/api/check')
      .send({
        puzzle: puzzlesAndSolutions[0][0],
        coordinate: 'a1',
        value: '1'
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isObject(res.body);
        assert.property(res.body, 'valid');
        assert.equal(res.body.valid, true);
        done();
      });
  });

  test('Check a puzzle placement with all placement conflict', done => {
    chai.request(server)
     .post('/api/check')
     .send({
        puzzle: puzzlesAndSolutions[0][0],
        coordinate: 'a1',
        value: '2'
      })
     .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isObject(res.body);
        assert.property(res.body, 'valid');
        assert.equal(res.body.valid, false);
        assert.property(res.body, 'conflict');
        assert.deepEqual(res.body.conflict, ['row', 'column', 'region']);
        done();
      });
  });

  test('Check a puzzle placement with single placement conflict', done => {
    chai.request(server)
     .post('/api/check')
     .send({
        puzzle: puzzlesAndSolutions[0][0],
        coordinate: 'b3',
        value: '9'
      })
     .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isObject(res.body);
        assert.property(res.body, 'valid');
        assert.equal(res.body.valid, false);
        assert.property(res.body, 'conflict');
        assert.deepEqual(res.body.conflict, ['column']);
        done();
      });
  });

  test('Check a puzzle placement with multiple placement conflict', done => {
    chai.request(server)
     .post('/api/check')
     .send({
        puzzle: puzzlesAndSolutions[0][0],
        coordinate: 'c1',
        value: '5'
      })
     .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isObject(res.body);
        assert.property(res.body, 'valid');
        assert.equal(res.body.valid, false);
        assert.property(res.body, 'conflict');
        assert.deepEqual(res.body.conflict, ['row','region']);
        done();
      });
  });

  test('Check a puzzle placement with missing required fields', done => {
    chai.request(server)
     .post('/api/check')
     .send({
        puzzle: puzzlesAndSolutions[0][0],
        coordinate: '',
        value: ''
      })
     .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isObject(res.body);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'Required field(s) missing');
        done();
      });
  });

  test('Check a puzzle placement with invalid characters', done => {
    chai.request(server)
     .post('/api/check')
     .send({
        puzzle: '1?5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
        coordinate: 'a1',
        value: '1'
      })
     .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isObject(res.body);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'Invalid characters in puzzle');
        done();
      });
  });

  test('Check a puzzle placement with incorrect length', done => {
    chai.request(server)
     .post('/api/check')
     .send({
        puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47.....8..1..16....926914.37',
        coordinate: 'a1',
        value: '1'
      })
     .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isObject(res.body);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
        done();
      });
  });

  test('Check a puzzle placement with invalid placement coordinate', done => {
    chai.request(server)
     .post('/api/check')
     .send({
        puzzle: puzzlesAndSolutions[0][0],
        coordinate: 'z1',
        value: '1'
      })
     .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isObject(res.body);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'Invalid coordinate');
        done();
      });
  });

  test('Check a puzzle placement with invalid placement value', done => {
    chai.request(server)
     .post('/api/check')
     .send({
        puzzle: puzzlesAndSolutions[0][0],
        coordinate: 'a1',
        value: '10'
      })
     .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isObject(res.body);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'Invalid value');
        done();
      });
  });
});

