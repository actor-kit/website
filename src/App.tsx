
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// GitHub redirect component
const GitHubRedirect = ({ to }: { to: string }) => {
  window.location.href = to;
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route 
            path="/docs" 
            element={<GitHubRedirect to="https://github.com/jonmumm/actor-kit#readme" />} 
          />
          <Route 
            path="/examples" 
            element={<GitHubRedirect to="https://github.com/jonmumm/actor-kit/tree/main/examples" />} 
          />
          <Route 
            path="/community" 
            element={<GitHubRedirect to="https://github.com/jonmumm/actor-kit/discussions" />} 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
