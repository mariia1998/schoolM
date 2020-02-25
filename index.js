// Modules to control application life and create native browser window
const {app,Menu, BrowserWindow} = require('electron')
const path = require('path')
const lang = 'fr'
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1300,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile(lang+'dashbord.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})






const templatefr = [

  {
    label: 'Action',
    submenu: [
      { label: 'Dashboard',click(){mainWindow.loadFile('fr/dashboardeleve.html')}},
      { label: 'Dashboardadmin',click(){mainWindow.loadFile('fr/dashboard1.html')}},
      { label: 'Dashboardprof',click(){mainWindow.loadFile('fr/dashboardprof.html')}},

      { type: 'separator' },
      {label:'Clients list' ,click(){
        let  win2 = new BrowserWindow({
          width: 1024,
          height: 768,
          frame : false,
          webPreferences: {
            nodeIntegration: true
          }
        })
        win2.loadFile('app/clients.html')
        //win2.webContents.openDevTools()

    }},
    {label:'Funds' ,click(){
      let  win3 = new BrowserWindow({
        width: 1200,
        height: 768,
        frame : false,
        webPreferences: {
          nodeIntegration: true
        }
      })
      win3.loadFile('app/recette.html')
      // win3.webContents.openDevTools()

  }},
      { type: 'separator' },
      { label: 'Settings',click(){win.loadFile('app/parametres.html')}},
      { type: 'separator' },
      { label: 'forcereload' },
      { role: 'close' },

    ]
  },
  {label:'Listes',
submenu : [{label:'liste des eleves', click(){mainWindow.loadFile(lang+'/eleves.html')}},
{label:'liste des profs', click(){mainWindow.loadFile(lang+'/profs.html')}},
{label:'liste des groupes', click(){mainWindow.loadFile(lang+'/groupe.html')}},
{label:'liste des salles', click(){mainWindow.loadFile(lang+'/salles.html')}},
{label:'liste des seances', click(){mainWindow.loadFile(lang+'/seances.html')}},

]
},
{
  label : "Edit" ,
  submenu : [
    { role: 'undo' },
  { role: 'redo' },
  { type: 'separator' },
  { role: 'cut' },
  { role: 'copy' },
  { role: 'paste' }
  ]
},
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom',label:'Zoom' },
      { role: 'togglefullscreen',label:'Full screen' },
      { label: 'Console',click(){mainWindow.webContents.openDevTools()} },

    ]
  },

  {
    label: 'Help',
    submenu : [
      { role: 'about' },
      { label: 'FREQUENCY',click: async () => {
        const { shell } = require('electron')
        await shell.openExternal('http://frequency-dz.com')
      } },
      { label: 'Youtube',click ()  {
        let  win3 = new BrowserWindow({
          width: 400,
          height: 600,
          frame : false,
        })
        win3.loadURL('http://m.youtube.com')
        // win3.webContents.openDevTools()
      } }

    ]

  }
]

const menu = Menu.buildFromTemplate(templatefr)
Menu.setApplicationMenu(menu)
