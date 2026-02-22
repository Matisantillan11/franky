export const ANALYTICS_CONFIG_CONSTANTS = Object.freeze({
  API_KEY: process.env.EXPO_PUBLIC_POSTHOG_API_KEY,
  OPTIONS: {
    HOST: 'https://us.i.posthog.com',
    ENABLE_SESSION_REPLAY: process.env.EXPO_PUBLIC_APP_ENVIRONEMNT === 'development' ? false : true,
    SESSION_REPLAY_CONFIG: {
      MASK_ALL_TEXT_INPUTS: true,
      MASK_ALL_IMAGES: true,
      CAPTURE_LOG: false,
      CAPTURE_NETWORK_TELEMETRY: true,
    },
  },
});
