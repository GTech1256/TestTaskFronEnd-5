// const httpStatus = require('http-status');
const Goods = require('../models/good.model');

/**
 * Подсчет суммы по массиву товаров
 * @public
 */
exports.calculate = async (req, res, next) => {
  try {
    /*
    req.body: [{ _id: String, count: Number }]
    */
    const result = {
      USD: 0,
      RUB: 0,
      EUR: 0,
    };

    if (req.body.length > 0) {
      // eslint-disable-next-line no-restricted-syntax
      for (const item of req.body) {
        // eslint-disable-next-line no-await-in-loop
        const good = await Goods.getOneGoodWithCalculatedPriceById(item._id);

        // eslint-disable-next-line no-restricted-syntax
        for (const currency of Object.keys(good.price)) {
          result[currency] += good.price[currency] * item.count;
        }
        console.log(item._id, result.RUB);
      }
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};
