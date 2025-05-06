import { useState } from "react";

type ContextWorkspace = {
  id: string;
  createdTime: number;
  name: string;
  description: string;
  type: string;
  creatorUserId: string;
};

type ContextProperty = {
  id: string;
  createdTime: number;
  updatedTime: number;
  type: string;
  name: string;
  description: string;
  address: string;
  location: [number, number];
  workspaceId: string;
};

type T = Record<string, any> | undefined; // TODO: Set remaining types

export function useContext() {
  const [workspace, setWorkspace] = useState<ContextWorkspace | undefined>(
    undefined
  );
  const [property, setProperty] = useState<ContextProperty | undefined>(
    undefined
  );
  const [boundary, setBoundary] = useState<T>(undefined);
  const [task, setTask] = useState<T>(undefined);
  const [record, setRecord] = useState<T>(undefined);

  const [requested, setRequested] = useState(false);

  window.addEventListener("message", (event) => {
    if (event.data.type === "sensand:res:context") {
      console.log("CHILD:", event.data.type);

      setWorkspace(event.data.workspace);
      setProperty(event.data.property);
      setBoundary(event.data.boundary);
      setTask(event.data.task);
      setRecord(event.data.record);
    }
  });

  if (!requested) {
    window.parent.postMessage({ type: "sensand:req:context" }, "*");
    setRequested(true);
  }

  return {
    workspace,
    property,
    boundary,
    task,
    record,
  };
}
