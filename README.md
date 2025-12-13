# ViDeGen.AI — Immersive AI Architect

This workspace contains a single-file frontend for ViDeGen.AI — an AI-driven website architect. The project includes a generator UI, prompt bar, live preview, chat widget, and more.

This README contains steps to push to GitHub and set up automatic deploy (GitHub Pages) if you want.

## Quick local setup
1. Copy the project to a workspace and open it in a code editor.
2. This project requires a local HTTP server to run JS modules and browser OAuth flows.

Recommended commands to start a local server (PowerShell):

```powershell
# From project root
.\run-local.ps1
```

You can also use `py -3 -m http.server 3000`, `python -m http.server 3000` or `npx http-server -p 3000`.
Then open http://localhost:3000 in your browser.

Note: If you plan to test sign-up or social logins, you must set up a Firebase project and enable the relevant Auth providers (Email/Password, Google, GitHub, Apple) and then provide a `__firebase_config` object to the page. For local testing of OAuth providers, use http://localhost:3000 as an authorized redirect origin.

Troubleshooting: "Site not reachable"
- Confirm the server is running: open http://localhost:3000 and check the browser displays this project's `index.html`.
- If you see "site not reachable" or the page does not load:
   - Verify the port (use `3000` unless you configured an alternate port).
   - Make sure there's no firewall rule blocking PowerShell or Node (if present).
   - Try an alternate port: `py -3 -m http.server 8080` or `npx http-server -p 8080`.
   - Check if the server output printed errors in the terminal where you started it.
   - Run `netstat -ano | findstr :3000` in PowerShell to check whether a process is listening on `:3000`. If so, use `Get-Process -Id <pid>` to find which process.
   - If using Live Server in VSCode, ensure Live Server is running and the page is served on `http://127.0.0.1:5500` or the listed port.

If the site still fails to load, paste the exact text you see in the browser and any console output from the server (or terminal), and I will help debug further.

## Git / GitHub: How to push this project
1. Create a new repository on GitHub in your account (or use an existing repo):
   - e.g., `github.com/<your-username>/videgen`.
2. Set remote and push from this folder (run in terminal):

```powershell
cd "c:\Users\Deepak Prajapati\OneDrive\Desktop\videAI"
# Initialize Git if not done already
git init
git add .
git commit -m "Initial commit - ViDeGen UI"
# Replace <username> and <repo> with your details
git remote add origin https://github.com/<username>/<repo>.git
git branch -M main
git push -u origin main
```

3. If you prefer SSH:
```powershell
git remote add origin git@github.com:<username>/<repo>.git
git push -u origin main
```

## Automatic pages deploy (Optional)
If you want to publish the static UI to GitHub Pages, follow these steps:
- After pushing, go to repo Settings → Pages and enable the `gh-pages` branch.
- Alternatively, the included GitHub Workflow `deploy.yml` (if enabled) will deploy to GH Pages automatically.

Note: The actions deploy the repository root to `gh-pages`. If the repo contains other files you don't want deployed, update `publish_dir` in `.github/workflows/deploy.yml` (e.g., `./dist` if you produce a distribution folder).

## Branch & Automation
- A CI workflow (`.github/workflows/ci.yml`) is included that runs lint/build checks on push.
- A deploy workflow (`.github/workflows/deploy.yml`) is included and will deploy `index.html` to `gh-pages` on push to `main` (requires `GITHUB_TOKEN`, which is available in Actions). You may need to enable Pages and optionally change the folder deployed.

## Local development & updates
- Make changes locally.
- Commit and push them to `main`.
- GitHub Actions will run (CI and optionally deploy).

---
If you'd like, I can:
- Push this project to a new GitHub repo for you (you must provide repo name and either grant me a PAT or perform the push yourself after I show the commands).
- Set up a deployment branch or redirect deploy destination.
- Add a simple `package.json` with helpful scripts if you want to build or test locally.

Tell me how you'd like me to proceed and share the GitHub repo details if you want me to perform the push from this environment (or I can provide exact commands to run on your machine).