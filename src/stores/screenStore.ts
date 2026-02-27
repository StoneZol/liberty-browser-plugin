import { create } from "zustand";

export type screenType = 'reg' | 'login' | 'main' | 'about' | 'createContact'

interface ScreenStore {
    screen: screenType;
    setScreen: (screen: screenType) => void;
}

const useScreenStore = create<ScreenStore>((set) => ({
    screen: 'reg',
    setScreen: (screen: screenType) => set({ screen })
}));

export default useScreenStore;