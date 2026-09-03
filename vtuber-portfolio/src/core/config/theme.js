import { createTheme } from '@mui/material/styles';

export const tokens = {
  color: {
    bg: '#EAF6FC',
    bgElevated: '#FFFFFF',
    bgElevated2: '#DCEFF7',
    accent: '#2E7FE0',
    accentDeep: '#0F3D91',
    blue: '#29C7F0',
    teal: '#17D9C4',
    coral: '#FF6B4A',
    text: '#0B2036',
    textMuted: '#4F7089',
    danger: '#D93A63',
    success: '#0FA36B',
    abyss: '#04122B',
  },
  font: {
    display: "'Manrope', sans-serif",
    body: "'Manrope', sans-serif",
  },
};

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: tokens.color.bg,
      paper: tokens.color.bgElevated,
    },
    primary: {
      main: tokens.color.accent,
      dark: tokens.color.accentDeep,
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: tokens.color.teal,
      contrastText: tokens.color.text,
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
      fontWeight: 800,
      letterSpacing: '-0.01em',
    },
    h2: {
      fontFamily: tokens.font.display,
      fontWeight: 800,
    },
    h3: {
      fontFamily: tokens.font.display,
      fontWeight: 700,
    },
    h4: {
      fontFamily: tokens.font.display,
      fontWeight: 700,
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
      letterSpacing: '0.01em',
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
