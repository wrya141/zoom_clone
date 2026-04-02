'use client'
import MeetingSetUp from "@/components/MeetingSetUp"
import MeetingRoom from "@/components/MeetingRoom"
import { useUser } from "@clerk/nextjs"
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk"
import { useParams } from "next/navigation"
import { useState } from "react"
import { useGetCallById } from "../../../../../hooks/useGetCallById"
import Loader from "@/components/Loader"

const Meeting = () => {
   const params=useParams()
    const id=params.id as string
    const {user,isLoaded }=useUser()
    const [isSetUpComplet,setIsSetUpComplet]=useState(false);
    const {call,isCallLoading}=useGetCallById(id)
    if(!isLoaded || isCallLoading)return <Loader/>
  return (
   <main className="h-screen w-full">
<StreamCall call={call}>
<StreamTheme>
{!isSetUpComplet?(
  <MeetingSetUp setIsSetUpComplet={setIsSetUpComplet}/> 
): (
<MeetingRoom/>
)}
</StreamTheme>
</StreamCall>

   </main>
  )
}

export default Meeting
