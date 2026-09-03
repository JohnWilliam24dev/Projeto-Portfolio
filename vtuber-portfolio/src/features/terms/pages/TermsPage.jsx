import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PageBackground from '../../../core/layouts/PageBackground';
import { profileContent } from '../../../shared/utils/profileContent';
import { tokens } from '../../../core/config/theme';

function TermsList({ items }) {
  return (
    <Stack component="ul" spacing={1} sx={{ m: 0, pl: 3 }}>
      {items.map((item) => (
        <Typography key={item} component="li" variant="body1" sx={{ color: tokens.color.text }}>
          {item}
        </Typography>
      ))}
    </Stack>
  );
}

export default function TermsPage() {
  const navigate = useNavigate();
  const { notice, agreement, sections } = profileContent.termsAndConditions;

  return (
    <PageBackground>
      <Box sx={{ maxWidth: 760, mx: 'auto', px: { xs: 3, md: 0 }, py: { xs: 6, md: 8 } }}>
        <Button
          variant="text"
          color="inherit"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 3 }}
        >
          Voltar
        </Button>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            backgroundColor: `${tokens.color.bgElevated}CC`,
            border: `1px solid ${tokens.color.accent}33`,
            backdropFilter: 'blur(6px)',
          }}
        >
          <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.2rem' }, mb: 3 }}>
            Termos e condições
          </Typography>

          <Alert severity="warning" sx={{ mb: 3 }}>
            {notice}
          </Alert>

          <Typography variant="body1" sx={{ color: tokens.color.textMuted, mb: 4 }}>
            {agreement}
          </Typography>

          {sections.map((section, index) => (
            <Box key={section.heading} sx={{ mb: index === sections.length - 1 ? 0 : 4 }}>
              <Typography variant="h3" sx={{ fontSize: '1.3rem', mb: 2, color: tokens.color.accentDeep }}>
                {section.heading}
              </Typography>

              {section.items && <TermsList items={section.items} />}

              {section.subsections?.map((subsection) => (
                <Box key={subsection.subheading} sx={{ mt: 2.5 }}>
                  <Typography variant="h4" sx={{ fontSize: '1.05rem', mb: 1.5 }}>
                    {subsection.subheading}
                  </Typography>
                  <TermsList items={subsection.items} />
                </Box>
              ))}

              {index < sections.length - 1 && (
                <Divider sx={{ borderColor: `${tokens.color.accent}33`, mt: 4 }} />
              )}
            </Box>
          ))}
        </Paper>
      </Box>
    </PageBackground>
  );
}
