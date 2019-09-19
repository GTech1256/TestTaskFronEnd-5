const mongoose = require('mongoose');
const { getCalculatePriceByOneCurrency } = require('../services/exchangeRateProviders');

const calculatePriceByOneCurrency = getCalculatePriceByOneCurrency();

/**
 * GoodSchema Schema
 * @private
 */
const goodSchema = new mongoose.Schema({
  name: {
    type: String,
    // match: /^\S+@\S+\.\S+$/,
    required: true,
    // unique: true,
    trim: true,
    // lowercase: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  /**
   * Цена указывается в одной из 3 валют RUB, EUR, USD, и является основном для отсчета.
   */
  price: {
    currency: {
      type: String,
      enum: ['RUB', 'EUR', 'USD'],
      require: true,
    },
    value: {
      type: Number,
      mim: 0,
      require: true,
    },
  },
}, {
  timestamps: true,
});

/**
 * Methods
 */
goodSchema.method({
  async calculatePrice() {
    const transformed = {};
    const fields = ['_id', 'name', 'quantity', 'price'];

    const calculatePrice = await calculatePriceByOneCurrency(this.price.currency, this.price.value);


    fields.forEach((field) => {
      transformed[field] = field === 'price' ? calculatePrice : this[field];
    });

    return transformed;
  },
});

/**
 * Statics
 */
goodSchema.statics = {
  async getAllGoodsWithCalculatedPrice() {
    const transformed = [];
    const goods = await this.find({});

    // eslint-disable-next-line no-restricted-syntax
    for (const good of goods) {
      // eslint-disable-next-line no-await-in-loop
      const pricedGood = await good.calculatePrice();
      transformed.push(pricedGood);
    }


    return transformed;
  },
  /**
   *
   *
   * @param {String} id
   * @returns {{
   *  USD: Number,
   *  RUB: Number
   *  EUR: Number
   * }}
   */
  async getOneGoodWithCalculatedPriceById(id) {
    const good = await this.findById(mongoose.Types.ObjectId(id));

    if (!good) {
      throw new Error('good not exist with _id:', id);
    }

    return good.calculatePrice();
  },
};

/**
 * @typedef User
 */
module.exports = mongoose.model('Good', goodSchema);
