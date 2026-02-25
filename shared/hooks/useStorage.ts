import { useId } from 'react';
import { createMMKV } from 'react-native-mmkv';

export type StorageKey = string;

export type StorageValue = string | number | boolean | null | object;

export const useStorage = ({ id }: { id?: string }) => {
  const randomStoreId = useId();
  const mmkvStorage = createMMKV({ id: id ?? randomStoreId });

  const store = (key: StorageKey, value: StorageValue): void => {
    if (value === null) {
      mmkvStorage.remove(key);
      return;
    }

    if (typeof value === 'object') {
      mmkvStorage.set(key, JSON.stringify(value));
      return;
    }

    mmkvStorage.set(key, value);
  };

  const getString = (key: StorageKey): string | undefined => {
    return mmkvStorage.getString(key);
  };

  const getNumber = (key: StorageKey): number | undefined => {
    return mmkvStorage.getNumber(key);
  };

  const getBoolean = (key: StorageKey): boolean | undefined => {
    return mmkvStorage.getBoolean(key);
  };

  const getObject = <T>(key: StorageKey): T | null => {
    const raw = mmkvStorage.getString(key);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  };

  const get = (key: StorageKey, type?: StorageValue): StorageValue | undefined => {
    if (!type) return getString(key);

    switch (type) {
      case 'string':
        return getString(key);
      case 'number':
        return getNumber(key);
      case 'boolean':
        return getBoolean(key);
      case 'object':
        return getObject(key);
      default:
        return null;
    }
  };

  const remove = (key: StorageKey): void => {
    mmkvStorage.remove(key);
  };

  const destroy = (): void => {
    mmkvStorage.clearAll();
  };

  const contains = (key: StorageKey): boolean => {
    return mmkvStorage.contains(key);
  };

  const getAllKeys = (): string[] => {
    return mmkvStorage.getAllKeys();
  };

  const storage = {
    store,
    get,
    remove,
    destroy,
    contains,
    getAllKeys,
  };

  return storage;
};
