const electronBuilder = require('electron-builder');

async function buildClient(target) {
  const targetMap = {
    mac: [
      {
        ENV: '',
        ARCH: '',
        targets: electronBuilder.Platform.MAC.createTarget(),
      },
    ],
    win: [
      {
        ENV: '',
        ARCH: 'win64',
        targets: electronBuilder.Platform.WINDOWS.createTarget('nsis', electronBuilder.Arch.x64),
      },
      // {
      //   ENV: '',
      //   ARCH: 'win32',
      //   targets: electronBuilder.Platform.WINDOWS.createTarget('nsis', electronBuilder.Arch.ia32),
      // },
    ],
    linux: [
      {
        ENV: '',
        ARCH: '',
        targets: electronBuilder.Platform.LINUX.createTarget('linux', electronBuilder.Arch.arm64),
      }
    ]
  };
  const commands = targetMap[target];
  for(const command of commands) {
    process.env.ENV = command.ENV;
    process.env.ARCH = command.ARCH;
    try {
      await electronBuilder.build({
        targets: command.targets,
      });
    } catch(e) {
      console.error('构建失败', e);
      process.exit(1);
    }
  }
  return true;
}

async function run() {
  switch (process.argv[2]) {
    case 'win': {
      await buildClient('win');
      return;
    }
    case 'linux': {
      await buildClient('linux');
      return;
    }
    default: {
      return;
    }
  }
}
run();