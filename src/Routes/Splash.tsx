import { useState } from 'react'
import { Link } from 'react-router-dom'

function Splash() {

  return (
    <>
      <div className=" bg-gray-600 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 border-black border-2 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <Link className='w-full py-2 self-center transition-all px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600' to={'/Home'}>Login</Link>
        </form>
      </div>
    </div> 
    </>
  )
}

export default Splash
