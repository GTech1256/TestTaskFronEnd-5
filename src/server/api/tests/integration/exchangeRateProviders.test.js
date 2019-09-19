const MockAdapter = require('axios-mock-adapter');
const axios = require('axios');
const { assert, expect } = require('chai');
const Good = require('../../models/good.model');

const { getCalculatePriceByOneCurrency } = require('../../services/exchangeRateProviders');

const mock = new MockAdapter(axios);
mock.onGet(/daily_json/).reply(200, {
  Valute: {
    USD: { Value: 70 },
    EUR: { Value: 64 },
  },
});

describe('Good model', async () => {
  beforeEach(async () => {
    const dbGood = {
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

  it('should return correct calculated price with 150RUB', async () => {
    const calculatePriceByOneCurrency = getCalculatePriceByOneCurrency();
    const data = await calculatePriceByOneCurrency('RUB', 150);
    assert.isObject(data);
    expect(data.EUR).to.be.above(2);
    expect(data.EUR).to.not.be.above(3);
    expect(data.USD).to.be.above(2);
    expect(data.USD).to.not.be.above(3);
  });
});
