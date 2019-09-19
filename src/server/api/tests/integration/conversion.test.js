const request = require('supertest');
const { expect } = require('chai');
const app = require('../../../index');
const MockAdapter = require('axios-mock-adapter');
const axios = require('axios');
const Good = require('../../models/good.model');

const dbGood = {
  // _id: mongoose.Types.ObjectId(115511),
  name: 'loremIpsum',
  quantity: 10,
  price: {
    currency: 'RUB',
    value: 100,
  },
};

const mock = new MockAdapter(axios);
const fakeRate = {
  USD: { Value: 70 },
  EUR: { Value: 64 },
};
mock.onGet(/daily_json/).reply(200, {
  Valute: fakeRate,
});

describe('Conversion api', async () => {
  beforeEach(async () => {
    await Good.deleteMany({});
    await Good.create(dbGood);
  });

  it('should return correct calculated rates with good with 1 count', async () => {
    const good = await Good.getOneGoodWithCalculatedPriceById((await Good.findOne({}))._id);

    return request(app)
      .post('/api/v1/conversion')
      .send([{ _id: good._id, count: 1 }])
      .then((res) => {
        expect(res.body).to.eql({
          EUR: good.price.EUR,
          RUB: good.price.RUB,
          USD: good.price.USD,
        });
      });
  });

  it('should return correct calculated rates with 1 good with 3 count', async () => {
    const good = await Good.getOneGoodWithCalculatedPriceById((await Good.findOne({}))._id);

    return request(app)
      .post('/api/v1/conversion')
      .send([{ _id: good._id, count: 5 }])
      .then((res) => {
        expect(res.body).to.eql({
          EUR: good.price.EUR * 5,
          RUB: good.price.RUB * 5,
          USD: good.price.USD * 5,
        });
      });
  });

  it('should return correct calculated rates with 2 goods with 3 count each', async () => {
    await Good.create({
      ...dbGood,
      price: {
        currency: 'RUB',
        value: 50,
      },
    });
    const goodOne = await Good.getOneGoodWithCalculatedPriceById((await Good.findOne({}))._id);
    const goodTwo = await Good.getOneGoodWithCalculatedPriceById((
      await Good.findOne({ _id: { $ne: goodOne._id } })
    )._id);

    return request(app)
      .post('/api/v1/conversion')
      .send([{ _id: goodOne._id, count: 3 }, { _id: goodTwo._id, count: 3 }])
      .then((res) => {
        expect(res.body).to.eql({
          EUR: (goodOne.price.EUR * 3) + (goodTwo.price.EUR * 3),
          RUB: (goodOne.price.RUB * 3) + (goodTwo.price.RUB * 3),
          USD: (goodOne.price.USD * 3) + (goodTwo.price.USD * 3),
        });
      });
  });
});
