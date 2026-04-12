import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

/** Any browser origin with http or https (Medusa regex CORS format). */
const ALLOW_ALL_HTTP_HTTPS_ORIGINS = '#^https?://.+#'

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS?.trim() || ALLOW_ALL_HTTP_HTTPS_ORIGINS,
      adminCors: process.env.ADMIN_CORS?.trim() || ALLOW_ALL_HTTP_HTTPS_ORIGINS,
      authCors: process.env.AUTH_CORS?.trim() || ALLOW_ALL_HTTP_HTTPS_ORIGINS,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  }
})
