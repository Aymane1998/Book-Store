import React from 'react';
import {
  SnackbarKey,
  SnackbarProvider,
  VariantType,
  enqueueSnackbar,
  useSnackbar,
} from 'notistack';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface CInfosCardProps {
  children?: React.ReactNode;
  maxSnack?: number;
}

interface SnackbarProps {
  message: string;
  variant?: VariantType;
  autoHideDuration?: number;
  preventDuplicate?: boolean;
  hasCloseButton?: boolean;
  persist?: boolean;
  multipleErrors?: boolean;
  // eslint-disable-next-line no-unused-vars
  actionButtons?: (snackbarKey: SnackbarKey) => JSX.Element;
}

export function SnackbarCloseButton({
  snackbarKey,
}: {
  snackbarKey: SnackbarKey;
}) {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton onClick={() => closeSnackbar(snackbarKey)} color="inherit">
      <CloseIcon />
    </IconButton>
  );
}

export function createSnackbar({
  autoHideDuration,
  message,
  multipleErrors,
  variant,
  preventDuplicate = false,
  hasCloseButton = true,
  persist = false,
  actionButtons,
}: SnackbarProps) {
  const duration = autoHideDuration ? autoHideDuration : 3000;

  // Déterminez si le message doit être affiché dans une balise <pre> ou non
  const formattedMessage = multipleErrors ? (
    <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{message}</pre>
  ) : (
    message
  );

  enqueueSnackbar(formattedMessage, {
    variant,
    autoHideDuration: duration,
    persist: persist,
    preventDuplicate: preventDuplicate,
    action: (snackbarKey) => (
      <Box
        sx={{
          display: 'flex',
          gap: '4px',
          justifyContent: multipleErrors ? 'row' : 'column',
        }}
      >
        {actionButtons && actionButtons(snackbarKey)}
        {hasCloseButton && <SnackbarCloseButton snackbarKey={snackbarKey} />}
      </Box>
    ),
  });
}

const CSnackbarProvider: React.FC<CInfosCardProps> = ({
  children,
  maxSnack = 3,
}) => <SnackbarProvider maxSnack={maxSnack}>{children}</SnackbarProvider>;

export default CSnackbarProvider;
