export const getLocalStorage = ({ key, initValue }) => {
  if (typeof window === 'undefined') {
    return initValue;
  }

  const storedValue = localStorage.getItem(key);

  if (storedValue === null) {
    const value = initValue;
    localStorage.setItem(key, JSON.stringify(value));
    return value;
  }

  try {
    return JSON.parse(storedValue);
  } catch (error) {
    console.error(`Gagal parse '${key}' dari localStorage:`, error);
    const value = initValue;

    localStorage.setItem(key, JSON.stringify(value));

    return value;
  }
};
