'use client'
import { useEffect, useRef, useState } from "react";
import {
  
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import { tokenProvider } from "../actions/strea.actions";
import Loader from "@/components/Loader";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;



 const StreamClientProvider = ( {children }: { children: React.ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient | undefined>();
      const clientRef = useRef<StreamVideoClient | null>(null);
  const {user,isLoaded}=useUser();
useEffect(()=>{
if(!user|| !isLoaded)return;
if(!apiKey) throw new Error('stream api key missing')
   if (clientRef.current) return; 
    const client= StreamVideoClient.getOrCreateInstance({
        apiKey,
        user:{
            id:user.id,
            name:user.username||user.id,
            image:user?.imageUrl
        },
        tokenProvider:tokenProvider,
    })
    clientRef.current = client;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVideoClient(client)
    
     return () => {
            client.disconnectUser();
            clientRef.current = null;
            setVideoClient(undefined);
        };
},[user,isLoaded])
if(!videoClient) return <Loader/>
return(
<StreamVideo client={videoClient}>
{children}
</StreamVideo>
)


};

 

export default StreamClientProvider