import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../hero/Sidebar';
import axios from 'axios';

// Define email type for better type safety
interface Email {
  messageId: string;
  from:  string ;
  subject: string;
  date: Date;
  text: string;
  textashtml: string;
}

const Home: React.FC = () => {
  const [listOfMail, setListOfMail] = useState<Email[]>([]);
  const [listOfMailSpam, setListOfMailSpam] = useState<Email[]>([]);
  const [listOfMailImportant, setListOfMailImportant] = useState<Email[]>([]);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  // Check login status and fetch emails
  useEffect(() => {
    axios.defaults.withCredentials = true;
    
    const fetchData = async () => {
      try {
        // Check login status
        await axios.get('http://localhost:3000/loggedIn');
        console.log("User is logged in");
        
        // Fetch emails
        const response = await axios.get('http://localhost:3000/getEmails');
        console.log("Emails fetched successfully:", response.data);
        
        // Process emails
        let emails: Email[] = [];
        console.log("email:", response.data.emails.length);
        for (let message = 0; message < response.data.emails.length; message++) {
          emails.push({
            messageId: response.data.emails[message].messageId,
            from: response.data.emails[message].from.text,
            subject: response.data.emails[message].subject,
            date: new Date(response.data.emails[message].date),
            text: response.data.emails[message].text,
            textashtml: response.data.emails[message].textAsHtml
          })
        }
        console.log("Processed emails:", emails);
        console.log("Email From:", emails[0].from);
        // const emails: Email[] = response.data.map((email: any) => ({
        //   messageId: email.messageId,
        //   from: email.from,
        //   subject: email.subject,
        //   date: new Date(email.date),
        //   text: email.text
        // }));
        
        setListOfMail(emails);
        setIsLoading(false);
      } catch (error: any) {
        if (error.response?.status === 401) {
          console.log("User not logged in, redirecting...");
          navigate('/');
        } else {
          console.error("Error fetching data:", error);
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [navigate]);

  const tabUnderline = (tab: number) => setCurrentTab(tab);

  const handleEmailClick = (email: Email) => {
    navigate(`/email/${encodeURIComponent(email.messageId)}`, { state: { email } });
  };

  const renderEmails = (listMail: Email[]) => {
    if (isLoading) {
      return (
        <div className='p-10'>
          <p>Loading emails...</p>
        </div>
      );
    }
    
    return listMail.length > 0 ? (
      listMail.map((email, index) => (
        <div
          className="border-b ml-0 p-1 sm:p-2 hover:scale-[1.02] border-2 border-black sm:hover:border-black hover:border-2 shadow-2xl bg-gray-100 cursor-pointer sm:pb-8 text-center flex transition-all w-full smw-full sm:h-4 lg:h-8 sm:border-gray-100"
          key={`${email.messageId}-${index}`}
          onClick={() => handleEmailClick(email)}
        >
          <p className="ml-8  mr-8 max-w-xs">{(email.from == undefined)? "Unknown":email.from}</p>
          <p className="flex-grow font-bold text-left">{email.subject}</p>
          <p className="ml-4 text-sm text-gray-500">
            {email.date.toLocaleDateString()}
          </p>
        </div>
      ))
    ) : (
      <div className='p-10'>
        <p>No Mail (～￣▽￣)～</p>
      </div>
    );
  };

  return (
    <div className="flex h-screen">
      <Sidebar onTabChange={tabUnderline} currentTab={currentTab}/>

      <div className="w-full homeBg shadow-2xl h-full flex flex-col">
        <div className="flex-grow overflow-auto p-6 sm:p-8">
          <div className='bg-gray-100 floatIn border w-full shadow-2xl border-gray-300'>
            {currentTab === 0 && renderEmails(listOfMail)}
            {currentTab === 1 && renderEmails(listOfMailSpam)}
            {currentTab === 2 && renderEmails(listOfMailImportant)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;