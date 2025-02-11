import { Link } from 'react-router-dom';
import mailIcon from '../assets/email.svg'
export default function Info() {
    return (
       <>
        <div className="block p-2 mb-2 min-h-screen">
            <div className=" flex items-center justify-center h-6">
                <Link className='h-6 mr-4' to={"/"}><img className='h-6' src={mailIcon}/></Link>
                <Link className='h-6 mr-4' to="/createAcount">Create Acount</Link>
                <Link className='h-6 mr-4' to="/createAcount">Login</Link>
                <Link className='h-6 mr-4' to="/createAcount">About</Link>
            </div>
            <div className=' w-[80vw] mt-2 mx-[10vw] border-black rounded-lg border-b-2 '/>
            <h1 className="">Our Mission Is to Make Mail Better</h1>
        </div>
        
       </>
    );
}
