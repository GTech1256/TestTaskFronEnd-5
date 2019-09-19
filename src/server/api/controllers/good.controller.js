// const httpStatus = require('http-status');
const Goods = require('../models/good.model');

/**
 * Получить все товары
 * @public
 */
exports.get = async (req, res, next) => {
  try {
    res.json(await Goods.getAllGoodsWithCalculatedPrice());
  } catch (error) {
    next(error);
  }
};
