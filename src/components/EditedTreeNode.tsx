import { Stack, TextField, Typography } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useRef } from "react";
import { ConfirmationButton } from "./ConfirmationButton";
import { apiService } from "../api";
import { useTreeContext } from "../context/TreeContext";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export const EditedTreeNode: React.FC<{
  id: number;
  name: string;
}> = ({ id, name }) => {
  const newName = useRef<string>("");
  const { refetchTree } = useTreeContext();

  const handleNameChange = () => {
    return apiService.renameNode(id, newName.current).then(() => {
      return refetchTree();
    });
  };

  const handleAddNode = () => {
    return apiService.createNode(id, newName.current).then(() => {
      return refetchTree();
    });
  };

  const handleDeleteNode = () => {
    return apiService.deleteNode(id).then(() => {
      return refetchTree();
    });
  };

  return (
    <Stack direction="row" gap={2}>
      <ConfirmationButton
        onConfirm={handleNameChange}
        ButtonIcon={ModeEditIcon}
      >
        <Typography>Please enter new name:</Typography>
        <TextField
          sx={{ width: "300px", mt: 1 }}
          defaultValue={name}
          onBlur={(e) => (newName.current = e.target.value)}
        />
      </ConfirmationButton>
      <ConfirmationButton onConfirm={handleAddNode} ButtonIcon={AddCircleIcon}>
        <Typography>Please enter name for child Node:</Typography>
        <TextField
          sx={{ width: "300px", mt: 1 }}
          onBlur={(e) => (newName.current = e.target.value)}
        />
      </ConfirmationButton>
      <ConfirmationButton
        onConfirm={handleDeleteNode}
        ButtonIcon={DeleteForeverIcon}
      >
        <Typography>This item will be deleted forever</Typography>
      </ConfirmationButton>
    </Stack>
  );
};
