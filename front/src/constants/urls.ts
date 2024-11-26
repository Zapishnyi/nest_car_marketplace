export const base = process.env.BASE_URL;

export const urls = {
  auth: {
    sing_up: 'auth/sing-up',
    sing_in: 'auth/sing-in',
  },
  car: {
    get: (query: string) => `/car?${query}`,
  },
};