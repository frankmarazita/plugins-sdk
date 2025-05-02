import { useState } from "react";

type T = Record<string, any> | undefined;

function useContext() {
  const [workspace, setWorkspace] = useState<T>(undefined);
  const [property, setProperty] = useState<T>(undefined);
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

async function ping() {
  await new Promise<void>((resolve) => {
    const handler = (event: MessageEvent) => {
      if (event.data.type === "sensand:res:ping") {
        console.log("CHILD:", event.data.type);
        console.log("Pong!");
        resolve();
      }
    };

    window.addEventListener("message", handler, { once: true });

    window.parent.postMessage({ type: "sensand:req:ping" }, "*");
  });
}

async function flyTo(lat: number, lon: number) {
  await new Promise<void>((resolve) => {
    const handler = (event: MessageEvent) => {
      if (event.data.type === "sensand:res:flyTo") {
        console.log("CHILD:", event.data.type);
        console.log("Flying to", lat, lon);
        resolve();
      }
    };

    window.addEventListener("message", handler, { once: true });

    window.parent.postMessage({ type: "sensand:req:flyTo", lat, lon }, "*");
  });
}

async function setZoom(zoom: number) {
  await new Promise<void>((resolve) => {
    const handler = (event: MessageEvent) => {
      if (event.data.type === "sensand:res:setZoom") {
        console.log("CHILD:", event.data.type);
        console.log("Zooming to", zoom);
        resolve();
      }
    };

    window.addEventListener("message", handler, { once: true });

    window.parent.postMessage({ type: "sensand:req:setZoom", zoom }, "*");
  });
}

export const sensand = {
  useContext,
  ping,
  flyTo,
  setZoom,
};
