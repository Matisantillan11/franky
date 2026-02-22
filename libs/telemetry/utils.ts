import { Linking } from 'react-native';
import { CustomException } from './custom-exception';
import { ErrorToTrace, exceptionTypes } from './types';

/**
 * Gets the location of the exception.
 *
 * @returns The location of the exception.
 */
export const getExceptionLocation = async () => {
  const screenName = await Linking.getInitialURL();
  return screenName ? screenName : exceptionTypes.ServerError;
};

/**
 * Gets the error to trace with custom message format.
 * The goal is to have a consistent error message format for all errors with useful information.
 * @param {module: string; component: string; func: string; message?: string} error - The error object to trace.
 * @param {boolean | undefined} isCustomException - Whether the error is a custom exception.
 * @param {string | undefined} customExceptionName - The name of the custom exception.
 * @returns The error to trace formatted.
 * @throws {CustomException} If the error is a custom exception.
 * @throws {Error} If the error is a regular error.
 * @example
 * const error = {
 *   module: 'Emergency Public Form',
 *   component: 'emergency-form.tsx',
 *   func: 'onSubmit',
 *   message: 'Invalid phone number',
 * };
 * const errorToTrace = getErrorToTrace({ error, isCustomException: false, customExceptionName: CUSTOM_EXCEPTION_NAMES['EMERGENCY_PUBLIC_FORM_ERROR'] });
 *
 * Output: [Emergency Public Form] -> [emergency-form.tsx] -> [onSubmit] -> error: Invalid phone number
 */
export const getErrorToTrace = ({
  error,
  isCustomException = false,
  customExceptionName,
}: {
  error: ErrorToTrace;
  isCustomException?: boolean;
  customExceptionName?: string;
}): CustomException | Error => {
  const { module, component, func, message } = error;

  const errorMessage = `[${module}] -> [${component}] -> [${func}]`;

  if (isCustomException && customExceptionName) {
    return new CustomException(
      message ? errorMessage.concat(` -> error: ${message}`) : errorMessage,
      customExceptionName
    );
  }

  return new Error(message ? errorMessage.concat(` -> error: ${message}`) : errorMessage);
};
