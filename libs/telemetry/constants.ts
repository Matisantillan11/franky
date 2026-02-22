export const TELEMETRY_CONFIG_CONSTANTS = Object.freeze({
  SENTRY_DSN: process.env.EXPO_PUBLIC_SENTRY_DSN,
  TRACES_SAMPLE_RATE: 1.0,
  REPLAYS_SESSION_SAMPLE_RATE: process.env.EXPO_PUBLIC_APP_ENVIRONMENT == 'development' ? 1.0 : 0.1,
  REPLAYS_ON_ERROR_SAMPLE_RATE: process.env.EXPO_PUBLIC_APP_ENVIRONMENT == 'development' ? 1.0 : 0.1,
  ENABLE_LOGS: true,
  SEND_DEFAULT_PII: true,
  IS_DEV_ENV: process.env.EXPO_PUBLIC_APP_ENVIRONMENT == 'development',
  DEBUG: process.env.EXPO_PUBLIC_APP_ENVIRONMENT == 'development' ? true : false,
});
