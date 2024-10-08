import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useRef, useState } from 'react';

function CreateAccount() {
  const [error, setError] = useState('Welcome To MailCryp✉️');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({username: "",password: "",retypePassword:""});
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    console.log("change value " + value + " at name: "+ id + ": ");
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const username = formData.username;
    const password = formData.password;
    const retypePassword = formData.retypePassword;
    console.log(formData)
    // Check if passwords match
    if (password !== retypePassword && password !== "") {
      setError("Passwords do not match!");
      console.log(password + " :password" + retypePassword + " :password")
      return;
    }

    // POST form data to the server
    axios
      .post('http://127.0.0.1:3000/create', {username: username,password: password })
      .then((response) => {
        // Optionally clear the form inputs
        console.log(response)
        navigate('/home');
      })
      .catch((error) => {
        console.error('Error creating account:', error);
        setError('Error creating account: ' + error);
      });
  };

  return (
    <>
      <div className="bg-gray-600 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 border-black border-2 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Create Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:border-black"
                required
                onChange={handleChange}
                value={formData.username}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
                onChange={handleChange}
                value={formData.password}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="retypePassword" className="block text-sm font-medium text-gray-700">Retype Password</label>
              <input
                type="password"
                id="retypePassword"
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
                onChange={handleChange}
                value={formData.retypePassword}
              />
            </div>
            <button
              type="submit"
              className="w-full block mb-2 py-2 self-center transition-all px-4 text-center bg-blue-500 text-white border-white font-bold rounded-lg border-2 hover:border-black hover:bg-blue-600"
            >
              Create Account!
            </button>
            <Link
              className="w-full py-2 self-center block transition-all px-4 text-center border-2 border-white hover:border-black bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
              to={'/'}
            >
              I already have an account
            </Link>
            <p className="text-center mt-2">{error}</p>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateAccount;
