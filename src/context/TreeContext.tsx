import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { apiService } from "../api";

export interface ITreeData {
  id: number;
  name: string;
  children: ITreeData[];
}

interface ITreeContext {
  treeData?: ITreeData;
  refetchTree: () => Promise<void>;
}

export const TreeContext = createContext<ITreeContext>({} as ITreeContext);

export const TreeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [treeData, setTreeData] = useState<ITreeData>();

  const fetchTree = useCallback(() => {
    return apiService.getTree().then((res) => {
      setTreeData(res);
    });
  }, []);

  useEffect(() => {
    fetchTree();
  }, []);

  return (
    <TreeContext.Provider
      value={{
        treeData,
        refetchTree: fetchTree,
      }}
    >
      {children}
    </TreeContext.Provider>
  );
};

export const useTreeContext = () => {
  const { treeData, refetchTree } = useContext(TreeContext);

  return { treeData, refetchTree };
};
