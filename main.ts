import { app, ipcMain, ipcRenderer, BrowserWindow, screen } from "electron";
import * as path from "path";
import * as url from "url";
require("electron-reload")(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`)
});
let win;
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 });
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "./dist/electron-angular/index.html"),
      protocol: "file:",
      slashes: true
    })
  );
  win.webContents.openDevTools();
  win.on("closed", () => {
    app.quit();
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});