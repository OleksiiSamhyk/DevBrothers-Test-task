import { Box, Container } from "@mui/material";
import { useMemo } from "react";
import { TREE_NAME } from "./api";
import { TreeNode } from "./components/TreeNode";
import { ITreeData, useTreeContext } from "./context/TreeContext";

const buildTree = (treeData: ITreeData) => {
  return (
    <TreeNode
      isRoot={treeData.name === TREE_NAME}
      haveChild={!!treeData.children.length}
      id={treeData.id}
      name={treeData.name}
    >
      {!!treeData.children.length &&
        treeData.children.map((i) => {
          return (
            <Box key={i.id} ml={10}>
              {buildTree(i)}
            </Box>
          );
        })}
    </TreeNode>
  );
};

function App() {
  const { treeData } = useTreeContext();

  const tree = useMemo(() => {
    return treeData ? buildTree(treeData) : <></>;
  }, [treeData]);

  return <Container sx={{ margin: "auto", mt: 4 }}>{tree}</Container>;
}

export default App;
