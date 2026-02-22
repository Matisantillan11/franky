import * as Sentry from '@sentry/react-native';
import { TELEMETRY_CONFIG_CONSTANTS } from './constants';
import { ErrorToTrace, Tags } from './types';
import { getErrorToTrace, getExceptionLocation } from './utils';

/**
 * Logs an error to Sentry with detailed exception type and additional context.
 *
 * @param error - The error object to log.
 * @param {Tags} errorName - The name of the error. This parameter will be used to create a custom exception so be careful when you use it. If you don't provide it, the error will be treated as a regular error.
 * @param {Tags} tagName - Categorization of error. Using this tagName you will be able to filter by tags in sentry dashboard
 * @param context - Additional context to attach to the error.
 */
const logError = async ({
  error,
  errorName,
  tagName,
  context,
}: {
  error: ErrorToTrace;
  errorName?: Tags;
  tagName?: Tags;
  context?: Record<string, unknown>;
}) => {
  const exceptionLocation = await getExceptionLocation();

  const errorToTrace = getErrorToTrace({
    error,
    isCustomException: !!errorName,
    customExceptionName: errorName,
  });

  Sentry.getCurrentScope().setTransactionName(tagName);

  if (tagName) {
    Sentry.setTag(tagName, errorToTrace.message || '');
  }

  Sentry.captureException(errorToTrace, {
    extra: {
      url: exceptionLocation,
      ...(context || {}),
    },
  });
};

const initSentry = () => {
  Sentry.init({
    dsn: TELEMETRY_CONFIG_CONSTANTS.SENTRY_DSN,
    tracesSampleRate: TELEMETRY_CONFIG_CONSTANTS.TRACES_SAMPLE_RATE,
    sendDefaultPii: TELEMETRY_CONFIG_CONSTANTS.SEND_DEFAULT_PII,
    enableLogs: TELEMETRY_CONFIG_CONSTANTS.ENABLE_LOGS,
    debug: TELEMETRY_CONFIG_CONSTANTS.DEBUG,
    replaysSessionSampleRate: TELEMETRY_CONFIG_CONSTANTS.REPLAYS_SESSION_SAMPLE_RATE,
    replaysOnErrorSampleRate: TELEMETRY_CONFIG_CONSTANTS.REPLAYS_ON_ERROR_SAMPLE_RATE,
    integrations: [Sentry.mobileReplayIntegration()],
  });
};

export { initSentry, logError, Sentry };
