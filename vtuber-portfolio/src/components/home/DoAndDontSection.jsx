import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { doList, dontList } from '../../content/profileContent';
import { tokens } from '../../theme/theme';

function ListColumn({ title, items, icon, accentColor }) {
  return (
    <Box sx={{ flex: 1, minWidth: 0 }}>
      <Typography variant="h3" sx={{ fontSize: '1.5rem', mb: 2, color: accentColor }}>
        {title}
      </Typography>
      <Stack spacing={1.25}>
        {items.map((item) => (
          <Stack
            key={item}
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{
              px: 2,
              py: 1,
              borderRadius: 2,
              border: `1px solid ${accentColor}40`,
              backgroundColor: `${accentColor}0F`,
            }}
          >
            <Box sx={{ color: accentColor, display: 'flex', flexShrink: 0 }}>{icon}</Box>
            <Typography variant="body2" sx={{ color: tokens.color.text }}>
              {item}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

export default function DoAndDontSection() {
  return (
    <Box component="section" sx={{ px: { xs: 3, md: 8 }, py: { xs: 6, md: 10 } }}>
      <Typography
        variant="overline"
        sx={{ color: tokens.color.teal, letterSpacing: '0.25em' }}
      >
        Antes de encomendar
      </Typography>
      <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.4rem' }, mb: 4 }}>
        O que eu faço e o que eu não faço
      </Typography>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={{ xs: 5, md: 6 }}
        alignItems="flex-start"
      >
        <ListColumn
          title="Eu faço"
          items={doList}
          icon={<CheckIcon fontSize="small" />}
          accentColor={tokens.color.success}
        />
        <ListColumn
          title="Eu não faço"
          items={dontList}
          icon={<CloseIcon fontSize="small" />}
          accentColor={tokens.color.danger}
        />
      </Stack>
    </Box>
  );
}
