import PostHog from 'posthog-react-native';
import { ANALYTICS_CONFIG_CONSTANTS } from './constants';
import { Event, PostHogEventProperties } from './types';

export const posthog = new PostHog(String(ANALYTICS_CONFIG_CONSTANTS.API_KEY), {
  host: ANALYTICS_CONFIG_CONSTANTS.OPTIONS.HOST,
  enableSessionReplay: ANALYTICS_CONFIG_CONSTANTS.OPTIONS.ENABLE_SESSION_REPLAY,
  sessionReplayConfig: {
    maskAllTextInputs:
      ANALYTICS_CONFIG_CONSTANTS.OPTIONS.SESSION_REPLAY_CONFIG.MASK_ALL_TEXT_INPUTS,
    maskAllImages: ANALYTICS_CONFIG_CONSTANTS.OPTIONS.SESSION_REPLAY_CONFIG.MASK_ALL_IMAGES,
    captureLog: ANALYTICS_CONFIG_CONSTANTS.OPTIONS.SESSION_REPLAY_CONFIG.CAPTURE_LOG,
    captureNetworkTelemetry:
      ANALYTICS_CONFIG_CONSTANTS.OPTIONS.SESSION_REPLAY_CONFIG.CAPTURE_NETWORK_TELEMETRY,
  },
});

const logEvent = ({
  eventName,
  properties,
}: {
  eventName: Event;
  properties?: PostHogEventProperties | undefined;
}) => {
  posthog.capture(eventName, properties);
};

export { logEvent };
