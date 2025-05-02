// src/index.ts
import { useState } from "react";
function useContext() {
  const [workspace, setWorkspace] = useState(void 0);
  const [property, setProperty] = useState(void 0);
  const [boundary, setBoundary] = useState(void 0);
  const [task, setTask] = useState(void 0);
  const [record, setRecord] = useState(void 0);
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
    record
  };
}
async function ping() {
  await new Promise((resolve) => {
    const handler = (event) => {
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
async function flyTo(lat, lon) {
  await new Promise((resolve) => {
    const handler = (event) => {
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
async function setZoom(zoom) {
  await new Promise((resolve) => {
    const handler = (event) => {
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
var sensand = {
  useContext,
  ping,
  flyTo,
  setZoom
};
export {
  sensand
};
//# sourceMappingURL=index.mjs.map