# Platonic 2.0.0

**Astro / Decap Platform using Idealized Best Practices**

### CMS Link

[https://cforp-platonic-lwapp-test.azurewebsites.net/admin/](https://cforp-platonic-lwapp-test.azurewebsites.net/admin/)

### Direct Links

- Dev: [https://cforp-platonic-lwapp-dev.azurewebsites.net/](https://cforp-platonic-lwapp-dev.azurewebsites.net/)
- Test [https://cforp-platonic-lwapp-test.azurewebsites.net/](https://cforp-platonic-lwapp-test.azurewebsites.net/)
- Demo [https://cforp-platonic-lwapp-demo.azurewebsites.net/](https://cforp-platonic-lwapp-demo.azurewebsites.net/)

### Curtain Password

username: `user`
password: `lcf-PLATONIC`

## Getting started

```bash
npm install # Install dependencies
git submodule update --init # Initialize and Download Universal Components
npx playwright install # Setup accessibility testing
npm run dev:all # (Alpha Version) | Starts dev server `localhost:4322` & decap `localhost:4322/admin`
```

Finally, copy the `.env.example` file to `.env`.

## Documentation

For documentation visit [Official Platonic Documentation](https://cforp-platonic-lwapp-test.azurewebsites.net/documentation).
Use the username and password above.

## 🧞 Additional Commands

All commands are run from the root of the project, from a terminal:

| Command                           | Action                                                                            |
| :-------------------------------- | :-------------------------------------------------------------------------------- |
| `npm install`                     | Installs dependencies                                                             |
| `npm run dev:all` (Alpha Version) | Starts dev server `localhost:4322` & decap `localhost:4322/admin`                 |
| `npm run dev`                     | Starts local dev server at `localhost:4321`                                       |
| `npm run preview`                 | Preview your build locally, before deploying. Required for decap.                 |
| `npx netlify-cms-proxy-server`    | Runs Decap proxy server                                                           |
| `npm run dev:tmux`                | Run dev instance, preview, and proxy server < -h or -v > (tmux must be installed) |
| `npm run test`                    | Run all tests including accessibility tests                                       |
| `npm run test:report`             | See accessibilty report                                                           |
| `git submodule update --init`     | Initialize and Download Universal Components                                      |
| `git submodule update --remote`   | Update Universal Components to the most recent version                            |

## Branches and Environments (Creation)

Built using **Node 22**. Version set using `package.json` Engine attribute
and [Volta](https://docs.volta.sh/guide/getting-started) pin.

## Thank you for reading

![Chat](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmRqeDU2aXlxeHY5OG4wbjBjd3EzeXB4a25uNGw4bTkyZG53cXNkNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oz8xIsloV7zOmt81G/giphy.gif)

For more visit the [Official Platonic Documentation](https://cforp-platonic-lwapp-test.azurewebsites.net/documentation) site.
