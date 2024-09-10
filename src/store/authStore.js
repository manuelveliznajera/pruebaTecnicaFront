import create from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
  (set) => ({

  user:{
    tipo: false,
    token: null,
    usuario:'',
    url:''
  },
  updatedUser: (newUser) => {
    set( (state) =>({
      user:{
        ...newUser
      }
    }))
  },

  logout: () => set((state) => {
    user:{
      tipo: false;
      token: null;
      usuario:'';
      url:'';
    }
  }),
 
}),
{
  name: 'userAuth', 
  getStorage: () => localStorage, 
}));

export default useAuthStore;
