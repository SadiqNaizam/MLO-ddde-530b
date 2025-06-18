import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import CustomizationAtelierPage from "./pages/CustomizationAtelierPage";
import Homepage from "./pages/Homepage";
import LookbookPage from "./pages/LookbookPage";
import MyAccountPage from "./pages/MyAccountPage";
import OrderSummaryPage from "./pages/OrderSummaryPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>


          <Route path="/" element={<Homepage />} />
          <Route path="/customization-atelier" element={<CustomizationAtelierPage />} />
          <Route path="/lookbook" element={<LookbookPage />} />
          <Route path="/my-account" element={<MyAccountPage />} />
          <Route path="/order-summary" element={<OrderSummaryPage />} />
          {/* catch-all */}
          <Route path="*" element={<NotFound />} />


        </Routes>
    </BrowserRouter>
    </TooltipProvider>
</QueryClientProvider>
);

export default App;
