import { createTheme } from '@mui/material/styles';

export const tokens = {
  color: {
    bg: '#061a35',
    bgElevated: '#082b56',
    bgElevated2: '#0b3b6b',
    accent: '#62e7f1',
    accentDeep: '#0e69b7',
    blue: '#7cc9ff',
    teal: '#62e7f1',
    coral: '#ff7378',
    text: '#edf9ff',
    textMuted: '#a8c7df',
    danger: '#ff6b76',
    success: '#62e7b8',
    abyss: '#04122B',
  },
  font: {
    display: "'Baloo 2', sans-serif",
    body: "'Nunito', sans-serif",
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
      main: tokens.color.accent,
      dark: tokens.color.accentDeep,
      contrastText: '#04203d',
    },
    secondary: {
      main: tokens.color.teal,
      contrastText: '#04203d',
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
          boxShadow: 'none',
        },
        containedSecondary: {
          background: 'linear-gradient(100deg, #66e8ef, #7cc9ff)',
          '&:hover': { background: 'linear-gradient(100deg, #86f4fa, #9bd8ff)', boxShadow: '0 10px 35px rgba(62, 224, 239, .22)' },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(8, 43, 79, .76)',
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
