export const theme = {
  colors: {
    primary: {
      main: "#FF6B35", // Hlavní oranžová
      light: "#FF8A5B",
      dark: "#E55A2B",
      contrast: "#FFFFFF"
    },
    secondary: {
      main: "#4A90E2", // Doplňková modrá
      light: "#6BA3E8",
      dark: "#3A7BC8",
      contrast: "#FFFFFF"
    },
    success: {
      main: "#2ECC71",
      light: "#58D68D",
      dark: "#27AE60",
      contrast: "#FFFFFF"
    },
    warning: {
      main: "#F39C12",
      light: "#F8C471",
      dark: "#D68910",
      contrast: "#FFFFFF"
    },
    error: {
      main: "#E74C3C",
      light: "#EC7063",
      dark: "#C0392B",
      contrast: "#FFFFFF"
    },
    neutral: {
      white: "#FFFFFF",
      gray50: "#F9FAFB", // Světlejší pozadí
      gray100: "#F3F4F6",
      gray200: "#E5E7EB",
      gray300: "#D1D5DB",
      gray400: "#9CA3AF",
      gray500: "#6B7280",
      gray600: "#4B5563",
      gray700: "#374151",
      gray800: "#1F2937",
      gray900: "#111827",
      black: "#000000"
    },
    background: {
      // Pozadí celé stránky
      default: "#F9FAFB", 
      // Pozadí pro karty a panely
      paper: "#FFFFFF", 
      overlay: "rgba(0, 0, 0, 0.5)"
    },
    text: {
      primary: "#1F2937", // Tmavší pro lepší kontrast
      secondary: "#6B7280",
      disabled: "#9CA3AF",
      contrast: "#FFFFFF"
    }
  },
  typography: {
    fontFamily: {
      primary: "Inter, system-ui, -apple-system, sans-serif",
      secondary: "Roboto, Arial, sans-serif",
      mono: "Fira Code, Consolas, monospace"
    },
    fontSizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem"
    },
    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800
    },
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.6,
      loose: 1.8
    }
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem",
    "4xl": "6rem",
    "5xl": "8rem"
  },
  borderRadius: {
    none: "0",
    sm: "0.125rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    full: "9999px"
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)"
  },
  // Styly pro specifické komponenty budou řešeny přímo v jejich souborech
  // pomocí styled-components pro lepší modularitu.
};
