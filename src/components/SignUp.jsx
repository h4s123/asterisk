// import Link from "next/link";

// export default function SignUp() {
//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
//       <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md">
//         <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Sign Up</h2>
//         <form className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Name</label>
//             <input
//               type="text"
//               required
//               placeholder="Enter your name"
//               className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
//             <input
//               type="email"
//               required
//               placeholder="Enter your email"
//               className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
//             <input
//               type="password"
//               required
//               placeholder="Enter your password"
//               className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Confirm Password</label>
//             <input
//               type="password"
//               required
//               placeholder="Re-enter your password"
//               className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
//           >
//             Sign Up
//           </button>
//         </form>
//         <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
//           Already have an account?{" "}
//           <Link href="/signIn" className="text-blue-500 hover:underline">
//             Sign In
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }



'use client'
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState("user"); // Default to 'user'
  const [inviteCode, setInviteCode] = useState(""); // New field for admin validation
  const router = useRouter();

  const handleSignUp = async (event) => {
    event.preventDefault();
  
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    const signupData = { name, email, password, phone: "+1234567890", balance: 100.5,role , inviteCode };
  
    try {
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
        return;
      }
  
      const result = await response.json();
      alert("Signup successful!");
    } catch (error) {
      console.error("Network Error:", error);
      alert("An error occurred. Please try again.");
    }
  };
  
  
  

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Sign Up</h2>
        <form className="space-y-4" onSubmit={handleSignUp}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Confirm Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
            {role === "admin" && ( // Show invite code field only for admin
                <input
                    type="text"
                    placeholder="Enter Admin Invite Code"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                    required
                />
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
          Already have an account?{' '}
          <Link href="/signIn" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
