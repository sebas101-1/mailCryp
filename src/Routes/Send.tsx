import { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill CSS

export default function Send() {
  const back = 'https://cdn-icons-png.flaticon.com/512/130/130882.png';
  const [body, setBody] = useState(''); // State for the email body
  const [attachedFile, setAttachedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setAttachedFile(event.target.files[0]);
    }
  };
  
  return (
    <div className="gradiantBg flex overflow-hidden justify-center items-center h-[100vh]">
      <div className="bg-gray-200 shadow-2xl h-full w-[90vw] rounded-md">
        {/* Back button */}
        <Link to="/home">
          <img
            className="h-[2rem] transition-all hover:bg-gray-300 m-2 rounded-full border-2 p-2"
            src={back}
            alt="Back"
          />
        </Link>

        {/* Subject */}
        <div className="flex">
          <input
            className="w-full text-2xl border-b-2 border-gray-300 p-8 text-center bg-gray-200 focus:outline-none"
            placeholder="Subject"
          />
        </div>

        {/* Recipient Fields */}
        <div className="mt-4">
          <div className="flex w-full text-lg border-gray-300 border-b-2 p-4 text-center bg-gray-200">
            <p className="mr-2">To:</p>
            <input
              className="bg-gray-200 w-full focus:outline-none"
              placeholder="Recipient's email"
            />
          </div>
          <div className="flex w-full text-lg border-b-2 border-gray-300 p-4 text-center bg-gray-200">
            <p className="mr-2">CC:</p>
            <input
              className="bg-gray-200 w-full focus:outline-none"
              placeholder="Optional"
            />
          </div>
        </div>

        {/* Email Body */}
        <div className="h-[40vh] m-8 scrolling-gradient-border bg-white rounded-lg shadow-sm overflow-hidden">
          <ReactQuill
            theme="snow"
            value={body}
            onChange={setBody}
            className="h-full"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-start m-4 items-center">
          <button
            onClick={() => console.log({ body, attachedFile })}
            className="bg-blue-500 rounded-r-none text-white text-sm px-4 py-2 rounded-full hover:shadow-2xl shadow hover:bg-blue-600 border-gray-300 border-r-2 transition"
          >
            Send
          </button>
          <label
            htmlFor="files"
            className="bg-blue-500 text-sm text-white px-4 py-2 rounded-l-none rounded-full hover:shadow-2xl shadow hover:bg-blue-600 transition cursor-pointer"
          >
            Select File
          </label>
          <input
            id="files"
            type="file"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          {attachedFile && (
            <p className="ml-4 text-sm text-gray-600">
              Attached: {attachedFile.name}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
