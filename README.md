# WINDOWS 11 CLONE DOCUMENTATION

<img src="https://img.shields.io/github/stars/minhtrifit/windows-11-clone"/> ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/minhtrifit/windows-11-clone)

![Thumbnail](./showcase/thumbnail.png)

# 📋 Table of Contents

1. [Technical Stack](#technical-stack)
2. [Project Showcase](#project-showcase)
3. [Project Setup](#project-setup)
   1. [Firebase setup](#firebase-setup)
   2. [Source code setup](#source-code-setup)
4. [Developer Workspace](#developer-workspace)
   1. [Conflict npm packages](#conflict-npm-packages)
   2. [Add more apps](#add-more-apps)

## 📁 Technical Stack <a name="technical-stack"></a>

<p align="left"> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="tailwind" width="40" height="40"/> </a> <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a> </p>

- [Next.js14](https://nextjs.org) - The React Framework for the Web
- [React.js](https://react.dev) - The library for web and native user interfaces
- [Shadcn UI](https://ui.shadcn.com) - Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.
- [Tailwind CSS](https://tailwindcss.com) - Rapidly build modern websites without ever leaving your HTML
- [TypeScript](https://www.typescriptlang.org) - JavaScript with syntax for types.
- [Firebase](https://firebase.google.com) - Build & Run AI-Powered Apps.

## 🔮 Project Showcase <a name="project-showcase"></a>

- Login Screen

![login](showcase/login.png)

- Home Screen

![Home](showcase/home.png)

- Browser Feature

![Home](showcase/browser.png)

- File Explorer Feature

![Home](showcase/file_explorer.png)

- Image Feature

![Home](showcase/image.png)

- Video Feature

![Home](showcase/video.png)

- Text Document Feature

![Home](showcase/text_document.png)

- Visual Code Feature

![Home](showcase/vscode.png)

- Paint Feature

![Home](showcase/paint.png)

- Settings Feature

![Home](showcase/settings.png)

- Calculator Feature

![Home](showcase/calculator.png)

- Spotify Feature

![Home](showcase/spotify.png)

- Calendar Feature

![Home](showcase/calendar.png)

## 💽 Project Setup <a name="project-setup"></a>

### 🔥 Firebase setup <a name="firebase-setup"></a>

- [This project use Firebase for some features (Click to see basic setup).](https://mydevpa.ge/blog/how-to-setup-firebase-firestore-with-nextjs-14)
- This project doesn't have server, so you can add your own data to Firebase for testing app manually.

**Make sure that you have enabled following firebase services:**

- Storage (Files storage).
- Firestore Database (Real time database).
- Authentication (This project default use email & password only).

**1. Storage have default structure:**

This topic and **2. Firestore Database** show how to add your own data to app. If you just want to run app only, you can move to <a name="source-code-setup">Source code setup</a>.

**Storage for this project has format:**

- `file_explorer/pictures`
- `file_explorer/music`
- `file_explorer/videos`

![firebase example 1](showcase/6.png)

Picture files (.png, .jpg,...) example (same for videos & music files)

![firebase example 2](showcase/7.png)

**2. Firestore Database:**

- type list: ["text_document", "pictures", "videos", "music"]
- content is url for: `pictures`, `videos`, `music` (provided by [Storage](https://firebase.google.com/docs/storage/web/start))

![firebase example 3](showcase/8.png)

![firebase example 4](showcase/9.png)

![firebase example 5](showcase/10.png)

### 📦 Source code setup <a name="source-code-setup"></a>

⚙️ Config [.env]() file in client dir with path `./client/.env`:

```bash
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_FILE_EXPLORER_COLLECTION=file-explorer-list
NEXT_PUBLIC_FIREBASE_PICTURE_STORAGE_PATH=file_explorer/pictures
NEXT_PUBLIC_FIREBASE_VIDEO_STORAGE_PATH=file_explorer/videos
NEXT_PUBLIC_FIREBASE_MUSIC_STORAGE_PATH=file_explorer/music
NEXT_PUBLIC_MY_PORTFOLIO_APP_URL=https://sparkling-nasturtium-3d4d3c.netlify.app
```

📥 Installation packages:

Intall packages & dependencies (use --force tag to install conflict packages version, detail in **Conflict npm packages** topic).

```console
npm install --force
```

Or install packages with legacy peer dependencies.

```console
npm install --legacy-peer-deps
```

Run client project (supported by [Create Next App](https://nextjs.org/docs/getting-started/installation))

```console
npm run dev
```

## 💻 Developer Workspace <a name="developer-workspace"></a>

### 🛡️ Conflict npm packages <a name="conflict-npm-packages"></a>

This project use somes old node version npm packages (< ver 18.), list is below. If you want to install more packages, you can choose some options:

1. Uninstall list below & install packages you want. Then reinstall.
2. Use `--force` tag after install command. For example: `npm i uuid --force`.

```console
# react-canvas-draw (This package need install more @types package for Typescript)
npm install react-canvas-draw@1.2.1 --force
npm i --save-dev @types/react-canvas-draw@1.2.3 --force
```

### ⌨️ Add more apps for project <a name="add-more-apps"></a>

You are developer & want to improve this project. Follow these steps:

1. Go to `WindowContainer.tsx` file, this includes app profile on desktop page, add new object like this:

![add app example 1](showcase/1.png)

2. Declare app name in file `utils.ts`

![add app example 2](showcase/2.png)

Your new app will display on desktop:

![add app example 3](showcase/3.png)

![add app example 4](showcase/4.png)

3. You can develop & put new app content file for `targetElement` with url: `src/components/WindowContentCpn`:

![add app example 5](showcase/5.png)

## ▶️ YouTube Demo

[![Thumnail](./showcase/thumbnail.png)](https://youtu.be/PtsflG2W43g)

## 💌 Contact

- Author - [minhtrifit](https://minhtrifit-dev.vercel.app)
- [Github](https://github.com/minhtrifit)

> CopyRight© minhtrifit
