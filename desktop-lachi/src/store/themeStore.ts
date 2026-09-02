import { create } from 'zustand';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  cycleTheme: () => void;
}

const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const getSavedTheme = (): Theme => {
  if (typeof window === 'undefined') return 'system';
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark' || saved === 'system') {
    return saved;
  }
  return 'system';
};

export const applyThemeToDOM = (theme: Theme): 'light' | 'dark' => {
  if (typeof document === 'undefined') return 'light';
  
  const resolved = theme === 'system' ? getSystemTheme() : theme;
  
  if (resolved === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  
  return resolved;
};

const initialTheme = getSavedTheme();
const initialResolved = applyThemeToDOM(initialTheme);

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: initialTheme,
  resolvedTheme: initialResolved,
  setTheme: (theme: Theme) => {
    localStorage.setItem('theme', theme);
    const resolved = applyThemeToDOM(theme);
    set({ theme, resolvedTheme: resolved });
  },
  toggleTheme: () => {
    const currentResolved = get().resolvedTheme;
    const nextTheme: Theme = currentResolved === 'dark' ? 'light' : 'dark';
    get().setTheme(nextTheme);
  },
  cycleTheme: () => {
    const current = get().theme;
    let next: Theme;
    if (current === 'system') next = 'light';
    else if (current === 'light') next = 'dark';
    else next = 'system';
    get().setTheme(next);
  },
}));

// Escuchador de cambios en el sistema operativo
if (typeof window !== 'undefined') {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleMediaChange = () => {
    const currentTheme = useThemeStore.getState().theme;
    if (currentTheme === 'system') {
      const resolved = applyThemeToDOM('system');
      useThemeStore.setState({ resolvedTheme: resolved });
    }
  };

  mediaQuery.addEventListener('change', handleMediaChange);

  // Sincronización entre pestañas/ventanas
  window.addEventListener('storage', (e) => {
    if (e.key === 'theme') {
      const newTheme = getSavedTheme();
      const resolved = applyThemeToDOM(newTheme);
      useThemeStore.setState({ theme: newTheme, resolvedTheme: resolved });
    }
  });
}
