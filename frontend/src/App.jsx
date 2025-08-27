import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/Navbar";
import HerroBanner from "./components/HerroBanner"; // виправлено
import Home from "./pages/Home";
import HeroDetails from "./pages/HeroDetails";
import CreateHero from "./pages/CreateHero";
import EditHero from "./pages/EditHero";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./context/Context"; // додано

const queryClient = new QueryClient();

function App() {
    return (
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Navbar />
                    <HerroBanner />
                    <ToastContainer position="top-right" autoClose={3000} />
                    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/hero/:id" element={<HeroDetails />} />
                        <Route path="/create" element={<CreateHero />} />
                        <Route path="/edit/:id" element={<EditHero />} />
                    </Routes>
                    </main>
                </BrowserRouter>
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default App;
