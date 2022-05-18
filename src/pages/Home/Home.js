import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import ToDo from './ToDo';

const Home = () => {
    const [user] = useAuthState(auth)
    
    return (
        <div className='h-screen bg-slate-700 flow-root'>
            {
                user && <div  className='flex items-center absolute right-10 top-10'>
                    {
                        user.photoURL ? <img src={user.photoURL} className='w-[40px] mr-2 h-[40px] rounded-full' alt="" />
                        :
                        <p className='w-[40px] h-[40px] flex justify-center items-center bg-violet-600 rounded-full mr-2 text-xl font-semibold text-white'>{user?.displayName?.slice(0,1)}</p>
                    }
                    <button onClick={()=>signOut(auth)} className=' btn-xs btn-error rounded-md'>SIGN OUT</button>
                </div>

            }
            <ToDo></ToDo>
        </div>
    );
};

export default Home;