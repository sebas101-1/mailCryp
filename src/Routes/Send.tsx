import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill CSS

export default function Send() {
  const back = 'https://cdn-icons-png.flaticon.com/512/130/130882.png';
  const [body, setBody] = useState(''); // State for the email body

  return (
    <div className="gradiantBg flex justify-center items-center h-screen">
      <div className="bg-gray-200 shadow-2xl h-[90vh] w-[90vw]">
        {/* Back button */}
        <Link to={'/home'}>
          <img
            className="h-[2rem] transition-all hover:bg-gray-300 m-2 rounded-full border-2 p-2"
            src={back}
            alt="Back"
          />
        </Link>

        {/* Subject */}
        <div className="flex">
          <input
            className="w-full text-2xl border-b-2 border-gray-300 p-8 text-center bg-gray-200"
            defaultValue="Subject"
          />
        </div>

        {/* Recipient Fields */}
        <div className="mt-4">
          <div className="flex w-full text-lg border-b-2 border-gray-300 p-4 text-center bg-gray-200">
            <p className="mr-2">To:</p>
            <input
              className="bg-gray-200 w-full"
              defaultValue="example@mailcryp.com"
            />
          </div>
          <div className="flex w-full text-lg border-b-2 border-gray-300 p-4 text-center bg-gray-200">
            <p className="mr-2">CC:</p>
            <input
              className="bg-gray-200 w-full"
              defaultValue=""
            />
          </div>
        </div>

        {/* Email Body */}
        <div className="border-2 border-red-50">
          <ReactQuill
            theme="snow"
            value={body}
            onChange={setBody}
            className="h-[40vh] border-none m-8 bg-white rounded-lg"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-left m-4">
          <button
            onClick={() => console.log({ body })}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
