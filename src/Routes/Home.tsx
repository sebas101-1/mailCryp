import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Email from "../Classes/emailClass"
const Home: React.FC = () => {
  const [listOfMail, setListOfMail] = useState<Email[]>([]);
  const [listOfMailSpam, setListOfMailSpam] = useState<Email[]>([]);
  const [listOfMailImportant, setListOfMailImportant] = useState<Email[]>([]);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [offset, setOffset] = useState('ml-[4.166666666666667%]');
  const [testEmail, setTestEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/testing.eml')
      .then((response) => response.text())
      .then((data) => setTestEmail(data));

    const testingFile = new File([testEmail], "Testing.eml"); // Assuming Testing is properly imported as a file content

    setListOfMailImportant([
      new Email( new File([''], "testing.txt")),
      new Email(new File([''], "testing.txt")),
      new Email(new File([''], "testing.txt"))
    ]);
    

    setListOfMailSpam([
      new Email(new File([''], "testing.txt")),
      new Email(new File([''], "testing.txt")),
      new Email(new File([''], "testing.txt"))
    ]);

    setListOfMail([
      new Email(new File([''], "testing.txt")),
      new Email(new File([''], "testing.txt")),
      new Email(new File([''], "testing.txt"))
    ]);
  }, []);

  const tabUnderline = (tab: number) => {
    setCurrentTab(tab);
    if (tab === 0) {
      setOffset('ml-[4.166666666666667%]');
    }
    if (tab === 1) {
      setOffset('ml-[37.49999996666667%]');
    }
    if (tab === 2) {
      setOffset('ml-[70.83333329999667%]');
    }
  };

  const handleEmailClick = (email: Email) => {
    navigate(`/email/${encodeURIComponent(email.mailSubject)}`);
  };

  return (
    <div className='bg-slate-500 fadeIn flex justify-center items-center h-screen'>
      <div className='trigger bg-gray-200 rounded-2xl w-4/6 h-[90vh]'>
        <div className='flex border-b-2 border-gray-300'>
          <button
            onClick={() => tabUnderline(0)}
            className={'border-gray-300 bg-white-100 transition-all hover:bg-gray-300 rounded-tl-2xl w-1/3 p-8'}
          >
            Primary
          </button>
          <button
            onClick={() => tabUnderline(1)}
            className={'border-gray-300 bg-white-100 transition-all hover:bg-gray-300 w-1/3 border-r-2 border-l-2 p-8'}
          >
            Spam
          </button>
          <button
            onClick={() => tabUnderline(2)}
            className={'border-gray-300 bg-white-100 transition-all hover:bg-gray-300 rounded-tr-2xl w-1/3 p-8'}
          >
            Important
          </button>
        </div>
        <div className={'target w-3/12 bg-cyan-600 h-[2px] rounded-full transition-all ' + offset} />
        {currentTab === 0 && listOfMail.map((email, index) => (
          <div
            className='border-b-2 ml-0 m-2 hover:bg-gray-100 cursor-pointer pb-8 text-center flex transition-all w-full h-8 border-gray-300'
            key={index}
            onClick={() => handleEmailClick(email)}
          >
            <p className='ml-8 font-bold mr-8'>{email.mailSender}</p>
            <p>{email.mailSubject}</p>
          </div>
        ))}
        {currentTab === 1 && listOfMailSpam.map((email, index) => (
          <div
            className='border-b-2 ml-0 m-2 hover:bg-gray-100 cursor-pointer pb-8 text-center flex transition-all w-full h-8 border-gray-300'
            key={index}
            onClick={() => handleEmailClick(email)}
          >
            <p className='ml-8 font-bold mr-8'>{email.mailSender}</p>
            <p>{email.mailSubject}</p>
          </div>
        ))}
        {currentTab === 2 && listOfMailImportant.map((email, index) => (
          <div
            className='border-b-2 ml-0 m-2 hover:bg-gray-100 cursor-pointer pb-8 text-center flex transition-all w-full h-8 border-gray-300'
            key={index}
            onClick={() => handleEmailClick(email)}
          >
            <p className='ml-8 font-bold mr-8'>{email.mailSender}</p>
            <p>{email.mailSubject}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
