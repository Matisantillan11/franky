export type Event = 'ONBOARDING';

export type JsonType =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JsonType }
  | Array<JsonType>
  | JsonType[];

export type PostHogEventProperties = {
  [key: string]: JsonType;
};
