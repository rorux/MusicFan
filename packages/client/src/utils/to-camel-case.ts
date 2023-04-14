import { isArray, isString, isNumber, isBoolean, isPlainObject, mapKeys, mapValues, camelCase } from 'lodash';
import type { List } from 'lodash';
/**
 * Convert object's key names to camelCases format
 * @param obj - Object
 * @param func - map-function
 */
export const toCamelCase = <T extends unknown | Array<unknown>>(
  obj: unknown,
  func: (value: unknown, key: string) => string = (value, key): string => camelCase(key),
): T => {
  if (isNumber(obj)) {
    return obj as T;
  }

  if (isArray(obj)) {
    return (obj as Array<unknown>).map((item: unknown) => toCamelCase<unknown>(item, func)) as T;
  }

  if (isString(obj) || isNumber(obj) || isBoolean(obj) || !isPlainObject(obj)) {
    return obj as T;
  }

  if (!obj) {
    return null as T;
  }

  const result = mapKeys(obj as List<unknown>, func);

  return mapValues(result, (value) => toCamelCase(value, func)) as T;
};
