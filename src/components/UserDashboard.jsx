// "use client";

// import { useSelector } from "react-redux";
// import { useState } from "react";
// import UploadRecordingModal from "@/components/UploadRecordingModal";
// import TextToSpeechModal from "@/components/TextToSpeechModal";

// export default function UserDashboard() {
//   const [uploadModalOpen, setUploadModalOpen] = useState(false);
//   const [ttsModalOpen, setTtsModalOpen] = useState(false);

//   // Fetch user data from Redux store
//   const user = useSelector((state) => state.users.loggedInUser);

//   return (
//     <div className="pt-20 bg-gray-100 dark:bg-gray-900 min-h-screen p-6">
//       <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded p-6">
//         <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
//           User Dashboard
//         </h1>

//         {/* User Details */}
//         <div className="mb-6">
//           <p>
//             <strong>Name:</strong> {user?.name || "N/A"}
//           </p>
//           <p>
//             <strong>IP Address:</strong> {user?.ip || "N/A"}
//           </p>
//           <p>
//             <strong>Mobile:</strong> {user?.phone || "N/A"}
//           </p>
//           <p>
//             <strong>Available Balance:</strong> ${user?.balance || 0}
//           </p>
//           <p>
//             <strong>Trunks Allotted:</strong>{" "}
//             {user?.trunks && user.trunks.length > 0
//               ? user.trunks.join(", ")
//               : "No Trunks Allotted"}
//           </p>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex gap-4">
//           <button
//             onClick={() => setUploadModalOpen(true)}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             Upload Recording
//           </button>
//           <button
//             onClick={() => setTtsModalOpen(true)}
//             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//           >
//             Text to Speech
//           </button>
//         </div>
//       </div>

//       {/* Modals */}
//       {uploadModalOpen && (
//         <UploadRecordingModal onClose={() => setUploadModalOpen(false)} />
//       )}
//       {ttsModalOpen && <TextToSpeechModal onClose={() => setTtsModalOpen(false)} />}
//     </div>
//   );
// }




"use client";

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { updateLoggedInUser } from "../redux/slices/userSlice"; // Import the correct action

export default function UserDashboard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.loggedInUser); // Access loggedInUser
  const [audioFile, setAudioFile] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [newBalance, setNewBalance] = useState(user.balance); // Initialize with user's current balance

  // Check if user exists before rendering details
  if (!user) {
    return <div>Loading...</div>; // Show loading state while user data is being fetched
  }

  const handleFileUpload = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (audioFile) {
      // Dispatch action to upload the recording
      // dispatch(uploadRecording(audioFile));
    } else {
      alert("Please select a file to upload.");
    }
  };

  const handleTextToSpeech = () => {
    if (textInput) {
      // Dispatch action to convert text to speech
      // dispatch(textToSpeech(textInput));
    } else {
      alert("Please enter text to convert to speech.");
    }
  };

  const handleBalanceUpdate = async (newBalance) => {
    try {
      const response = await fetch('/api/user/updateBalance', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ balance: newBalance }),
      });
      if (response.ok) {
        dispatch(updateLoggedInUser({ balance: newBalance })); // Update Redux store
      } else {
        alert('Failed to update balance');
      }
    } catch (error) {
      console.error('Error updating balance:', error);
    }
  };
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          dispatch(updateLoggedInUser(data)); // Update Redux store with fetched user data
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [dispatch]);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        router.push('/login'); // Redirect to login if no token
      } else {
        try {
          const response = await fetch('/api/validateToken', {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!response.ok) {
            router.push('/login'); // Redirect to login if token is invalid
          }
        } catch (error) {
          router.push('/login'); // Redirect to login if error
        }
      }
    };
  
    checkToken();
  }, []);
  

  return (
    <div className="bg-cover bg-fixed min-h-screen pt-8">
      <div className="p-8 bg-gray-900 bg-opacity-70">
        <h1 className="text-3xl text-white mb-4">User Dashboard</h1>
        <div className="mb-4">
          <p className="text-white">Balance: {user.balance}</p>
          <p className="text-white">Trunks Available: {user.trunks.join(", ")}</p>
        </div>
        <div className="mb-4">
          <label className="text-white">Update Balance</label>
          <input
            type="number"
            value={newBalance}
            onChange={(e) => setNewBalance(e.target.value)}
            className="border p-2"
          />
          <button
            onClick={handleBalanceUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Update Balance
          </button>
        </div>
        <div className="mb-4">
          <label className="text-white">Upload Recording</label>
          <input type="file" onChange={handleFileUpload} className="block" />
          <button
            onClick={handleUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Upload Recording
          </button>
        </div>
        <div className="mb-4">
          <label className="text-white">Text to Speech</label>
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            rows="4"
            className="w-full border p-2"
          />
          <button
            onClick={handleTextToSpeech}
            className="bg-green-500 text-white px-4 py-2 rounded mt-2"
          >
            Convert to Speech
          </button>
        </div>
      </div>
    </div>
  );
}
  