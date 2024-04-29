import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from 'socket.io-client'
export default function Homepage({user,setUser}){
    const {REACT_APP_BASE_LINK} = process.env
    const data=[]


    const message_to_send = useRef('');
    const navigate = useNavigate()

    const websocket = new WebSocket('ws://'+REACT_APP_BASE_LINK+'/ws/group/user/'+user+'/')
    const send_message = ()=>{
        websocket.send(JSON.stringify({
            "message":message_to_send.current?.value,
            "username":user
        }))
        document.getElementById('send_message').value=''
    }
    
    useEffect(() => {
        if(user == '') return navigate('/')
    }, [])
    useEffect(() => {
        // web
        if(user == '') return navigate('/')
        websocket.onopen = function(e){
            console.log(e)
            console.log(e?.data)
            console.log('connected')
        }
        websocket.onmessage = function(e){
            console.log('message')
            console.log(e?.data)
            let message = JSON.parse(e?.data)
            let length_of_message = Object.keys(message)?.length
            let message_keys = Object.keys(message)
            // message": "sa", "username"
            if(length_of_message ===2 && message_keys[0]==="message"&&message_keys[1]==="username"){
                let note = document.createElement('p')
                let username;
                if(user === message['username']){
                    username='You'
                }else{
                    username = message['username']
                }
                note.innerHTML ='<b>'+username +'</b>'+'<br/>'+'<br/>'+ message['message']

                if(user === message["username"]){
                    note.style.backgroundColor='blue';
                    note.style.textAlign='left';
                    note.style.width='50%';
                    note.style.height='auto';
                    note.style.marginLeft='auto'
                    note.className='rounded-xl px-2 py-1 shadow-lg';
                }else{
                    note.style.backgroundColor='green';
                    note.style.textAlign='left';
                    note.style.width='50%';
                    note.style.height='auto';
                    note.style.marginRight='auto';
                    note.className='rounded-xl px-2 py-1 shadow-lg';
                }
                note.style.color='#fff';
                note.style.paddingTop='2%'
                note.style.paddingBottom='2%'
                note.style.marginTop='1%';
                note.style.marginBottom='1%';

                document.getElementById('messagebox').appendChild(note)

            }
            if(length_of_message ===1){
                let note = document.createElement('p')
                if(!data.includes(message['username'])){

                    data.push(message['username'])
                    if(user === message['username']){
                        note.innerHTML = 'User ' +`<b>you</b>` +' just joined.'
                    }else{
                        note.innerHTML = 'User ' +`<b>${message['username']}</b>` +' just joined.'

                    }
                    // note.style.backgroundColor='blue';
                    note.className='capitalize rounded-sm px-1 py-1 shadow-lg';
                    note.style.width='100%';
                    note.style.textAlign='center';
                    // note.style.color='#fff';
                    note.style.marginTop='1%';
                    note.style.marginBottom='1%';

                } 
  
                document.getElementById('messagebox').appendChild(note)
            }
            
            
        }
        websocket.onclose = function(e){
            console.log('close')
            console.log(e)
        }
      }, []);

    return(
        <div className="w-full overflow-x-hidden overflow-y-auto flex flex-row items-center justify-center">

            <div className=" xs:my-3 lg:my-2 xs:w-full lg:w-[50%] mx-5 border border-black rounded-lg shadow-lg xs:h-[40%] lg:h-[350px]">

            <div id='messagebox' className="xs:w-full xs:h-[400px] lg:h-[400px] overflow-auto">
            </div>

                <div className="w-full">

                <input
                ref={message_to_send}
                placeholder="Enter text"
                id="send_message"
                className="border border-black rounded-lg shadow-lg w-[80%] xs:px-2 lg:px-3 py-2" 
                />
                <button onClick={send_message} className="bg-blue-500 px-2 py-2 text-white w-[20%] font-bold shadow-lg rounded-lg">Send</button>
                </div>
            </div>

        </div>
    );
}