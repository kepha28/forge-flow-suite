import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";

import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import ConvertPage from "./pages/ConvertPage";
import CompressPage from "./pages/CompressPage";
import SecurePage from "./pages/SecurePage";
import PricingPage from "./pages/PricingPage";
import NotFound from "./pages/NotFound";

import DocumentConvertPage from "./pages/convert/DocumentConvertPage";
import ImageConvertPage from "./pages/convert/ImageConvertPage";
import VideoConvertPage from "./pages/convert/VideoConvertPage";
import AudioConvertPage from "./pages/convert/AudioConvertPage";

import BlogPage from "./pages/resources/BlogPage";
import HelpCenterPage from "./pages/resources/HelpCenterPage";
import ApiDocsPage from "./pages/resources/ApiDocsPage";
import StatusPage from "./pages/resources/StatusPage";

import AboutPage from "./pages/company/AboutPage";
import CareersPage from "./pages/company/CareersPage";
import LegalPage from "./pages/company/LegalPage";
import ContactPage from "./pages/company/ContactPage";

import TermsPage from "./pages/legal/TermsPage";
import PrivacyPage from "./pages/legal/PrivacyPage";
import CookiesPage from "./pages/legal/CookiesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/" element={<Index />} />
            <Route path="/convert" element={<ConvertPage />} />
            <Route path="/compress" element={<CompressPage />} />
            <Route path="/secure" element={<SecurePage />} />
            <Route path="/pricing" element={<PricingPage />} />
            
            <Route path="/convert/document" element={<DocumentConvertPage />} />
            <Route path="/convert/image" element={<ImageConvertPage />} />
            <Route path="/convert/video" element={<VideoConvertPage />} />
            <Route path="/convert/audio" element={<AudioConvertPage />} />
            
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/help" element={<HelpCenterPage />} />
            <Route path="/docs" element={<ApiDocsPage />} />
            <Route path="/status" element={<StatusPage />} />
            
            <Route path="/about" element={<AboutPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/legal" element={<LegalPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/cookies" element={<CookiesPage />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
