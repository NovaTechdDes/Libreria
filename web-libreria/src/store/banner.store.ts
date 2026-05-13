import { Banner } from '../interface/Banner';
import { create } from 'zustand';

interface BannerStore {
  banner: Banner | null;
  setBanner: (banner: Banner | null) => void;
}

export const useBannerStore = create<BannerStore>((set) => ({
  banner: null,
  setBanner: (banner: Banner | null) => set({ banner }),
}));
