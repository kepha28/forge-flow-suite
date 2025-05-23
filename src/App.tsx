
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { AppProvider } from "@/context/AppContext";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import ErrorBoundary from "@/components/ErrorBoundary";

// Import pages
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import ConvertPage from "./pages/ConvertPage";
import CompressPage from "./pages/CompressPage";
import SecurePage from "./pages/SecurePage";
import PricingPage from "./pages/PricingPage";
import NotFound from "./pages/NotFound";

// Import conversion pages
import DocumentConvertPage from "./pages/convert/DocumentConvertPage";
import ImageConvertPage from "./pages/convert/ImageConvertPage";
import VideoConvertPage from "./pages/convert/VideoConvertPage";
import AudioConvertPage from "./pages/convert/AudioConvertPage";

// Import resource pages
import BlogPage from "./pages/resources/BlogPage";
import HelpCenterPage from "./pages/resources/HelpCenterPage";
import ApiDocsPage from "./pages/resources/ApiDocsPage";
import StatusPage from "./pages/resources/StatusPage";

// Import company pages
import AboutPage from "./pages/company/AboutPage";
import CareersPage from "./pages/company/CareersPage";
import LegalPage from "./pages/company/LegalPage";
import ContactPage from "./pages/company/ContactPage";

// Import legal pages
import TermsPage from "./pages/legal/TermsPage";
import PrivacyPage from "./pages/legal/PrivacyPage";
import CookiesPage from "./pages/legal/CookiesPage";

// Import user pages
import ProfilePage from "./pages/ProfilePage";
import HistoryPage from "./pages/HistoryPage";
import FilesPage from "./pages/FilesPage";
import StatsPage from "./pages/StatsPage";
import SettingsPage from "./pages/SettingsPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <AppProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Routes>
                {/* Public Routes */}
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
                <Route path="/" element={<Index />} />
                <Route path="/pricing" element={<PricingPage />} />
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
                
                {/* Protected Routes */}
                <Route path="/convert" element={<ConvertPage />} />
                <Route path="/compress" element={<CompressPage />} />
                <Route path="/secure" element={<SecurePage />} />
                
                {/* Specialized conversion routes - no need for ProtectedRoute wrapper here as each component handles it */}
                <Route path="/convert/document" element={<DocumentConvertPage />} />
                <Route path="/convert/image" element={<ImageConvertPage />} />
                <Route path="/convert/video" element={<VideoConvertPage />} />
                <Route path="/convert/audio" element={<AudioConvertPage />} />
                
                <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
                <Route path="/files" element={<ProtectedRoute><FilesPage /></ProtectedRoute>} />
                <Route path="/stats" element={<ProtectedRoute><StatsPage /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
                
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </TooltipProvider>
          </AppProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
