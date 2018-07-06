const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');
const Xray = require('x-ray');
const x = Xray();
const core = require('./plugins/download');
const comicvn = require('./plugins/comicvn/index');
const thichtruyentranh = require("./plugins/thichtruyentranh/index");
const mangak = require("./plugins/mangak/index");
const a3manga = require("./plugins/a3manga/index");
const dammetruyen = require("./plugins/dammetruyen/index");
const truyentranh = require("./plugins/truyentranh/index");
let win;

function createWindow() {
    win = new BrowserWindow({ width: 900, height: 700 });
    win.loadURL(url.format({
        pathname: path.join(__dirname, '../dist/index.html'),
        protocol: 'file:',
        slashes: true
    }));
    win.on('closed', () => {
        win = null
    })
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})

ipcMain.on('send-link-to-electron', (e, args) => {
    const to = core.fromWhere(args);
    console.log(to)
    switch (to) {
        case 1:
            comicvn(args, x).then(result => {
                e.sender.send('electron-send-list', result.reverse())
            });
            break;
        case 2:
            a3manga(args, x).then(result => {
                e.sender.send('electron-send-list', result.reverse())
            });
            break;
        case 3:
            mangak(args, x).then(result => {
                e.sender.send('electron-send-list', result.reverse())
            });
            break;
        case 4:
            truyentranh(args, x).then(result => {
                e.sender.send('electron-send-list', result)
            });
            break;
        case 5:
            dammetruyen(args, x).then(result => {
                e.sender.send('electron-send-list', result.reverse())
            });
            break;
        case 6:
            thichtruyentranh(args, x).then(result => {
                e.sender.send('electron-send-list', result)
            })
            break;
        default:
            break;
    }
})

ipcMain.on('send-data-to-electron', (e, args) => {
    dialog.showOpenDialog({
        properties: ['openDirectory']
    }, (path) => {
        if (path) {
            const per = core.percent(args);
            e.sender.send('downloading');
            args.forEach(element => {
                const nameFolder = element.name.replace('/', ' ');
                fs.mkdirSync(path + '/' + nameFolder);
                element.link.forEach(el => {
                    core.download(el, nameFolder, path, fs).then(() => e.sender.send('send-per', per));
                });
            });
        }
    })
})