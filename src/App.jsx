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
        element: <OnboardingPage />,
      },
      {
        path: "/jobs",
        element: <JobListingPage />,
      },
      {
        path: "/job/:id",
        element: <JobPage />,
      },
      {
        path: "/postjob",
        element: <PostJobPage />,
      },
      {
        path: "/savedjob",
        element: <SavedJobPage />,
      },
      {
        path: "/myjobs",
        element: <MyJobsPage />,
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
