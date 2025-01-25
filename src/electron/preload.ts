import { contextBridge, ipcRenderer } from "electron";

// Expose protected methods to the renderer process
contextBridge.exposeInMainWorld("electron", {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  send: (channel: string, data: any) => {
    // Whitelist channels
    const validChannels = ["toMain"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  receive: (channel: string, func: (...args: any[]) => void) => {
    // Whitelist channels
    const validChannels = ["fromMain"];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
});