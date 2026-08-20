import Box from '@mui/material/Box';
import { tokens } from '../../theme/theme';

/**
 * Elemento assinatura do site: um traço orgânico inspirado nas linhas
 * de tatuagem/veias do desenho de perfil, usado como divisor entre
 * seções e como "fio" do indicador de progresso do formulário.
 */
export default function VineDivider({ flip = false, sx = {} }) {
  return (
    <Box
      component="svg"
      viewBox="0 0 600 40"
      preserveAspectRatio="none"
      aria-hidden="true"
      sx={{
        width: '100%',
        height: 32,
        display: 'block',
        transform: flip ? 'scaleX(-1)' : 'none',
        ...sx,
      }}
    >
      <path
        d="M0 20 C 60 5, 90 35, 150 20 S 240 5, 300 20 S 390 35, 450 20 S 540 5, 600 20"
        fill="none"
        stroke={tokens.color.teal}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M40 20 C 30 12, 25 8, 20 4 M110 21 C 118 13, 122 9, 128 4 M260 20 C 252 12, 248 8, 242 3 M340 21 C 348 13, 353 9, 359 4 M480 20 C 472 12, 468 8, 462 3"
        fill="none"
        stroke={tokens.color.purple}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.5"
      />
    </Box>
  );
}
