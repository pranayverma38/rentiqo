import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

/** Any browser origin with http or https (Medusa regex CORS format). */
const ALLOW_ALL_HTTP_HTTPS_ORIGINS = '#^https?://.+#'

/**
 * Medusa defaults to secure: true in production, which breaks admin sessions on plain HTTP.
 * express-session secure/sameSite "auto" follows the connection Medusa sees:
 * - Direct http://host:port or https://host:port — no proxy; cookies match that scheme.
 * - TLS terminated at nginx/Caddy — forward X-Forwarded-Proto so "auto" sees HTTPS (trust proxy is on).
 *
 * Medusa's CookieOptions type omits "auto"; express-session supports it.
 */
const SESSION_COOKIE_OPTIONS = {
  secure: 'auto',
  sameSite: 'auto',
} as Record<string, unknown>

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    cookieOptions: SESSION_COOKIE_OPTIONS,
    http: {
      storeCors: process.env.STORE_CORS?.trim() || ALLOW_ALL_HTTP_HTTPS_ORIGINS,
      adminCors: process.env.ADMIN_CORS?.trim() || ALLOW_ALL_HTTP_HTTPS_ORIGINS,
      authCors: process.env.AUTH_CORS?.trim() || ALLOW_ALL_HTTP_HTTPS_ORIGINS,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  }
})
