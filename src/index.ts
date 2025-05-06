import { useContext } from "./tools/useContext";

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

async function flyTo(lat: number, lng: number) {
  await new Promise<void>((resolve) => {
    const handler = (event: MessageEvent) => {
      if (event.data.type === "sensand:res:flyTo") {
        console.log("CHILD:", event.data.type);
        console.log("Flying to", lat, lng);
        resolve();
      }
    };

    window.addEventListener("message", handler, { once: true });

    window.parent.postMessage({ type: "sensand:req:flyTo", lat, lng }, "*");
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

async function alert(message: string) {
  await new Promise<void>((resolve) => {
    const handler = (event: MessageEvent) => {
      if (event.data.type === "sensand:res:alert") {
        console.log("CHILD:", event.data.type);
        console.log("Alert:", message);
        resolve();
      }
    };

    window.addEventListener("message", handler, { once: true });
    window.parent.postMessage({ type: "sensand:req:alert", message }, "*");
  });
}

export const sensand = {
  useContext,
  ping,
  flyTo,
  setZoom,
  alert,
};
