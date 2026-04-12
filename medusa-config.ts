import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

/** Regex form accepted by Medusa's `parseCorsOrigins`; reflects any request Origin (works with credentials). */
const ALLOW_ALL_ORIGINS = '/.*/'

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS || ALLOW_ALL_ORIGINS,
      adminCors: process.env.ADMIN_CORS || ALLOW_ALL_ORIGINS,
      authCors: process.env.AUTH_CORS || ALLOW_ALL_ORIGINS,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  }
})
