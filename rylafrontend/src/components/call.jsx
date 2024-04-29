import { useEffect, useRef } from "react";

const Call_User=({user})=>{
    const localStream = useRef()
    const remoteStream = useRef()
    const peerConnection = useRef() 

    const Servers = {
        iceServers:[
            {
            urls:["stun:stun1.1.google.com:19302","stun:stun2.1.google.com:19302"]
            }
    ]
    }
    useEffect(()=>{

        if(document.readyState){

            (async()=>{
                let peer= new RTCPeerConnection(Servers)
                let remote_connection= new MediaStream()
                let ls = await navigator.mediaDevices.getUserMedia({video:true,audio:true})

                localStream.current.srcObject=ls

                
                    ls.getTracks().forEach((track)=>{
                        peer.addTrack(track,ls)
                    })
                
                    peer.ontrack=async(event)=>{
                        event.streams[0].getTracks().forEach((track)=>{
                            remote_connection.addTrack(track)
                        })
                    }

                    peer.onicecandidate=(async(event)=>{
                        if(event.candidate){
                            alert(JSON.stringify(event.candidate))
                        }
                    })
                    

                    peerConnection.current=peer
                    remoteStream.current = remote_connection
                
            })()
        }

    },[])

    const generate_offer=async()=>{

    }
    return(
        <div className="h-screen overflow-x-hidden overflow-y-auto xs:w-[90%] lg:w-full">

            <h2 className="capitalize font-bold text-xl text-center">Hello, {user}</h2>

            <div className="flex flex-row items-center justify-between w-[96%] mx-auto">

                <div className="flex flex-row items-center justify-between border border-gray-400 h-96 rounded-lg xs:w-1/2 lg:w-3/4 mx-2">

                    <video ref={localStream} className="w-1/2 h-96 mx-2 bg-black border border-gray rounded-lg overflow-hidden" autoPlay playsInline id="localStream">

                    </video>

                    <video ref={remoteStream} className="w-1/2 h-96 mx-2 bg-black border border-gray rounded-lg overflow-hidden" autoPlay playsInline id="remoteStream">

                    </video>
                </div>
                <div className="border border-gray-400 h-60 rounded-lg xs:w-1/2 lg:w-1/4 mx-2">
                    <h2 className="w-full text-center text-blue-500 font-bold text-xl">Available Users</h2>

                    <div className="overflow-y-auto w-full">

                    </div>
                </div>

            </div>
        </div>
    );
}
export default Call_User