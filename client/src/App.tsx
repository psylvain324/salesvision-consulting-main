import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Workflows from "./pages/Workflows";
import Integrations from "./pages/Integrations";
import Contact from "./pages/Contact";
import Learn from "./pages/Learn";
import LearnArticle from "./pages/LearnArticle";
import ClientPortal from "./pages/ClientPortal";
import TravelVision from "./pages/TravelVision";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/workflows" component={Workflows} />
      <Route path="/integrations" component={Integrations} />
      <Route path="/contact" component={Contact} />
      <Route path="/learn" component={Learn} />
      <Route path="/learn/:slug" component={LearnArticle} />
      <Route path="/client-portal" component={ClientPortal} />
      <Route path="/travelvision" component={TravelVision} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <ScrollToTop />
          <Navbar />
          <Router />
          <Footer />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
