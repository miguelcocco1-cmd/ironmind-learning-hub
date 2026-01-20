import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Modules from "./pages/Modules";
import CycleDetail from "./pages/CycleDetail";
import WeekDetail from "./pages/WeekDetail";
import ItemDetail from "./pages/ItemDetail";
import ContentViewer from "./pages/ContentViewer";
import ExerciseViewer from "./pages/ExerciseViewer";
import Dashboard from "./pages/Dashboard";
import QuizPage from "./pages/QuizPage";
import Setup from "./pages/Setup";
import UnifiedDashboard from "./pages/UnifiedDashboard";
import TextContent from "./pages/TextContent";
import Calendar from "./pages/Calendar";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
        <Route path="/setup" component={Setup} />
        <Route path="/unified-dashboard" component={UnifiedDashboard} />
      <Route path={"/modules"} component={Modules} />
      <Route path={"/cycle/:id"} component={CycleDetail} />
      <Route path={"/cycle/:cycleId/week/:weekNumber"} component={WeekDetail} />
      <Route path={"/item/:id"} component={ItemDetail} />
      <Route path={"/content/:id"} component={ContentViewer} />
      <Route path={"/text/:id"} component={TextContent} />
      <Route path={"/exercise/:id"} component={ExerciseViewer} />
      <Route path={"/quiz/:contentId"} component={QuizPage} />
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/calendar"} component={Calendar} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
