import { create } from 'zustand'

type LoginStore = {
    password: string
    isAuthenticated: boolean
    setPassword: (password: string) => void
    login: () => void
    logout: () => void
}

export const useLoginStore = create<LoginStore>((set) => ({
    password: '',
    isAuthenticated: false,
    setPassword: (password) => set({ password }),
    login: () => {
        set((state) => {
            if (state.password === '0000') {
                return { isAuthenticated: true }
            }
            return state
        })
    },
    logout: () => {
        set({ isAuthenticated: false, password: '' })
    }
}))