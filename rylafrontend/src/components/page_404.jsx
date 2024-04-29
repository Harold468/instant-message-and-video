import { motion } from "framer-motion";
import { easeInOut } from "framer-motion/dom";
import { useNavigate } from "react-router-dom";

const Page_404=()=>{
    
    const navigate = useNavigate()
    const settingsVariant={
        initial:{
            rotate:[0,360],
            opacity:0
        },
        animate:{
            rotate:[360,0],
            opacity:1,
            transition:{
                rotate:{
                    repeat: Infinity,
                    duration:4,
                    repeatType:'reverse'
                },
            }
        },
 
    }


    return(
        <div className="h-screen flex flex-col justify-center items-center overflow-x-hidden overflow-y-auto xs:w-[90%] lg:w-full">

<h2 className="capitalize font-bold text-3xl text-red-500 text-center">Page Not Found</h2>


<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-24 h-24">
  <motion.path variants={settingsVariant} initial='initial' animate='animate' transition='transition'
  stroke-linecap="round" stroke-linejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
</svg>

        <button className="cursor-pointer hover:bg-blue-950 transition-all duration-300 ease-in-out my-3 px-4 py-2 rounded-lg shadow-md bg-orange-500 text-white font-bold text-xl" onClick={()=>navigate('/')}>
            Click Here
        </button>



        </div>
    );
}
export default Page_404