import { useContext } from "react";
import { ThemeContext } from "../context/Context";
import { Link } from "react-router-dom";
import SunnyIcon from '@mui/icons-material/Sunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function Navbar() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <nav className="p-4 flex justify-between items-center
                        bg-blue-600 dark:bg-gray-900 text-white">
            <Link to="/" className="font-bold text-xl">🦸 Superheroes DB</Link>
            <div className="flex items-center space-x-4">
                <Link to="/" className="hover:underline">Home</Link>
                <Link to="/create" className="hover:underline">Add Hero</Link>

                <button
                    onClick={toggleTheme}
                    className="p-2 rounded hover:bg-gray-700 transition"
                    title="Toggle theme"
                >
                    {theme === "light" ? <DarkModeIcon /> : <SunnyIcon />}
                </button>
            </div>
        </nav>
    );
}




