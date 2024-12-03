import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Email from "../Classes/emailClass"; // Assuming you have this class for parsing
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill CSS

export default function EmailRead() {
  // Expect emailPath to be a string from useParams
  const { emailPath } = useParams<{ emailPath: string }>(); 
  const [replyText, setreplyText] = useState('');
  // Correct the useState declaration for the Email class
  const [email, setEmail] = useState<Email | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state
  const back = 'https://cdn-icons-png.flaticon.com/512/130/130882.png'
  const [reply,setReply] = useState<boolean>(false)
  // Fetch and parse the .eml file
  useEffect(() => {
    const fetchAndParseEmail = async () => {
      try {
        if (emailPath) {
          const parsedEmail = new Email(emailPath);
          parsedEmail.setup();
          setEmail(parsedEmail);
          setIsLoading(false); // Stop loading after fetching
          console.log("loaded Email")
        }
      } catch (error) {
        console.error('Failed to fetch or parse the email:', error);
        setIsLoading(false); // Stop loading even if there's an error
      }
    };

    fetchAndParseEmail();
  }, [emailPath]);

  return (
    <div className='gradiantBg flex justify-center overflow-scroll items-center h-[100vh]'>

      <div className='bg-gray-200 transition shadow-2xl h-[90vh] overflow-auto w-[90vw] '>
        <Link to={'/home'}>
          <img className='h-[2rem] transition-all hover:bg-gray-300  m-2 rounded-full border-2 p-2' src={back}/>
        </Link>
        <h1 className='text-2xl m-8 border-b-2 border-gray-300 font-bold'>{email?.Subject}</h1>
        <div className='mt-2'>
          <div className='flex mb-10'>
            <p className='ml-8 border-b-2 border-gray-300 font-bold'>From {email?.Sender}</p>
          </div>
          <div className={`border-[1px] shadow-md rounded-md bg-white m-8 mb-0  p-4 border-gray-300 h-full justify-normal ${reply ? "border-b-0 rounded-b-none" : ""}`}>
            {isLoading ? (
              <p>Loading email content...</p>
            ) : email?.html ? (
              <div dangerouslySetInnerHTML={{ __html: email?.html }} /> 
            ) : (
              <p>No email content available.</p>
            )}
          </div>   
            <>  
                <ReactQuill
                  theme="snow"
                  value={replyText}
                  onChange={setreplyText}
                  style={{
                    height: reply? '20vh': 0,
                    opacity: reply? '100%': 0
                  }}
                  className=' border-[1px] shadow-md border-gray-300 border-t-0 transition-all rounded-t-none m-8 mt-0 overflow-y-hidden bg-white rounded-lg'
                />
                { reply? 
                  
                  <div className="flex justify-left m-4">
                    <button
                        onClick={() => console.log(replyText)}
                        className="bg-blue-500 text-sm rounded-r-none mr-0 text-white px-2 py-[0.25rem] rounded shadow pr-2 hover:bg-blue-600 border-gray-300 border-r-2 transition"
                    >
                        Send
                    </button>
                    <button
                        onClick={() => setReply(false)}
                        className="bg-blue-500 rounded-l-none  text-white px-2 py-[0.25rem] rounded shadow-sm hover:shadow-2xl hover:bg-blue-600 transition"
                    >
                        Back
                    </button>
                  </div>
                  :
                  <div className="flex justify-left m-4">
                    <button
                        onClick={() => setReply(true)}
                        className="bg-blue-500 text-sm mr-0 text-white px-2 py-[0.25rem] rounded shadow pr-2 hover:bg-blue-600 transition"
                    >
                        Reply
                    </button>
                  </div>
                  
                }
            </>
        </div>
      </div>
    </div>
  );
}
