import { create } from "zustand";

interface State {
  token: string | null;
  user: string | null;
  login: (token: string, user: string, userId: string) => void;
  logout: () => void;
}

const useAuthStore = create<State>((set) => ({
  token: localStorage.getItem("token") || null,
  user: localStorage.getItem('user') || null,
  login: (token, user) => {
    set({ token: token, user: user});
    localStorage.setItem("user", user);
    localStorage.setItem("token", token);
  },
  logout: () => {
    set({ token: null, user: null});
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
}));

export default useAuthStore;
