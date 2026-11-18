import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { tokens } from '../../../core/config/theme';

export default function SuccessDialog({ open, token, onGoHome }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!token || !navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard indisponível em contextos sem HTTPS/permissão; o código segue visível na tela.
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onGoHome}
      disableEscapeKeyDown={false}
      PaperProps={{
        sx: {
          backgroundColor: tokens.color.bgElevated,
          border: `1px solid ${tokens.color.success}55`,
          p: 1,
        },
      }}
    >
      <DialogContent>
        <Stack alignItems="center" spacing={2} sx={{ py: 2, px: 1, textAlign: 'center' }}>
          <CheckCircleIcon sx={{ fontSize: 56, color: tokens.color.success }} />
          <Typography variant="h3" sx={{ fontSize: '1.4rem' }}>
            Seu pedido foi enviado com sucesso para análise!
          </Typography>

          {token && (
            <Box
              sx={{
                px: 3,
                py: 1.5,
                borderRadius: 3,
                border: `1px solid ${tokens.color.teal}55`,
                backgroundColor: 'rgba(5,32,63,.72)',
              }}
            >
              <Typography variant="caption" sx={{ color: tokens.color.textMuted, display: 'block' }}>
                Código para acompanhar seu pedido
              </Typography>
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ mt: 0.5 }}>
                <Typography
                  variant="h2"
                  sx={{ fontSize: '1.8rem', letterSpacing: '0.18em', color: tokens.color.teal }}
                >
                  {token}
                </Typography>
                <Tooltip title={copied ? 'Copiado!' : 'Copiar código'}>
                  <IconButton size="small" onClick={handleCopy} aria-label="Copiar código do pedido">
                    {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
                  </IconButton>
                </Tooltip>
              </Stack>
            </Box>
          )}

          <Typography variant="body2" sx={{ color: tokens.color.textMuted }}>
            Guarde este código para consultar o andamento ou fique atento ao contato informado para receber o orçamento final!
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 1 }}>
            {token && (
              <Button
                variant="outlined"
                color="secondary"
                component={RouterLink}
                to={`/pedido/${token}`}
              >
                Acompanhar pedido
              </Button>
            )}
            <Button variant="contained" color="secondary" onClick={onGoHome}>
              Voltar para o início
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
