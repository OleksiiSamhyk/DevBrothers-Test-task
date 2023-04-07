import React, { useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Menu,
  SvgIconTypeMap,
  Typography,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface IConfirmationButton {
  ButtonIcon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  onConfirm: () => Promise<any>;
  children: React.ReactNode;
}

export const ConfirmationButton: React.FC<IConfirmationButton> = ({
  ButtonIcon,
  onConfirm,
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpened = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleConfirm = () => {
    setIsLoading(true);

    onConfirm().finally(() => {
      setIsLoading(false);
      handleClose();
    });
  };

  return (
    <>
      <IconButton
        disabled={isLoading}
        id="confirmation-button"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <ButtonIcon />
      </IconButton>
      <Menu
        id="confirmation-menu"
        anchorEl={anchorEl}
        open={isOpened}
        onClose={handleClose}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        MenuListProps={{
          "aria-labelledby": "confirmation-button",
        }}
      >
        <Box sx={{ p: 1 }}>
          <Box mb={4}>{children}</Box>
          <Button type="submit" variant="contained" onClick={handleConfirm}>
            Confirm
          </Button>
          <Button sx={{ ml: 1 }} variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              position: "absolute",
            }}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
      </Menu>
    </>
  );
};
