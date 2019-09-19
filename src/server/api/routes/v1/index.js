const express = require('express');
const conversionRoutes = require('./conversion.routes');
const goodRoutes = require('./good.routes');

const router = express.Router();

/**
 * GET api/v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET api/v1/docs
 */
router.use('/docs', express.static('docs'));

router.use('/conversion', conversionRoutes);
router.use('/good', goodRoutes);

module.exports = router;
