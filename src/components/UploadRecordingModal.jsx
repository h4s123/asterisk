import { useState } from "react";

export default function UploadRecordingModal({ onClose }) {
  const [file, setFile] = useState(null);

  const handleFileUpload = () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    // Simulate upload process
    alert(`File "${file.name}" uploaded successfully!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Upload Recording</h2>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4 w-full text-gray-800 dark:text-white"
        />
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleFileUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
