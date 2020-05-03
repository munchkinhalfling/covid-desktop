const {Menu, MenuItem, app, shell} = require('electron');

module.exports = function buildMenu(wnd) {
    const appMenu = new Menu();
    const fileMenu = new Menu();
    fileMenu.append(new MenuItem({
        label: "Quit",
        accelerator: "CommandOrControl+Q",
        click: app.quit
    }));
    appMenu.append(new MenuItem({
        label: "&File",
        submenu: fileMenu
    }))
    const helpMenu = new Menu();
    helpMenu.append(new MenuItem({
        label: "Data Source",
        click: () => shell.openExternal("https://covidtracking.com/")
    }));
    appMenu.append(new MenuItem({
        label: "Help",
        submenu: helpMenu
    }));
    const viewMenu = new Menu();
    viewMenu.append(new MenuItem({
        label: "DevTools",
        click: () => wnd.webContents.openDevTools({mode: "detach"})
    }));
    viewMenu.append(new MenuItem({
        label: "Reload",
        click: () => wnd.webContents.reload()
    }));
    appMenu.append(new MenuItem({
        label: "View",
        submenu: viewMenu
    }));
    return appMenu;
}