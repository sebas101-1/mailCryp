import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function EmailRead(){
  const { subject, sender, body } = useParams<{ subject: string; sender: string; body: string }>();
  const [emailBody, setEmailBody] = useState<string>("Did not work sad");
  const navigate = useNavigate();
  const backArrow = 'https://cdn.iconscout.com/icon/premium/png-256-thumb/back-arrow-2713813-2261467.png?f=webp';

  return (
    <div className='bg-slate-500 flex fadeIn justify-center items-center h-screen'>
      <div className='trigger bg-gray-200 rounded-2xl w-4/6 h-[90vh]'>
        <div className='flex opacityHalf w-full h-[3%] mb-6 rounded-tl-2xl rounded-tr-2xl bg-gray-400'>
          <img
            className='m-2 opacity-100 hover:border-blue-500 border-black cursor-pointer'
            onClick={() => navigate(`/home`)}
            alt="back Arrow"
            src={backArrow}
          />
        </div>
        <h1 className='text-xl m-10 font-bold'>{subject}</h1>
        <div className='mt-4'>
          <div className='flex mb-10'>
            <p className='ml-10 font-bold'>From: {sender}</p>
          </div>
          <div className='text-center justify-normal'>
            {emailBody ? (
              <div dangerouslySetInnerHTML={{ __html: emailBody }} />
            ) : (
              <p>Loading email content...</p>
            )}
          </div>
        </div>
      </div>
    </div>
    )
}
