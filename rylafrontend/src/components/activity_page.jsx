import { useNavigate } from "react-router-dom";

export default function Activity({user}){
    const navigate = useNavigate()
    return(
        <div className="h-screen overflow-x-hidden overflow-y-auto xs:w-[90%] lg:w-full">

            <h2 className="capitalize font-bold text-xl text-center">Hello, {user}</h2>

            <div className="xs:mt-10 lg:mt-6 xs:grid xs:grid-cols-1 lg:grid-cols-2 lg:gap-20 mx-auto xs:w-full lg:w-[50%]">

                <div onClick={()=>navigate('/group_chat')} className="flex flex-col items-center justify-center xs:my-8 lg:my-0 xs:mx-[24%] lg:xs-0 xs:w-[60%] lg:w-full border-2 hover:border-orange-300 border-gray-300 rounded-lg shadow-md hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer h-40 hover:top-[6%]">
                <h3>Join Chat Room</h3>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-12 h-12 hover:text-orange-300">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
                
                </div>

                <div onClick={()=>navigate('/call')} className="flex flex-col items-center justify-center xs:my-8 lg:my-0 xs:mx-[24%] lg:xs-0 xs:w-[60%] lg:w-full border-2 hover:border-orange-300 border-gray-300 rounded-lg shadow-md hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer h-40 hover:top-[6%]">
                <h3>Join Call Room</h3>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-12 h-12 hover:text-orange-300">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>

                
                </div>

            </div>
        </div>
    );
}