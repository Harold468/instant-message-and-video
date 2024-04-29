import { useNavigate } from "react-router-dom";

export default function Home({ user,setUser }){
    const navigate = useNavigate()
    const process_user=()=>{
        if(user.toString().length  <1){
            return alert('Please enter a user')
        }else{
            navigate('activity')
        }
    }

    return(
        <div className="w-full flex flex-col items-center justify-center">
            <h2 className="font-bold">Enter username</h2>
            <input
            placeholder="Enter text"
            id="send_message"
            className="border border-black rounded-lg shadow-lg w-[80%] xs:px-2 lg:px-3 py-2" 
            onChange={((e)=>setUser(e.target.value))}
            />

            <button onClick={process_user} className="bg-blue-500 px-4 py-2 my-3 text-white font-bold rounded-lg shadow-lg">Proceed</button>
        </div>
    );
}