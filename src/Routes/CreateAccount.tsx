import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

function CreateAccount() {
  // Use state to track form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    retypePassword: ''
  });

  const [error, setError] = useState('Welcome To MailCryp✉️'); // State to hold error messages
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update state with form values
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    // Prevent the default form submission
    console.log("signing in")
    event.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.retypePassword) {
      setError("Passwords do not match!");
      return;
    }

    // POST form data to the server
    axios
      .post('http://localhost:3000/login', formData)
      .then((response) => {
        // Optionally reset the form here
        setFormData({ email: '', password: '', retypePassword: '' });
        navigate('/');
      })
      .catch((error) => {
        console.error('Error creating account:', error);
        setError('Error creating account. Please try again.'); // Set error message for user
      });
  };

  return (
    <>
      <div className="bg-gray-600 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 border-black border-2 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Create Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email*</label>
              <input
                type="text" 
                id="email"
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:border-black"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password*</label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="retypePassword" className="block text-sm font-medium text-gray-700">Retype Password*</label>
              <input
                type="password"
                id="retypePassword"
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
                value={formData.retypePassword}
                onChange={handleChange}
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
            <p className="text-center mt-2">* required</p>
            <p className="text-center mt-2">{error}</p>
          </form>
        </div>
        
      </div>
    </>
  );
}

export default CreateAccount;
