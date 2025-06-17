import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, {useState } from 'react';

function CreateAccount() {
  const [error, setError] = useState('Welcome To Mailcryp✉️');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({username: "",password: "",retypePassword:"",bDay:""});
  const [passwordLength, setPasswordLength] = useState(0);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const[isVisibleRe, setIsVisibleRe] =  useState(false);
  const[isVisiblePass, setIsVisiblePass] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    if(id == 'password'){
      setPasswordLength(value.length)
      setPasswordsMatch((formData.retypePassword == value));
      setIsVisiblePass(true);
    }
    else if(id == 'retypePassword'){
      setPasswordsMatch((formData.password == value));
      setIsVisibleRe(true)
    }
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const username = formData.username;
    const password = formData.password;
    const retypePassword = formData.retypePassword;
    const bDay = formData.bDay;
    // Check if passwords match
    if (password !== retypePassword) {
      setError("Passwords do not match!");
      return;
    }
    if (passwordLength < 8) {
      setError("Password is not long enough!");
      return;
    }

    // POST form data to the server
    axios
      .post('http://127.0.0.1:3000/create', 
        {username: username,
          password: password,
          bDay: bDay
          
        },
        {headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }}
      )
      .then((response) => {
        // Optionally clear the form inputs
        console.log(response)
        navigate('/home');
      })
      .catch((error) => {
        console.error('Error creating account:', error);
        setError('Username is already Taken');
        navigate('/createAccount')
      });
  };

  return (
    <>
      <div className="el flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md strong-shadow p-8 bg-white ">
          <h2 className="text-2xl font-bold mb-6  text-center text-gray-900">Create Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Username</label>
              <div className='transition flex mb-1 mt-1 p-2 items-center scrolling-gradient-border w-full border border-gray-500 '>
                <input
                  type="text"
                  id="username"
                  className=" "
                  required
                  onChange={handleChange}
                  value={formData.username}
                />
                <p className=' ml-auto justify-end'>@Mailcryp.win</p>
              </div>
            </div>
            <div className="">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 scrolling-gradient-border w-full border border-gray-500"
                required
                onChange={handleChange}
                value={formData.password}
              />
              <div className={(isVisiblePass? "" : "invisible") + " transition flex mt-1 items-center  space-x-2"}>
                <div className={((passwordLength >= 8)? "bggreen" : "bgred") + " w-2 h-2 rounded-full" }></div>
                <p className="text-xs">Must be at least 8 characters</p>
              </div>
            </div>
            <div className="">
              <label htmlFor="retypePassword" className="block text-sm font-medium text-gray-700">Retype Password</label>
              <input
                type="password"
                id="retypePassword"
                className="mt-1 p-2 scrolling-gradient-border w-full border border-gray-500"
                required
                onChange={handleChange}
                value={formData.retypePassword}
              />
            </div>
            <div className={(isVisibleRe? "" : "invisible ") +  "transition flex mb-1 mt-1 items-center space-x-2"}>
                <div className={((passwordsMatch)? "bggreen" : "bgred") +  " w-2 h-2 rounded-full" }></div>
                <p className="text-xs">Passwords must match</p>
            </div>
            <div className="mb-4">
              <label htmlFor="retypePassword" className="block text-sm font-medium text-gray-700">Date Of Birth</label>
              <input
                type="date"
                id="bDay"
                className="mt-1 p-2 scrolling-gradient-border w-full border border-gray-500"
                required
                onChange={handleChange}
                value={formData.bDay}
                max="2025-01-24"
                min="1908-05-23"
              />
            </div>
            <button
              type="submit"
              className="w-full border-black shadowbox block py-2 mb-4 self-center transition-all px-4 text-center bg-blue-500 text-white font-bold hover:bg-blue-600"
            >
              Create Account!
            </button>
            <p className=' text-center '>Already Have An Account? <Link className=' text-blue-600 underline' to={'/'}>Login! </Link></p>
            <p className="text-center mt-2">{error}</p>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateAccount;
