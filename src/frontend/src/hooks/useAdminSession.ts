import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const ADMIN_USERNAME = 'yfo26';
const ADMIN_PASSWORD = 'yfo2016';

interface AdminSessionState {
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAdminSession = create<AdminSessionState>()(
  persist(
    (set) => ({
      isAdmin: false,
      login: async (username: string, password: string) => {
        // Validate credentials
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
          set({ isAdmin: true });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ isAdmin: false });
      },
    }),
    {
      name: 'admin-session',
      storage: {
        getItem: (name) => {
          const str = sessionStorage.getItem(name);
          return str ? JSON.parse(str) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      },
    }
  )
);
