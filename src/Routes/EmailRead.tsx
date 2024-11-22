import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Email from "../Classes/emailClass"; // Assuming you have this class for parsing
import Sidebar from '../hero/Sidebar';

export default function EmailRead() {
  // Expect emailPath to be a string from useParams
  const { emailPath } = useParams<{ emailPath: string }>(); 
  
  // Correct the useState declaration for the Email class
  const [email, setEmail] = useState<Email | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state
  const back = 'https://cdn-icons-png.flaticon.com/512/130/130882.png'
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
    <div className='gradiantBg flex justify-center items-center h-screen'>

      <div className='bg-gray-200 shadow-2xl h-[90vh] w-[90vw] '>
        <Link to={'/home'}>
          <img className='h-[2rem] transition-all hover:bg-gray-300  m-2 rounded-full border-2 p-2' src={back}/>
        </Link>
        <h1 className='text-xl m-10 font-bold'>{email?.Subject}</h1>
        <div className='mt-4'>
          <div className='flex mb-10'>
            <p className='ml-10 font-bold'>{email?.Sender}</p>
          </div>
          <div className='text-center justify-normal'>
            {isLoading ? (
              <p>Loading email content...</p>
            ) : email?.html ? (
              <div dangerouslySetInnerHTML={{ __html: email?.html }} /> 
            ) : (
              <p>No email content available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
