# UI - @aihio/ui

This package is responsible for managing the UI components and styles across the app.

This package define two sets of components:

- `Shadcn UI`: A set of UI components that can be used across the app using shadcn UI
- `Aihio-spesific': Components to leverage the project


Everything is set up for you, so you can start adding components to your project.

Note: The monorepo uses React 19 and Tailwind CSS v4.

Add components to your project
To add components to your project, run the add command in the path of your app.

cd apps/web
Copy

bun
bunx --bun shadcn@canary add [COMPONENT]
Copy
The CLI will figure out what type of component you are adding and install the correct files to the correct path.

For example, if you run npx shadcn@canary add button, the CLI will install the button component under packages/ui and update the import path for components in apps/web.

If you run npx shadcn@canary add login-01, the CLI will install the button, label, input and card components under packages/ui and the login-form component under apps/web/components.

Importing components
You can import components from the @workspace/ui package as follows:

import { Button } from "@aihio/ui/components/button"
Copy
You can also import hooks and utilities from the @aihio/ui package.

import { useTheme } from "@aihio/ui/hooks/use-theme"
import { cn } from "@aihio/ui/lib/utils"
Copy
File Structure
When you create a new monorepo project, the CLI will create the following file structure:

apps
└── web         # Your app goes here.
    ├── app
    │   └── page.tsx
    ├── components
    │   └── login-form.tsx
    ├── components.json
    └── package.json
packages
└── ui          # Your components and dependencies are installed here.
    ├── src
    │   ├── components
    │   │   └── button.tsx
    │   ├── hooks
    │   ├── lib
    │   │   └── utils.ts
    │   └── styles
    │       └── globals.css
    ├── components.json
    └── package.json
package.json
turbo.json

Requirements
Every aihio workspace must have components.json file. package.json tells package manager how to install depencies. component.json tells CLi how to install and where all of the components.

The components.json file must properly define aliases for the workspace. This tells the CLI how to import components, hooks, utilities, etc.

Tailwind CSS v4

apps/web/components.json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "../../packages/ui/src/styles/globals.css",
    "baseColor": "zinc",
    "cssVariables": true
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "hooks": "@/hooks",
    "lib": "@/lib",
    "utils": "@workspace/ui/lib/utils",
    "ui": "@workspace/ui/components"
  }
}
Copy
packages/ui/components.json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/styles/globals.css",
    "baseColor": "zinc",
    "cssVariables": true
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@aihio/ui/components",
    "utils": "@aihio/ui/lib/utils",
    "hooks": "@aihio/ui/hooks",
    "lib": "@aihio/ui/lib",
    "ui": "@aihio/ui/components"
  }
}
Copy
Ensure you have the same style, iconLibrary and baseColor in both components.json files.

For Tailwind CSS v4, leave the tailwind config empty in the components.json file.

By following these requirements, the CLI will be able to install ui components, blocks, libs and hooks to the correct paths and handle imports for you.