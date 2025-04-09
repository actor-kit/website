# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/7a09674e-4dd6-4c5e-a577-cd08f955ec2f

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/7a09674e-4dd6-4c5e-a577-cd08f955ec2f) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

This project is configured for deployment to Cloudflare Pages.

### Automatic Deployment with GitHub Actions

A GitHub Actions workflow (`.github/workflows/cloudflare-pages.yml`) is set up to automatically build and deploy the application whenever changes are pushed to the `main` branch. 

The workflow performs the following steps:

1. Checks out the code
2. Sets up Node.js and pnpm
3. Installs dependencies
4. Builds the application (`pnpm build`)
5. Deploys the `dist` directory to Cloudflare Pages using `wrangler`

To enable automatic deployments, you need to configure secrets and variables in your GitHub repository settings:

1. Go to `Settings` > `Secrets and variables` > `Actions`.
2. Add a repository secret named `CLOUDFLARE_API_TOKEN` containing your Cloudflare API token with Pages permissions.
3. Add a repository variable named `CLOUDFLARE_ACCOUNT_ID` containing your Cloudflare account ID.

Also, ensure the `--project-name` in the workflow file matches your Cloudflare Pages project name (`actorkit-dev`).

#### Creating a Cloudflare API Token

1. Go to the [Cloudflare dashboard](https://dash.cloudflare.com)
2. Navigate to `My Profile` > `API Tokens`
3. Click "Create Token"
4. Use the "Edit Cloudflare Workers" template or create a custom token with `Account` > `Cloudflare Pages` > `Edit` permission.
5. Set the Account Resources to include your account.
6. Create the token and copy it.

### Manual Deployment

To deploy manually using `wrangler`:

1. Ensure `wrangler` is installed (`pnpm install -D wrangler` or `npm install -D wrangler`).
2. Log in to Cloudflare: `npx wrangler login`
3. Build the application: `pnpm build`
4. Deploy using the script: `pnpm cf:deploy` (Make sure the `--project-name` in `package.json` is set to `actorkit-dev`).

### Setting Up a New Cloudflare Pages Project

If you're setting up a new Cloudflare Pages project:

1. Log in to your Cloudflare dashboard.
2. Go to `Workers & Pages` > `Create application` > `Pages` > `Connect to Git` or `Upload assets`.
3. If connecting to Git:
    - Select your repository.
    - Choose `Vite` as the framework preset.
    - Ensure the `Build command` is `pnpm build` (or `npm run build`).
    - Ensure the `Build output directory` is `dist`.
    - Set Environment Variables (Production) for `NODE_VERSION` to `18` (or matching your workflow).
4. If uploading assets:
    - Build the project locally (`pnpm build`).
    - Drag and drop the `dist` folder or use `wrangler` (`pnpm cf:deploy`).

## Can I connect a custom domain to my Lovable project?

Yes it is!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
