import { cookies } from 'next/headers';

interface ICookieStorageService {
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
}

// const setCookie = (tokenName: string, token: string) => {
//   cookies()[Symbol ('token', token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     path: '/',
//     maxAge: 3600,
//     sameSite: 'strict',
//   });
// };
export const storage: ICookieStorageService = {
  setAccessToken: (token) => localStorage.setItem('accessToken', token),
  setRefreshToken: (token) => localStorage.setItem('refreshToken', token),
  getAccessToken: () => localStorage.getItem('accessToken'),
  getRefreshToken: () => localStorage.getItem('refreshToken'),
};