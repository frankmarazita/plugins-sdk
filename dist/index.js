"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  sensand: () => sensand
});
module.exports = __toCommonJS(index_exports);
var import_react = require("react");
function useContext() {
  const [workspace, setWorkspace] = (0, import_react.useState)(void 0);
  const [property, setProperty] = (0, import_react.useState)(void 0);
  const [boundary, setBoundary] = (0, import_react.useState)(void 0);
  const [task, setTask] = (0, import_react.useState)(void 0);
  const [record, setRecord] = (0, import_react.useState)(void 0);
  const [requested, setRequested] = (0, import_react.useState)(false);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sensand
});
//# sourceMappingURL=index.js.map