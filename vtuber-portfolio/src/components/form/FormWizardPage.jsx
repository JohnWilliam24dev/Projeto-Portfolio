import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import StepperHeader from './StepperHeader';
import StepContact from './steps/StepContact';
import StepModelType from './steps/StepModelType';
import StepAdditionalContent from './steps/StepAdditionalContent';
import StepReference from './steps/StepReference';
import StepSummary from './steps/StepSummary';
import SuccessDialog from './SuccessDialog';
import PageBackground from '../layout/PageBackground';
import { CommissionFormProvider, useCommissionFormContext } from '../../state/CommissionFormContext';
import { commissionFormActions } from '../../state/commissionFormReducer';
import { useCommissionForm } from '../../hooks/useCommissionForm';
import { submitOrder } from '../../services/orderService';

const STEP_COMPONENTS = [StepContact, StepModelType, StepAdditionalContent, StepReference];

function WizardContent({ onOrderConfirmed }) {
  const { currentStep, data } = useCommissionForm();
  const { dispatch } = useCommissionFormContext();

  const handleConfirmOrder = async () => {
    dispatch({ type: commissionFormActions.SUBMIT_START });
    const result = await submitOrder(data);

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
          <StepSummary onConfirm={handleConfirmOrder} />
        ) : (
          <CurrentStepComponent />
        )}
      </Box>
    </>
  );
}

export default function FormWizardPage() {
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
