import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'

import logger from '@app/logger'
import tracer from '@app/tracer'

import { init as InitErrorMiddleware } from '@api/middleware/Error'

import HealthHandler from '@handler/Health'
import BeerHandler from '@handler/Beer'
import UserHandler from '@handler/User'
import OrderHandler from '@handler/Order'

const defineMiddelwares = (router, express) => {
  InitErrorMiddleware()
  router.use(express.json())
  router.use(tracer.middlewareForExpress())
  router.use(
    cors({
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Accept',
        'X-Requested-With',
        'Content-Length'
      ]
    })
  )
  router.use(
    bodyParser.urlencoded({
      limit: '50mb',
      extended: true,
      parameterLimit: 50000
    })
  )
  if (process.env.NODE_ENV === 'development') {
    router.use(morgan('dev'))
  } else {
    router.use(morgan('combined', logger.morganOptions))
  }
}

const defineHandlers = () => {
  HealthHandler()
  BeerHandler()
  UserHandler()
  OrderHandler()
}

const init = (router, express) => {
  defineMiddelwares(router, express)
  defineHandlers()
}

export default { init }
