import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
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
import { submitCommissionRequest } from '../services/submitCommissionRequest';

const STEP_COMPONENTS = [ContactStep, ModelStep, AdditionalContentStep, ReferenceStep];

function WizardContent({ onOrderConfirmed }) {
  const { currentStep, data } = useCommissionForm();
  const { dispatch } = useCommissionFormContext();

  const handleConfirmOrder = async () => {
    dispatch({ type: commissionFormActions.SUBMIT_START });
    const result = await submitCommissionRequest(data);

    if (result.success) {
      dispatch({ type: commissionFormActions.SUBMIT_SUCCESS });
      onOrderConfirmed();
    } else {
      dispatch({ type: commissionFormActions.SUBMIT_ERROR, error: result.error });
    }
  };

  const isSummaryStep = currentStep === STEP_COMPONENTS.length;
  const CurrentStepComponent = STEP_COMPONENTS[currentStep];

  return (
    <>
      <StepperHeader currentStep={currentStep} />
      <Box sx={{ px: { xs: 2, md: 0 }, pb: 10 }}>
        {isSummaryStep ? (
          <SummaryStep onConfirm={handleConfirmOrder} />
        ) : (
          <CurrentStepComponent />
        )}
      </Box>
    </>
  );
}

export default function CommissionRequestPage() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleOrderConfirmed = () => {
    setShowSuccess(true);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <PageBackground>
      <CommissionFormProvider>
        <WizardContent onOrderConfirmed={handleOrderConfirmed} />
      </CommissionFormProvider>
      <SuccessDialog open={showSuccess} onGoHome={handleGoHome} />
    </PageBackground>
  );
}
