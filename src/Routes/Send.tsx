import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill CSS
import axios from 'axios';
  interface Email {
    to: string;
    subject: string;
    textashtml: string; 
    attatchment: File; // Attachment file
  }
export default function Send() {
  const back = 'https://cdn-icons-png.flaticon.com/512/130/130882.png';
  const [body, setBody] = useState(''); // State for the email body
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const[error, setError] = useState<string>('');
  const navigate = useNavigate();
  const [finalEmail, setFinalEmail] = useState<Email>({
    to: '',
    subject: '',
    textashtml: '',
    attatchment: new File([], 'default.txt') // Default empty file
  });
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFinalEmail(prev => ({ ...prev, attatchment: event.target.files![0] }));
    }
  };

  function sendMail() {
    console.log("Sending Email", finalEmail);
    axios
      .post('http://localhost:3000/sendEmail', 
        {email: finalEmail,
        },
        {headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }}
      )
      .then((response) =>{

      // Optionally clear the form inputs
        console.log(response)
        if(response.data.success){
          // navigate('/home');
          setError(response.data.message);
        }  
        else{
          setError(response.data.message);
        }
        
      })
      .catch((error) => {
        console.error('Email Failed To Send', error);
      });
  }
  
  return (
    <div className="elSend flex overflow-hidden justify-center items-center h-[100vh]">
      <div className="bg-white strong-shadow transition shadow-2xl h-auto overflow-auto w-[90vw]">
        {/* Back button */}
        <Link to={'/home'}>
          <img className='h-[2rem] transition-all hover:bg-gray-100  m-2 rounded-full p-2' src={back}/>
        </Link>

        {/* Subject */}
        <div className="flex">
          <input
            className="w-auto ml-8 text-2xl border-b-2 border-gray-300 p-2 focus:outline-none"
            placeholder="Subject"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (event && event.target) {
                setFinalEmail(prev => ({ ...prev, subject: event.target.value }));
              }
            }}
          />
        </div>

        {/* Recipient Fields */}
        <div className="mt-4">
            <input
              className="w-auto ml-8 text-large border-b-2 border-gray-300 p-2 focus:outline-none"
              placeholder="Recipient's email"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (event && event.target) {
                setFinalEmail(prev => ({ ...prev, to: event.target.value }));
              }
            }}
            />
            <input
              className="w-auto ml-8 text-large border-b-2 border-gray-300 p-2 focus:outline-none"
              placeholder="CC: Optional"
            />
        </div>

        {/* Email Body */}
        <div className="h-[40vh] m-8 bg-white rounded-lg shadow-sm overflow-hidden">
          <ReactQuill
            theme="snow"
            value={body}
            onChange={(value: string) => {
              setBody(value);
              setFinalEmail(prev => ({ ...prev, textashtml: value }));
            }}
            className="h-full"
          />
        </div>
        <p>{error}</p>

        {/* Action Buttons */}
        <div className="flex justify-start m-4 items-center">
          <button
            onClick={() => sendMail()}
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
