import { useEffect, useState } from 'react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import DOMPurify from 'dompurify'; // Add this import at the top
import he from 'he'; // Add this import at the top

interface Email {
  messageId: string;
  from: string; // Fixed to match backend structure
  subject: string;
  date: Date;
  text: string;
  textashtml: string; // Corrected property name
}

export default function EmailRead() {
  const { messageId } = useParams<{ messageId: string }>(); 
  const [replyText, setReplyText] = useState('');
  const [email, setEmail] = useState<Email | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const back = 'https://cdn-icons-png.flaticon.com/512/130/130882.png';
  const [reply, setReply] = useState<boolean>(false);
  const [starred, setStarred] = useState<boolean>(false);
  const [trashHovered, setTrashHovered] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch email data
  useEffect(() => {
    const fetchEmail = async () => {
      try {
        // First try to get from location state
        if (location.state?.email) {
          setEmail(location.state.email);
          setIsLoading(false);
          console.log('Email loaded from location state:', location.state.email);
          return;
        }
      } catch (error) {
        console.error('Failed to fetch email:', error);
        navigate('/home');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmail();
  }, [messageId, location.state, navigate]);

  // Handle send reply
  const handleSendReply = async () => {
    if (!email) return;
    
    try {
      await axios.post('http://localhost:3000/sendReply', {
        originalMessageId: email.messageId,
        replyContent: replyText
      });
      setReply(false);
      setReplyText('');
      alert('Reply sent successfully!');
    } catch (error) {
      console.error('Failed to send reply:', error);
      alert('Failed to send reply');
    }
  };

  // Format date nicely
  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return new Date(date).toLocaleString();
  };

  return (
    <div className='elRecive flex justify-center overflow-scroll items-center h-[100vh]'>
      <div className='bg-white strong-shadow transition shadow-2xl h-[90vh] overflow-auto w-[90vw] '>
        <Link to={'/home'}>
          <img 
            className='h-[2rem] transition-all hover:bg-gray-100 m-2 rounded-full p-2' 
            src={back} 
            alt="Back button"
          />
        </Link>
        
        <div className='mt-2'>
          <div className='flex mb-10 items-center'>
            <p className='ml-8 border-b-2 text-xl transition-all border-gray-300 font-bold'>
              {email?.subject || 'Loading...'}
            </p>
            
            {/* Star button */}
            <svg 
              fill={starred ? 'yellow' : 'none'} 
              onClick={() => setStarred(!starred)}
              className='md:hover:cursor-pointer h-[1.5rem] justify-end transition-all md:hover:scale-150 ml-4 md:ml-8' 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG path */}
            </svg>
            
            {/* Trash button */}
            <div className='md:hover:cursor-pointer transition-all md:hover:scale-150 ml-4 md:ml-8'>
              <svg 
                onMouseEnter={() => setTrashHovered(true)} 
                onMouseLeave={() => setTrashHovered(false)} 
                className='h-[1.5rem]' 
                viewBox="0 0 24 24" 
                fill={trashHovered ? 'red' : 'none'} 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* SVG path */}
              </svg>
            </div>
            
            {/* Reply button */}
            <svg 
              onClick={() => setReply(!reply)} 
              className='md:hover:cursor-pointer h-[1.5rem] justify-end transition-all md:hover:scale-150 ml-4 md:ml-8' 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG path */}
            </svg>
          </div>
          
          <div className='w-full flex mb-4'>
            <p className='ml-8 font-bold'>From: {email?.from}</p>
            <p className='ml-auto mr-8 text-gray-500 text-sm'>
              {formatDate(email?.date)}
            </p>
          </div>
          
          <div className={`border shadow-md rounded-md bg-white m-8 mb-0 p-4 border-gray-300 ${reply ? "border-b-0 rounded-b-none" : ""}`}>
            {isLoading ? (
              <p>Loading email content...</p>
            ) : (
              email?.textashtml ? (
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: DOMPurify.sanitize(he.decode(email.textashtml))
                  }} 
                />
              ) : (
                <p>Email Contents Not Found.</p>
              )
            )}
            
          </div>   
          
          {reply && (
            <>
              <ReactQuill
                theme="snow"
                value={replyText}
                onChange={setReplyText}
                className='border shadow-md border-gray-300 border-t-0 rounded-t-none m-8 mt-0 bg-white'
              />
              <div className="flex justify-left m-4">
                <button
                  onClick={handleSendReply}
                  className="bg-blue-500 text-md hover:bg-blue-600 text-white px-4 py-2 rounded shadow transition"
                >
                  Send
                </button>
                <button
                  onClick={() => setReply(false)}
                  className="ml-4 bg-gray-300 text-md hover:bg-gray-400 text-gray-800 px-4 py-2 rounded shadow transition"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}