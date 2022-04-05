const router = require('express').Router();
const HealthCheck = require('../middlewares/health-check');

/**
 * @swagger
 * /health-check:
 *  get:
 *      summary: Health Check
 *      description: Rota para testar se o servidor está rodando
 *      tags: [Health-Check]      
 *      responses:
 *           200:
 *              description: Sucesso
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: boolean
 *                              dataHora:
 *                                  type: string
 *                              message:
 *                                  type: string 
 */
router.get('/health-check', HealthCheck.healthCheck);

module.exports = router