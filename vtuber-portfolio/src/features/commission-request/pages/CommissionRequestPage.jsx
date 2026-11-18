import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StepperHeader from '../components/StepperHeader';
import ContactStep from '../components/ContactStep';
import ModelStep from '../components/ModelStep';
import AdditionalContentStep from '../components/AdditionalContentStep';
import ReferenceStep from '../components/ReferenceStep';
import SummaryStep from '../components/SummaryStep';
import SuccessDialog from '../components/SuccessDialog';
import PageBackground from '../../../core/layouts/PageBackground';
import { CommissionFormProvider, useCommissionFormContext } from '../state/CommissionFormContext';
import { commissionFormActions } from '../state/commissionFormReducer';
import { useCommissionForm } from '../hooks/useCommissionForm';
import { usePublicCatalog } from '../hooks/usePublicCatalog';
import { submitCommissionRequest } from '../services/submitCommissionRequest';
import { tokens } from '../../../core/config/theme';

function WizardContent({ catalog, onOrderConfirmed }) {
  const { currentStep, data, goToStep } = useCommissionForm();
  const { dispatch } = useCommissionFormContext();

  const isCatalogMode = catalog?.config?.modalidade === 'CATALOGO';

  const steps = useMemo(() => {
    if (isCatalogMode) {
      return [
        { label: 'Como te chamar', component: ContactStep },
        { label: 'Tipo de modelo', component: ModelStep },
        { label: 'Adicionais', component: AdditionalContentStep },
        { label: 'Referência', component: ReferenceStep },
        { label: 'Resumo', component: SummaryStep },
      ];
    }
    return [
      { label: 'Como te chamar', component: ContactStep },
      { label: 'Pedido', component: AdditionalContentStep },
      { label: 'Referência', component: ReferenceStep },
      { label: 'Resumo', component: SummaryStep },
    ];
  }, [isCatalogMode]);

  const safeStepIndex = Math.min(currentStep, steps.length - 1);
  if (safeStepIndex !== currentStep) {
    goToStep(safeStepIndex);
  }

  const handleConfirmOrder = async () => {
    dispatch({ type: commissionFormActions.SUBMIT_START });
    const result = await submitCommissionRequest(data, { catalog });

    if (result.success) {
      dispatch({ type: commissionFormActions.SUBMIT_SUCCESS });
      onOrderConfirmed(result.token);
    } else {
      dispatch({ type: commissionFormActions.SUBMIT_ERROR, error: result.error });
    }
  };

  const isSummaryStep = safeStepIndex === steps.length - 1;
  const CurrentStepComponent = steps[safeStepIndex].component;

  return (
    <>
      <StepperHeader
        currentStep={safeStepIndex}
        labels={steps.map((step) => step.label)}
      />
      <Box sx={{ px: { xs: 2, md: 0 }, pb: 10 }}>
        {isSummaryStep ? (
          <SummaryStep catalog={catalog} onConfirm={handleConfirmOrder} />
        ) : (
          <CurrentStepComponent catalog={catalog} />
        )}
      </Box>
    </>
  );
}

export default function CommissionRequestPage() {
  const navigate = useNavigate();
  const { catalog, loading, error, reload } = usePublicCatalog();
  const [createdToken, setCreatedToken] = useState(null);

  const handleOrderConfirmed = (token) => {
    setCreatedToken(token || '');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <PageBackground>
      <Box sx={{ maxWidth: 720, mx: 'auto', px: { xs: 2, md: 0 }, pt: 3 }}>
        <Button
          variant="text"
          color="inherit"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ color: tokens.color.textMuted }}
        >
          Voltar para a home
        </Button>
      </Box>

      {loading ? (
        <Stack alignItems="center" spacing={2} sx={{ py: 12 }}>
          <CircularProgress color="secondary" />
          <Typography variant="body2" sx={{ color: tokens.color.textMuted }}>
            Carregando opções de pedido…
          </Typography>
        </Stack>
      ) : error ? (
        <Box sx={{ maxWidth: 640, mx: 'auto', px: { xs: 2, md: 0 }, py: 6 }}>
          <Alert
            severity="error"
            action={
              <Button color="inherit" size="small" onClick={reload}>
                Tentar novamente
              </Button>
            }
          >
            {error}
          </Alert>
        </Box>
      ) : (
        <CommissionFormProvider>
          <WizardContent catalog={catalog} onOrderConfirmed={handleOrderConfirmed} />
        </CommissionFormProvider>
      )}

      <SuccessDialog
        open={createdToken !== null}
        token={createdToken}
        onGoHome={handleGoHome}
      />
    </PageBackground>
  );
}
