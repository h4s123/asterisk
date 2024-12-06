import { useState } from "react";

export default function TextToSpeechModal({ onClose }) {
  const [text, setText] = useState("");

  const handleConvert = () => {
    if (!text.trim()) {
      alert("Please enter some text.");
      return;
    }
    // Simulate text-to-speech process
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
    alert("Text converted to speech successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Text to Speech</h2>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text here..."
          className="w-full p-2 border rounded mb-4 text-gray-800 dark:text-white"
          rows="5"
        />
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleConvert}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Convert
          </button>
        </div>
      </div>
    </div>
  );
}
