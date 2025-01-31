import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Email from "../Classes/emailClass"; // Assuming you have this class for parsing
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill CSS
import star from '../assets/star.svg'
export default function EmailRead() {
  // Expect emailPath to be a string from useParams
  const { emailPath } = useParams<{ emailPath: string }>(); 
  const [replyText, setreplyText] = useState('');
  // Correct the useState declaration for the Email class
  const [email, setEmail] = useState<Email | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state
  const back = 'https://cdn-icons-png.flaticon.com/512/130/130882.png'
  const [reply,setReply] = useState<boolean>(false)
  const [starred,setStarred] = useState<boolean>(false)
  const [trashHovered,setTrashHovered] = useState<boolean>(false)
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
    <div className='elSend flex justify-center overflow-scroll items-center h-[100vh]'>

      <div className='bg-white strong-shadow transition shadow-2xl h-[90vh] overflow-auto w-[90vw] '>
        <Link to={'/home'}>
          <img className='h-[2rem] transition-all hover:bg-gray-100  m-2 rounded-full p-2' src={back}/>
        </Link>
        
        <div className='mt-2'>
          <div className='flex mb-10'>
            <p className=' ml-8 border-b-2 text-xl transition-all border-gray-300 font-bold'>{email?.Subject}</p>
            <svg fill={starred? 'yellow' : 'none'} onClick={() => {setStarred(!starred)}} className='hover:cursor-pointer h-[1.5rem] justify-end transition-all hover:scale-150 ml-8' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.245 4.174C11.4765 3.50808 11.5922 3.17513 11.7634 3.08285C11.9115 3.00298 12.0898 3.00298 12.238 3.08285C12.4091 3.17513 12.5248 3.50808 12.7563 4.174L14.2866 8.57639C14.3525 8.76592 14.3854 8.86068 14.4448 8.93125C14.4972 8.99359 14.5641 9.04218 14.6396 9.07278C14.725 9.10743 14.8253 9.10947 15.0259 9.11356L19.6857 9.20852C20.3906 9.22288 20.743 9.23007 20.8837 9.36432C21.0054 9.48051 21.0605 9.65014 21.0303 9.81569C20.9955 10.007 20.7146 10.2199 20.1528 10.6459L16.4387 13.4616C16.2788 13.5829 16.1989 13.6435 16.1501 13.7217C16.107 13.7909 16.0815 13.8695 16.0757 13.9507C16.0692 14.0427 16.0982 14.1387 16.1563 14.3308L17.506 18.7919C17.7101 19.4667 17.8122 19.8041 17.728 19.9793C17.6551 20.131 17.5108 20.2358 17.344 20.2583C17.1513 20.2842 16.862 20.0829 16.2833 19.6802L12.4576 17.0181C12.2929 16.9035 12.2106 16.8462 12.1211 16.8239C12.042 16.8043 11.9593 16.8043 11.8803 16.8239C11.7908 16.8462 11.7084 16.9035 11.5437 17.0181L7.71805 19.6802C7.13937 20.0829 6.85003 20.2842 6.65733 20.2583C6.49056 20.2358 6.34626 20.131 6.27337 19.9793C6.18915 19.8041 6.29123 19.4667 6.49538 18.7919L7.84503 14.3308C7.90313 14.1387 7.93218 14.0427 7.92564 13.9507C7.91986 13.8695 7.89432 13.7909 7.85123 13.7217C7.80246 13.6435 7.72251 13.5829 7.56262 13.4616L3.84858 10.6459C3.28678 10.2199 3.00588 10.007 2.97101 9.81569C2.94082 9.65014 2.99594 9.48051 3.11767 9.36432C3.25831 9.23007 3.61074 9.22289 4.31559 9.20852L8.9754 9.11356C9.176 9.10947 9.27631 9.10743 9.36177 9.07278C9.43726 9.04218 9.50414 8.99359 9.55657 8.93125C9.61593 8.86068 9.64887 8.76592 9.71475 8.57639L11.245 4.174Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <Link to={'/home'}>
              <svg onMouseEnter={() => {setTrashHovered(true)}} onMouseLeave={() => {setTrashHovered(false)}} className='h-[1.5rem] justify-end transition-all hover:scale-150 ml-8' viewBox="0 0 24 24" fill={trashHovered? 'red':'none'} xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </Link>
            <svg onClick={() => setReply(!reply)} className='hover:cursor-pointer h-[1.5rem] justify-end transition-all hover:scale-150 ml-8' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 17V15.8C20 14.1198 20 13.2798 19.673 12.638C19.3854 12.0735 18.9265 11.6146 18.362 11.327C17.7202 11 16.8802 11 15.2 11H4M4 11L8 7M4 11L8 15" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div className='w-full flex'>
            <p className='ml-8 pb-2 border-b-2 border-gray-300 font-bold'>From: {email?.Sender}</p>
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
                        className="bg-blue-500 text-md mr-0 hover:scale-150 shadow-lg text-white px-2 py-[0.25rem] rounded  pr-2 hover:bg-blue-600 border-gray-300 transition"
                    >
                        Send
                    </button>
                  </div>
                  :
                  <></>
                  
                }
            </>
        </div>
      </div>
    </div>
  );
}
