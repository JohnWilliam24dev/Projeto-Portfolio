import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { tokens } from '../../theme/theme';

/**
 * Popup de confirmação. Nielsen #1 — feedback claro de que a ação foi
 * concluída com sucesso, com próximo passo explícito (aguardar contato).
 * Nielsen #3 — controle do usuário: fica aberto até ELE decidir sair,
 * em vez de redirecionar sozinho e cortar a leitura da mensagem.
 */
export default function SuccessDialog({ open, onGoHome }) {
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
          <Typography variant="body2" sx={{ color: tokens.color.textMuted }}>
            Fique atento à sua opção de contato escolhida para receber o orçamento final!
          </Typography>
          <Button variant="contained" color="secondary" onClick={onGoHome} sx={{ mt: 1 }}>
            Voltar para o início
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
