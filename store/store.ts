import { create } from 'zustand';

interface AuthState {
  authInfo: any; // Tipo de tu información de autenticación
  setAuthInfo: (authInfo: any) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  authInfo: null,
  setAuthInfo: (authInfo) => set({ authInfo }),
}));