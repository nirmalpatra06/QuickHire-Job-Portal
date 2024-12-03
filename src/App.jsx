// import { Button } from "./components/ui/button";
import { ThemeProvider } from "./components/theme-provider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/applayout";
import LandingPage from "./pages/landing";
import OnboardingPage from "./pages/onboarding";
import JobListingPage from "./pages/joblisting";
import JobPage from "./pages/job";
import PostJobPage from "./pages/postjob";
import SavedJobPage from "./pages/savedjob";
import MyJobsPage from "./pages/myjobs";
import ProtectedRoute from "./components/protected-route";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/onboarding",
        element: (
          <ProtectedRoute>
            <OnboardingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/jobs",
        element: (
          <ProtectedRoute>
            <JobListingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/job/:id",
        element: (
          <ProtectedRoute>
            <JobPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/postjob",
        element: (
          <ProtectedRoute>
            <PostJobPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/savedjobs",
        element: (
          <ProtectedRoute>
            <SavedJobPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/myjobs",
        element: (
          <ProtectedRoute>
            <MyJobsPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
