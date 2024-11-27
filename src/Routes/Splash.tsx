import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, {useState } from 'react';
import mailIcon from '../assets/email.svg'
function CreateAccount() {
  const [error, setError] = useState('Welcome To MailCryp✉️');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({username: "",password: ""});
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const username = formData.username;
    const password = formData.password;
    // POST form data to the server
    axios
      .post('http://localhost:3000/login', 
        {username: username,
          password: password 
        },
        {headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }}
      )
      .then((response) =>{

      // Optionally clear the form inputs
        console.log(response)
        if(response.data.success){
          navigate('/home');
        }  
        else{
          setError(response.data.message);
        }
        
      })
      .catch((error) => {
        console.error('Error Login in', error);  
        setError("Username or Password is Incorrect");
      });
  };

  return (
    <>
      <div className="gradiantBg flex  min-h-screen">
        <div className="w-full max-w-md p-8 items-center justify-center bg-white shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Welcome</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                className="mt-1 p-2 scrolling-gradient-border w-full border border-gray-300"
                required
                onChange={handleChange}
                value={formData.username}
                autoFocus
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 scrolling-gradient-border w-full border border-gray-300"
                required
                onChange={handleChange}
                value={formData.password}
              />
            </div>
            <button
              type="submit"
              className="w-full border-black shadowbox block py-2 mb-4 self-center transition-all px-4 text-center bg-blue-500 text-white font-bold hover:bg-blue-600"
            >
              Login
            </button>
            
            <p className="text-center mt-2">{error}</p>
            <p className=' text-center '>Dont Have An Account? <Link className=' text-blue-600 underline' to={'/createaccount'}>Make One! </Link></p>
          </form>
          <div className='flex justify-center'>
            <img className='h-8 mt-4 origin-center' src={mailIcon}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateAccount;
