import { toast } from "react-toastify";

const BASE_URL = "https://test.vmarmysh.com";
export const TREE_NAME = "dca7febf-5267-4345-8a21-a2c3c33e3ef2";

class Service {
  baseRequest(url: string, params?: { [key: string]: any }, noJson?: boolean) {
    const queryParams = Object.entries(params ?? {})
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    const queryParamsWithTreeName = `treeName=${TREE_NAME}${
      queryParams ? `&${queryParams}` : ""
    }`;

    return fetch(`${BASE_URL}/${url}?${queryParamsWithTreeName}`, {
      method: "POST",
    }).then((res) => {
      if (!res.ok) {
        res
          .json()
          .then((e) => toast.error(e.data.message ?? "Unexpected error"));
      }
      return noJson ? true : res.json();
    });
  }

  getTree() {
    return this.baseRequest("api.user.tree.get");
  }

  createNode(parentNodeId: number, nodeName: string) {
    return this.baseRequest(
      "api.user.tree.node.create",
      {
        parentNodeId,
        nodeName,
      },
      true
    );
  }

  renameNode(nodeId: number, newNodeName: string) {
    return this.baseRequest(
      "api.user.tree.node.rename",
      {
        nodeId,
        newNodeName,
      },
      true
    );
  }

  deleteNode(nodeId: number) {
    return this.baseRequest(
      "api.user.tree.node.delete",
      {
        nodeId,
      },
      true
    );
  }
}

export const apiService = new Service();
