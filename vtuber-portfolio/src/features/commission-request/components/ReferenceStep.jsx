import { useState, useRef } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import StepCard from './StepCard';
import FormNavigationButtons from './FormNavigationButtons';
import { useCommissionForm } from '../hooks/useCommissionForm';
import { validateReferenceStep, hasErrors } from '../validation/commissionRequestValidation';
import { tokens } from '../../../core/config/theme';

export default function ReferenceStep() {
  const { data, updateField, goNext, goBack } = useCommissionForm();
  const [touched, setTouched] = useState(false);
  const [errors, setErrors] = useState({});
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] ?? null;
    updateField('referenceFile', file);
  };

  const handleRemoveFile = () => {
    updateField('referenceFile', null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleNext = () => {
    const validationErrors = validateReferenceStep(data);
    setErrors(validationErrors);
    setTouched(true);
    if (!hasErrors(validationErrors)) goNext();
  };

  return (
    <StepCard
      title="Referência do modelo desejado"
      subtitle="Envie uma imagem PNG, JPEG ou WebP de até 5 MB — ajuda muito na análise."
    >
      <Box
        sx={{
          border: `2px dashed ${tokens.color.purple}66`,
          borderRadius: 3,
          p: 4,
          textAlign: 'center',
        }}
      >
        {data.referenceFile ? (
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
            <Typography variant="body2">{data.referenceFile.name}</Typography>
            <IconButton size="small" onClick={handleRemoveFile} aria-label="Remover arquivo">
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>
        ) : (
          <>
            <UploadFileIcon sx={{ fontSize: 40, color: tokens.color.textMuted, mb: 1 }} />
            <Typography variant="body2" sx={{ color: tokens.color.textMuted, mb: 2 }}>
              Nenhum arquivo selecionado ainda.
            </Typography>
          </>
        )}

        <Button
          variant="outlined"
          component="label"
          sx={{ mt: data.referenceFile ? 2 : 0 }}
        >
          {data.referenceFile ? 'Trocar arquivo' : 'Escolher arquivo'}
          <input
            ref={inputRef}
            type="file"
            hidden
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
          />
        </Button>
      </Box>

      {touched && errors.referenceFile && (
        <FormHelperText error sx={{ mt: 1 }}>
          {errors.referenceFile}
        </FormHelperText>
      )}

      <FormNavigationButtons onBack={goBack} onNext={handleNext} nextLabel="Quase lá!!" />
    </StepCard>
  );
}
