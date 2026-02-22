// Dictionary of exception types
export const exceptionTypes: Record<string, string> = Object.freeze({
  TypeError: 'Type Error',
  SyntaxError: 'Syntax Error',
  ReferenceError: 'Reference Error',
  RangeError: 'Range Error',
  UnknownError: 'Unknown Error',
  ServerError: 'Server Error',
  HTTPException: 'HTTP Exception',
});

export type Tags = 'ONBOARDING_ERROR' | 'STORAGE_ERROR';

export interface HTTPException {
  status: typeof ErrorStatusCode;
  message: string;
  response?: Response;
}

type Rule = {
  status: ErrorStatusCode;
  matchers: string[];
};

/**
 * Known error types and their corresponding HTTP status codes.
 */
export enum ErrorStatusCode {
  // Client errors (4xx)
  BAD_REQUEST = 400, // Invalid request, validation errors
  UNAUTHORIZED = 401, // Authentication required
  FORBIDDEN = 403, // Insufficient permissions
  NOT_FOUND = 404, // Resource not found

  // Server errors (5xx)
  INTERNAL_SERVER_ERROR = 500, // Generic server error
  BAD_GATEWAY = 502, // Bad gateway
  SERVICE_UNAVAILABLE = 503, // Service unavailable
}

export const HTTP_RULES: Rule[] = [
  {
    status: ErrorStatusCode.UNAUTHORIZED,
    matchers: ['UNAUTHORIZED', 'AUTHENTICATION', 'TOKEN', 'CREDENTIALS'],
  },
  {
    status: ErrorStatusCode.FORBIDDEN,
    matchers: ['FORBIDDEN', 'ACCESS DENIED', 'PERMISSION'],
  },
  {
    status: ErrorStatusCode.NOT_FOUND,
    matchers: ['NOT FOUND', 'DOES NOT EXIST', '404'],
  },
  {
    status: ErrorStatusCode.BAD_REQUEST,
    matchers: ['VALIDATION', 'BAD REQUEST'],
  },
  {
    status: ErrorStatusCode.BAD_REQUEST,
    matchers: [
      'INVALID',
      'MISSING',
      'REQUIRED',
      'MALFORMED',
      'UNSUPPORTED FILE TYPE',
      'NO GPS DATA FOUND',
      'UNSUPPORTED', // covers the validation fallback used previously
    ],
  },
  {
    status: ErrorStatusCode.BAD_GATEWAY,
    matchers: ['FETCH', 'NETWORK', 'TIMEOUT', 'CONNECTION'],
  },
  {
    status: ErrorStatusCode.SERVICE_UNAVAILABLE,
    matchers: ['SERVICE UNAVAILABLE', 'TEMPORARILY UNAVAILABLE'],
  },
  {
    status: ErrorStatusCode.INTERNAL_SERVER_ERROR,
    matchers: ['TYPEERROR', 'REFERENCEERROR', 'RANGEERROR', 'SYNTAXERROR'],
  },
];

export type ErrorToTrace = {
  module: string;
  component: string;
  func: string;
  message?: string;
};
