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
    axios.get('http://127.0.0.1:3000/loggedIn', 
    
    {headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      withCredentials: true
    })
    .then(response => {
      console.log("User is logged in:", response.data);
    })
    .catch(error => {
      console.log("User not logged in, redirecting..." + error);
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
      })
      .catch((err) => {
        console.error("Failed to set up emails", err);
      });
  }, [navigate]); // 👈 Added `navigate` to avoid stale closures

  const tabUnderline = (tab: number) => setCurrentTab(tab);

  const handleEmailClick = (email: Email) => {
    navigate(`/email/${encodeURIComponent(email.pathToEmail)}`);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar onTabChange={tabUnderline} currentTab={currentTab} open={sidebarOpen} />

      {/* Main Content */}
      <div className="w-full homeBg shadow-2xl h-full flex flex-col">
        <div className="flex-grow overflow-auto p-8">
          <div className='bg-gray-100 border shadow-2xl border-gray-300'>
            {currentTab === 0 &&
              listOfMail.map((email, index) => (
                <div
                  className="border-b ml-0 p-2 hover:scale-[1.02] border-2 hover:border-black  hover:border-2 shadow-2xl bg-gray-100 cursor-pointer pb-8 text-center flex transition-all w-full h-8 border-gray-100"
                  key={index}
                  onClick={() => handleEmailClick(email)}
                >
                  <p className="ml-8 font-bold mr-8">{email.Sender}</p>
                  <p>{email.Subject}</p>
                </div>
              ))}
            {currentTab === 1 &&
              listOfMailSpam.map((email, index) => (
                <div
                  className="border-b ml-0 m-2 hover:bg-gray-100 hover:border hover:shadow-2xl cursor-pointer pb-8 text-center flex transition-all w-full h-8 border-gray-300"
                  key={index}
                  onClick={() => handleEmailClick(email)}
                >
                  <p className="ml-8 font-bold mr-8">{email.Sender}</p>
                  <p>{email.Subject}</p>
                </div>
              ))}
            {currentTab === 2 &&
              listOfMailImportant.map((email, index) => (
                <div
                  className="border-b ml-0 m-2 hover:bg-gray-100 hover:border hover:shadow-2xl cursor-pointer pb-8 text-center flex transition-all w-full h-8 border-gray-300"
                  key={index}
                  onClick={() => handleEmailClick(email)}
                >
                  <p className="ml-8 font-bold mr-8">{email.Sender}</p>
                  <p>{email.Subject}</p>
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
