# WINDOWS 11 CLONE CLIENT DOCUMENTATION

## 💻 Developer Workspace

### 🛡️ Conflict npm packages

This project use somes old node version npm packages (< ver 18.), list is below. If you want to install more packages, you can choose some options:

1. Uninstall list below & install packages you want. Then reinstall.
2. Use `--force` tag after install command. For example: `npm i uuid --force`.

```console
# react-canvas-draw (This package need install more @types package for Typescript)
npm install react-canvas-draw@1.2.1 --force
npm i --save-dev @types/react-canvas-draw@1.2.3 --force
```

### ⌨️ Add more apps for project

You are developer & want to improve this project. Follow these steps:

1. Go to `WindowContainer.tsx` file, this includes app profile on desktop page, add new object like this:

![add app example 1](showcase/1.png)

2. Declare app name in file `utils.ts`

![add app example 2](showcase/2.png)

You new app will display on desktop:

![add app example 3](showcase/3.png)

![add app example 4](showcase/4.png)

3. You can develop & put new app content file for `targetElement` with url: `src/components/WindowContentCpn`:

![add app example 5](showcase/5.png)
