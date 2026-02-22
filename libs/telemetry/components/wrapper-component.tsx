import { ComponentType } from 'react';
import { initSentry, Sentry } from '../error-tracing';

initSentry();

export const SentryWrapper = (
  children: ComponentType<Record<string, unknown>>
): ComponentType<Record<string, unknown>> => Sentry.wrap(children);
