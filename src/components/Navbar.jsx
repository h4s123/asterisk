import Link from "next/link";
import { useState } from "react";

const Navbar = ({ theme, setTheme }) => {
    const [user, setUser] = useState(null); // Mock user state for logged-in name

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <nav className="flex justify-between items-center px-4 py-2 shadow-md bg-gray-100 dark:bg-gray-800 fixed w-full">
            <div className="text-xl font-bold text-black dark:text-white">Logo</div>
            <div className="flex items-center space-x-4">
                {user ? (
                    <span className="text-gray-900 dark:text-gray-100">Welcome, {user}</span>
                ) : (
                    <>
                        <Link href='/signIn'>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                Sign In
                            </button>
                        </Link>
                        <Link href='/signUp'>
                            <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                                Sign Up
                            </button>
                        </Link>
                    </>
                )}
                <button
                    onClick={toggleTheme}
                    className="px-4 py-2 bg-gray-300 text-black rounded-md dark:bg-gray-700 dark:text-white"
                >
                    {theme === "light" ? "Dark Mode" : "Light Mode"}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
