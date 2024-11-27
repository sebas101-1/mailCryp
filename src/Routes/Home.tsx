import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Email from "../Classes/emailClass";
import Sidebar from '../hero/Sidebar';
const Home: React.FC = () => {
  const [listOfMail, setListOfMail] = useState<Email[]>([]);
  const [listOfMailSpam, setListOfMailSpam] = useState<Email[]>([]);
  const [listOfMailImportant, setListOfMailImportant] = useState<Email[]>([]);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [sidebarOpen, setSidebar] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const testingFile = "../assets/Testing.eml";
    
    const primaryEmails = [new Email(testingFile),new Email(testingFile),new Email(testingFile)];
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
  }, []);

  const tabUnderline = (tab: number) => setCurrentTab(tab);

  const handleEmailClick = (email: Email) => {
    navigate(`/email/${encodeURIComponent(email.pathToEmail)}`);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar onTabChange={tabUnderline} currentTab={currentTab} open={sidebarOpen} />

      {/* Main Content */}
      <div className="w-full boatBackground shadow-2xl h-full flex flex-col">
        <div className="flex-grow  overflow-auto p-4">
          {currentTab === 0 &&
            listOfMail.map((email, index) => (
              <div
                className="border-b-2 ml-0 p-2 hover:bg-gray-100 cursor-pointer pb-8 text-center flex transition-all w-full h-8 border-gray-300"
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
                className="border-b-2 ml-0 m-2 hover:bg-gray-100 cursor-pointer pb-8 text-center flex transition-all w-full h-8 border-gray-300"
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
                className="border-b-2 ml-0 m-2 hover:bg-gray-100 cursor-pointer pb-8 text-center flex transition-all w-full h-8 border-gray-300"
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
  );
};

export default Home;
