import { createTheme } from '@mui/material/styles';

/**
 * Tokens de design — únicas "fontes da verdade" de cor/tipografia.
 * Derivados da própria arte do perfil (roxo/azul das madeixas, o teal
 * do fundo) em vez de uma paleta genérica.
 */
export const tokens = {
  color: {
    bg: '#0A0C18',
    bgElevated: '#151830',
    bgElevated2: '#1E2240',
    purple: '#7A5AC7',
    purpleDeep: '#4B2E83',
    blue: '#5B72F0',
    teal: '#4FD8C7',
    text: '#F3F1FA',
    textMuted: '#ADA9C9',
    danger: '#F0708B',
    success: '#4FD8A0',
  },
  font: {
    display: "'Cormorant Garamond', serif",
    body: "'Manrope', sans-serif",
  },
};

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: tokens.color.bg,
      paper: tokens.color.bgElevated,
    },
    primary: {
      main: tokens.color.purple,
      dark: tokens.color.purpleDeep,
      contrastText: tokens.color.text,
    },
    secondary: {
      main: tokens.color.teal,
      contrastText: tokens.color.bg,
    },
    error: {
      main: tokens.color.danger,
    },
    success: {
      main: tokens.color.success,
    },
    text: {
      primary: tokens.color.text,
      secondary: tokens.color.textMuted,
    },
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: tokens.font.body,
    h1: {
      fontFamily: tokens.font.display,
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
    h2: {
      fontFamily: tokens.font.display,
      fontWeight: 600,
    },
    h3: {
      fontFamily: tokens.font.display,
      fontWeight: 600,
    },
    h4: {
      fontFamily: tokens.font.display,
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: '1.6rem',
          paddingBlock: '0.7rem',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
  },
});

export default theme;
