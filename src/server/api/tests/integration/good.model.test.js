const MockAdapter = require('axios-mock-adapter');
const { expect } = require('chai');
const axios = require('axios');
const Good = require('../../models/good.model');

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
});

describe('Good model', async () => {
  it('should return all goods with calculated price', async () => {
    const goods = await Good.getAllGoodsWithCalculatedPrice();

    expect(goods[0].price).to.have.all.keys(['USD', 'RUB', 'EUR']);
  });

  it('should return good by id with calculated price', async () => {
    const goods = await Good.getOneGoodWithCalculatedPriceById((await Good.findOne({}))._id);

    expect(goods.price).to.have.all.keys(['USD', 'RUB', 'EUR']);
  });
});
