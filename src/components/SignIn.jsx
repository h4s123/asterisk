// 'use client'
// import { useState } from "react";
// import Link from "next/link";

// export default function SignIn() {
//     const [showForgotPassword, setShowForgotPassword] = useState(false);
//     const [email, setEmail] = useState("");

//     const handleForgotPassword = () => {
//         // Simulate sending a reset link (implement backend later)
//         alert(`Reset link sent to ${email}`);
//         setShowForgotPassword(false);
//         setEmail("");
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
//             {/* Main Sign In Form */}
//             <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md">
//                 <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Sign In</h2>
//                 <form className="space-y-4">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
//                         <input
//                             type="email"
//                             required
//                             placeholder="Enter your email"
//                             className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
//                         <input
//                             type="password"
//                             required
//                             placeholder="Enter your password"
//                             className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                     >
//                         Sign In
//                     </button>
//                 </form>
//                 <div className="mt-4 flex justify-between items-center text-sm">
//                     <p className="text-gray-600 dark:text-gray-300">
//                         Don’t have an account?{" "}
//                         <Link href="/signUp" className="text-blue-500 hover:underline">
//                             Sign Up
//                         </Link>
//                     </p>
//                     <button
//                         onClick={() => setShowForgotPassword(true)}
//                         className="text-blue-500 hover:underline"
//                     >
//                         Forgot Password?
//                     </button>
//                 </div>
//             </div>

//             {/* Forgot Password Modal */}
//             {showForgotPassword && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//                     <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm">
//                         <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
//                             Forgot Password
//                         </h3>
//                         <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
//                             Enter your email address to receive a password reset link.
//                         </p>
//                         <form
//                             onSubmit={(e) => {
//                                 e.preventDefault();
//                                 handleForgotPassword();
//                             }}
//                             className="space-y-4"
//                         >
//                             <input
//                                 type="email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 required
//                                 placeholder="Enter your email"
//                                 className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
//                             />
//                             <div className="flex justify-end space-x-4">
//                                 <button
//                                     type="button"
//                                     onClick={() => setShowForgotPassword(false)}
//                                     className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 dark:bg-gray-700 dark:text-white"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                                 >
//                                     Send Reset Link
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }


'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    try {
        const response = await fetch("http://localhost:5000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        console.log("Response Status:", response.status); // Debugging log
        console.log("Response Data:", data); // Debugging log

        if (!response.ok) {
            setError(data.error || "Invalid credentials");
            return;
        }

        localStorage.setItem("auth_token", data.token);
        // Redirect based on role
        if (data.role === "admin") {
          router.push("/admin");
      } else {
          router.push("/user");
      }
    } catch (error) {
        console.error("Error:", error);
        setError("Network error occurred!");
    }
};

  

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Sign In</h2>
        {error && (
          <div className="mb-4 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSignIn}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
              aria-required="true"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
              aria-required="true"
            />
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-2 rounded-md text-white ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <div className="mt-4 flex justify-between items-center text-sm">
          <p className="text-gray-600 dark:text-gray-300">
            Don’t have an account?{' '}
            <Link href="/signUp" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
          <button className="text-blue-500 hover:underline">
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
}
