
# Star Wars Database

This is a React-based project that provides details about Star Wars characters, films, and homeworlds using public APIs. The project is built with React Router, Mantine UI, React Query, and Zustand for state management.
# username and password for to login 
 username:admin
 password:password
## Features
- Authentication with Zustand store
-  sorting and pagination
- Detail pages for Star Wars characters, films, and homeworlds
- Animations for a smooth user experience
- API consumption using React Query

## Project Structure
```
src
│   App.scss
│   App.tsx
│   main.tsx
│   style.scss
│   vite-env.d.ts
│
├───components
│       ProtectedRoute.tsx
│       StarWarsCharacters.tsx
│
├───context
│       AuthContext.tsx
│
├───pages
│   ├───auth
│   │       Login.tsx
│   │
│   ├───landing
│   │       Landing.tsx
│   │
│   └───protected
│           Dashboard.tsx
│           ResourceDetail.tsx
│           ResourceList.tsx
│
├───services
│       api.ts
│
├───store
│       app.store.ts
│
├───styles
│   │   ResourceList.css
│   │
│   └───abstracts
│           index.scss
│           _colours.scss
│           _fonts.scss
│
└───theme
        index.ts
```

## Installation  

### Prerequisites  
Make sure you have **Node.js** and **npm** installed.  

### Steps  

1. Clone the repository:  
   ```bash
   git clone https://github.com/vinay0737/Script-Assist-Project.git
   cd Script-Assist-Project
   ```
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Start the development server:  
   ```bash
   npm run dev
   ```  

## Build for Production
To create a production build, run:
```sh
npm run build
```
This will generate a `dist/` directory with the optimized build.

## Deployment
You can deploy the project using GitHub Pages, Vercel, or Netlify.

