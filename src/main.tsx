import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import Landing from "./pages/landing/Landing";
import Characters from "./pages/characters/Characters";
import CharacterDetail from "./pages/characters/CharacterDetail"; // Import Character Detail
import Login from "./pages/auth/Login";
import PrivateRoute from "./components/auth/PrivateRoute";
import Dashboard from "./pages/dashboard/Dashboard";

import FilmDetail from "./pages/films/FilmDetail";
import HomeworldDetail from "./pages/homeworlds/HomeworldDetail";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/login", element: <Login /> },
      {
        element: <PrivateRoute />,
        children: [
          { path: "/", element: <Landing /> },
          { path: "/characters", element: <Characters /> },
          { path: "/characters/:id", element: <CharacterDetail /> },
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/film", element: <FilmDetail /> }, // New film route
          { path: "/homeworld", element: <HomeworldDetail /> }, // New homeworld route
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 1000 * 60 * 15,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
