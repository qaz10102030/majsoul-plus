import { Global, GlobalPath, appDataDir } from '../global'
import * as path from 'path'
import * as fs from 'fs'

class Manager {
  private options: {}
  constructor(options: {}) {
    this.options = options
  }

  init = () => {
    //
  }
}

// 此处只留下一个路径
// 原目录下的各目录/工具应在初始化时拷贝到对应目录
const userDataPaths = [
  // path.join(__dirname, '../'),
  appDataDir
]

const managerOptions = {
  userConfig: (() => {
    if (fs.existsSync(Global.UserConfigPath)) {
      require(Global.UserConfigPath)
    } else {
      return require('../Configs-user.json')
    }
  })(),
  modRootDirs: userDataPaths.map(root => path.join(root, GlobalPath.ModsDir)),
  executeRootDirs: userDataPaths.map(root =>
    path.join(root, GlobalPath.ExecutesDir)
  ),
  extensionRootDirs: userDataPaths.map(root =>
    path.join(root, GlobalPath.ExtensionDir)
  ),
  toolRootDirs: userDataPaths.map(root => path.join(root, GlobalPath.ToolsDir))
}

const manager = new Manager(managerOptions)
manager.init()
