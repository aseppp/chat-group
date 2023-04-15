export const setToken = (token) => {
  return localStorage.setItem('token', token);
};

export const getToken = (token) => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
};

export const setUser = (data) => {
  return localStorage.setItem('userData', data);
};

export const getUser = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('userData'));
  }
};
