import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Email from "../Classes/emailClass";
import Sidebar from '../hero/Sidebar';
import axios from 'axios';

const Home: React.FC = () => {
  const [listOfMail, setListOfMail] = useState<Email[]>([]);
  const [listOfMailSpam, setListOfMailSpam] = useState<Email[]>([]);
  const [listOfMailImportant, setListOfMailImportant] = useState<Email[]>([]);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [sidebarOpen, setSidebar] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    axios.defaults.withCredentials = true;

  // Check login status
  axios.get('http://localhost:3000/loggedIn')
    .then(response => {
      console.log("User is logged in:", response.data);
    })
    .catch(error => {
      if (error.response && error.response.status === 401) {
        console.log("User not logged in, redirecting...");
        // Handle redirection here
      } else {
        console.error("Error checking login status:", error);
        
      }
    });


    const testingFile = "../assets/Testing.eml";
    const primaryEmails = [new Email(testingFile), new Email(testingFile), new Email(testingFile)];
    const spamEmails: Email[] = [];
    const importantEmails: Email[] = [];

    Promise.all([
      ...primaryEmails.map((email) => email.setup()),
      ...spamEmails.map((email) => email.setup()),
      ...importantEmails.map((email) => email.setup()),
    ])
      .then(() => {
        setListOfMail(primaryEmails);
        setListOfMailSpam(spamEmails);
        setListOfMailImportant(importantEmails);
        console.log("Spam Emails: " + spamEmails);
      })
      .catch((err) => {
        console.error("Failed to set up emails", err);
      });
  }, [navigate]); // 👈 Added `navigate` to avoid stale closures

  const tabUnderline = (tab: number) => setCurrentTab(tab);

  const handleEmailClick = (email: Email) => {
    navigate(`/email/${encodeURIComponent(email.pathToEmail)}`);
  };
  const renderEmails = (listMail:Email[]) => (
    (listMail.length != 0)?
      listMail.map((email, index) => (
        <div
          className="border-b ml-0 p-2 hover:scale-[1.02] border-2 hover:border-black  hover:border-2 shadow-2xl bg-gray-100 cursor-pointer pb-8 text-center flex transition-all w-full h-8 border-gray-100"
          key={index}
          onClick={() => handleEmailClick(email)}
        >
          <p className="ml-8 font-bold mr-8">{email.Sender}</p>
          <p>{email.Subject}</p>
        </div>
      ))
    :
    <div className='p-10'>
      <p>No Mail (～￣▽￣)～</p>
    </div>
  )
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar onTabChange={tabUnderline} currentTab={currentTab} open={sidebarOpen} />

      {/* Main Content */}
      <div className="w-full homeBg shadow-2xl h-full flex flex-col">
        <div className="flex-grow overflow-auto p-8">
          <div className='bg-gray-100 border shadow-2xl border-gray-300'>
            {currentTab === 0 &&
              renderEmails(listOfMail)
            }
            {currentTab === 1 &&
              renderEmails(listOfMailSpam)
            }
            {currentTab === 2 && 
              renderEmails(listOfMailImportant)
            }
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
