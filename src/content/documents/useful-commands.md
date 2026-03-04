---
title: Useful Commands
description: Useful commands located in package.json
order: 65
---

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                         | Action                                                                            |
| :------------------------------ | :-------------------------------------------------------------------------------- |
| `npm install`                   | Installs dependencies                                                             |
| `npm run dev:all`               | Starts dev server `localhost:4321` & decap `localhost:4321/admin`                 |
| `npm run dev`                   | Starts local dev server at `localhost:4321`                                       |
| `npm run preview`               | Preview your build locally, before deploying. Required for decap.                 |
| `npx netlify-cms-proxy-server`  | Runs Decap proxy server                                                           |
| `npm run dev:tmux`              | Run dev instance, preview, and proxy server < -h or -v > (tmux must be installed) |
| `npm run test`                  | Run all tests including accessibility tests                                       |
| `npm run test:report`           | See accessibilty report                                                           |
| `git submodule update --init`   | Initialize and Download Universal Components                                      |
| `git submodule update --remote` | Update Universal Components to the most recent version                            |
