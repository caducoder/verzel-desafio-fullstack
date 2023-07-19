import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

function ConfirmationDialog({
  open,
  handleClose,
  handleConfirm
}: {
  open: { open: boolean, id: number | undefined },
  handleClose: () => void,
  handleConfirm: (id: number) => void
}) {
  return (
    <div>
      <Dialog
        open={open.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Tem certeza que quer deletar esse veículo?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={() => handleConfirm(open.id!)} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmationDialog;