import { Box, Button, IconButton, Stack } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import React, { useState } from "react";
import { EditedTreeNode } from "./EditedTreeNode";

const TreeNodeComponent: React.FC<{
  id: number;
  name: string;
  children?: React.ReactNode;
  isRoot?: boolean;
  haveChild: boolean;
}> = ({ id, name, children, isRoot, haveChild }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isChosen, setIsChosen] = useState<boolean>(false);

  return (
    <Box>
      <Stack direction="row" gap={2}>
        {haveChild && (
          <IconButton onClick={() => setIsExpanded((prev) => !prev)}>
            {isExpanded ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
          </IconButton>
        )}
        <Button
          disabled={isRoot}
          onClick={() => setIsChosen(true)}
          variant="text"
        >
          {name}
        </Button>
        {isChosen && <EditedTreeNode id={id} name={name} />}
      </Stack>

      {isExpanded && children}
    </Box>
  );
};

export const TreeNode = React.memo(TreeNodeComponent);
