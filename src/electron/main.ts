import { app, BrowserWindow  , ipcMain} from "electron";
import path from "path";
import { isDev } from "./utils.js";
import prisma from '../services/prisma.js';
app.on("ready", () => {
  const mainWindow = new BrowserWindow(
    {
      width: 1200,
      height: 800,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(app.getAppPath(), "preload.ts"),
      },
    }
  );
  if (isDev()) {
    mainWindow.loadURL("http://localhost:3050");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  } 

});

function setupDbHandlers() {
  // Get all employees
  ipcMain.handle('db:getEmployees', async () => {
    try {
      const employees = await prisma.employee.findMany({
        orderBy: { name: 'asc' }
      })
      return employees
    } catch (error) {
      console.error('Failed to fetch employees:', error)
      throw error
    }
  })

  // Get employee by ID
  ipcMain.handle('db:getEmployeeById', async (_, id: string) => {
    try {
      const employee = await prisma.employee.findUnique({
        where: { id }
      })
      return employee
    } catch (error) {
      console.error(`Failed to fetch employee ${id}:`, error)
      throw error
    }
  })

  // Create employee
  ipcMain.handle('db:createEmployee', async (_, employeeData) => {
    try {
      const newEmployee = await prisma.employee.create({
        data: employeeData
      })
      return newEmployee
    } catch (error) {
      console.error('Failed to create employee:', error)
      throw error
    }
  })

  // Update employee
  ipcMain.handle('db:updateEmployee', async (_, id: string, employeeData) => {
    try {
      const updatedEmployee = await prisma.employee.update({
        where: { id },
        data: employeeData
      })
      return updatedEmployee
    } catch (error) {
      console.error(`Failed to update employee ${id}:`, error)
      throw error
    }
  })

  // Delete employee
  ipcMain.handle('db:deleteEmployee', async (_, id: string) => {
    try {
      await prisma.employee.delete({
        where: { id }
      })
      return { success: true, id }
    } catch (error) {
      console.error(`Failed to delete employee ${id}:`, error)
      throw error
    }
  })
}

// Call this after app is ready
app.whenReady().then(() => {
  // Create window, etc.
  
  // Setup database handlers
  setupDbHandlers()
})

// Clean up Prisma when app is closing
app.on('before-quit', async () => {
  await prisma.$disconnect()
})

