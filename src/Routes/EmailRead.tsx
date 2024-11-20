import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Email from "../Classes/emailClass"; // Assuming you have this class for parsing

export default function EmailRead() {
  // Expect emailPath to be a string from useParams
  const { emailPath } = useParams<{ emailPath: string }>(); 
  
  // Correct the useState declaration for the Email class
  const [email, setEmail] = useState<Email | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state

  // Fetch and parse the .eml file
  useEffect(() => {
    const fetchAndParseEmail = async () => {
      try {
        if (emailPath) {
          // Fetch the .eml file from the given path
          
          // Assuming Email is a class to parse email content, instantiate it
          const parsedEmail = new Email(emailPath); // Adjust this to match your class logic
          parsedEmail.setup();
          // Now set the parsed email in state
          setEmail(parsedEmail);
          // Set email body to either HTML or plain text
          setIsLoading(false); // Stop loading after fetching
        }
      } catch (error) {
        console.error('Failed to fetch or parse the email:', error);
        setIsLoading(false); // Stop loading even if there's an error
      }
    };

    fetchAndParseEmail();
  }, [emailPath]); // Dependency on emailPath

  return (
    <div className='bg-slate-500 flex fadeIn justify-center items-center h-screen'>
      <div className='trigger bg-gray-200 rounded-2xl w-full '>
        <h1 className='text-xl m-10 font-bold'>{email?.Subject}</h1>
        <div className='mt-4'>
          <div className='flex mb-10'>
            <p className='ml-10 font-bold'>From: {email?.Sender}</p>
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
