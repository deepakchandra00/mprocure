import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  // '& .MuiPaper-root': {
  //   maxWidth: "682px"
  // },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, paddingTop: "4px", background: "#007582", color: "#fff", paddingBottom: "2px", fontSize: "18px", paddingLeft: "35px" }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 0,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function DialogComponent(props) {
  const handleClose = () => {
    props.close()
  };

  return (
    <div style={{ paddingLeft: "10px" }}>
      <BootstrapDialog
        fullScreen
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {props?.title}
        </BootstrapDialogTitle>
        <DialogContent>
          {props.children}
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
