/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-expressions */
const request = require('supertest');
const { expect } = require('chai');
const app = require('../../../index');
const MockAdapter = require('axios-mock-adapter');
const axios = require('axios');
const Good = require('../../models/good.model');

const mock = new MockAdapter(axios);
const fakeRate = {
  USD: { Value: 70 },
  EUR: { Value: 64 },
};
mock.onGet(/daily_json/).reply(200, {
  Valute: fakeRate,
});

describe('Good api', async () => {
  beforeEach(async () => {
    const dbGood = {
      // _id: mongoose.Types.ObjectId(115511),
      name: 'loremIpsum',
      quantity: 10,
      price: {
        currency: 'RUB',
        value: 100,
      },
    };

    await Good.deleteMany({});
    await Good.create(dbGood);
  });

  it('should return correct good with calculated rates', () => {
    return request(app)
      .get('/api/v1/good')
      .then((res) => {
        expect(res.body[0].price).to.eql({
          EUR: 100 / fakeRate.EUR.Value,
          RUB: 100,
          USD: 100 / fakeRate.USD.Value,
        });
      });
  });
});
