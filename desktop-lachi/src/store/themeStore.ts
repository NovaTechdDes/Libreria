import { create } from 'zustand';

export type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  resolvedTheme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  cycleTheme: () => void;
}

const getSystemTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const getSavedTheme = (): Theme | null => {
  if (typeof window === 'undefined') return null;
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') {
    return saved;
  }
  return null;
};

export const applyThemeToDOM = (theme: Theme): Theme => {
  if (typeof document === 'undefined') return 'light';

  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  return theme;
};

// Si el usuario ya guardó preferencia manual la usamos, sino detectamos el de la computadora
const savedTheme = getSavedTheme();
const initialTheme: Theme = savedTheme ?? getSystemTheme();
applyThemeToDOM(initialTheme);

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: initialTheme,
  resolvedTheme: initialTheme,
  setTheme: (theme: Theme) => {
    localStorage.setItem('theme', theme);
    applyThemeToDOM(theme);
    set({ theme, resolvedTheme: theme });
  },
  toggleTheme: () => {
    const current = get().theme;
    const nextTheme: Theme = current === 'dark' ? 'light' : 'dark';
    get().setTheme(nextTheme);
  },
  cycleTheme: () => {
    get().toggleTheme();
  },
}));

// Escuchador de cambios en el sistema operativo
if (typeof window !== 'undefined') {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleMediaChange = (e: MediaQueryListEvent) => {
    // Si el usuario no tiene una preferencia guardada explícitamente, se adapta automáticamente a la compu
    const userPreference = getSavedTheme();
    if (!userPreference) {
      const newTheme: Theme = e.matches ? 'dark' : 'light';
      applyThemeToDOM(newTheme);
      useThemeStore.setState({ theme: newTheme, resolvedTheme: newTheme });
    }
  };

  mediaQuery.addEventListener('change', handleMediaChange);

  // Sincronización entre pestañas/ventanas
  window.addEventListener('storage', (e) => {
    if (e.key === 'theme') {
      const newTheme = getSavedTheme() ?? getSystemTheme();
      applyThemeToDOM(newTheme);
      useThemeStore.setState({ theme: newTheme, resolvedTheme: newTheme });
    }
  });
}
