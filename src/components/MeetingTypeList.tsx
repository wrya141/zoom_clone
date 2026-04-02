'use client'

import { useState } from "react"
import HomeCard from "./HomeCard"
import { useRouter } from "next/navigation"
import MeetingModal from "./MeetingModal"
import { useUser } from "@clerk/nextjs"
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { toast } from "sonner"
import { Textarea } from "./ui/textarea"
import ReactDatePicker from 'react-datepicker'
import { Input } from "./ui/input"
const MeetingTypeList = () => {
  const router=useRouter( )
  
  const [meetingState,setMeetingState]=useState<'isScheduleMeeting'| 'isJoiningMeeting'|'isInstantMeeting'|undefined>()
const {user}=useUser()
const client=useStreamVideoClient()
const [values,setValues]=useState({
  dateTime:new Date(),
  description:'',
  link:''
})
const [callDetails,setCallDetails]=useState<Call>()
  const createMeeting= async()=>{  
     if(!user || !client)return;
     try{
      if(!values.dateTime)
        {
          toast.warning('please select date and time')
           return;
          }
const id=crypto.randomUUID(
  
)
 const call=client.call('default',id)
 if(!call)throw new Error('faild to call')

  const startsAt=values.dateTime.toISOString() || new Date(Date.now()).toISOString()
  const description =values.description||'instant meeting'
   await call.getOrCreate({
    data:{
      starts_at:startsAt,
       custom:{
        description,
       }
    }
   })
   setCallDetails(call)
   if(!values.description){
    router.push(`/meeting/${call.id}`)
   }
   toast.success('meeting created')
     }catch {
toast.error('faild to create meeting')
     }
  }
  const meetingLink=`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      
       <HomeCard 
        classname='bg-[#FF742E]'
       img='/icons/add-meeting.svg'
       title='New Meeting'
       description='Start an instant Meeting'
       handleClick={()=>setMeetingState('isInstantMeeting')}
      
       />
         <HomeCard 
       img='/icons/schedule.svg'
       title='Schedule  Meeting'
       description='Plan your meeting'
       handleClick={()=>{setMeetingState('isScheduleMeeting')}}
          classname='bg-[#0E78F9]'
       /> 
        <HomeCard 
        classname='bg-[#830EF9]'
        img='/icons/recordings.svg'
        title='View Recordings'
        description='Check out your recodings'
       handleClick={()=>{router.push('/recordings')}}
   
       />  
       <HomeCard 
       img='/icons/join-meeting.svg' 
       title='Join Meeting'
       description='via invitation link'
       handleClick={()=>{setMeetingState('isJoiningMeeting')}}
       classname='bg-[#F9A90E]'
       />
       {!callDetails?(
<MeetingModal
       isOpen={meetingState ==="isScheduleMeeting"}
       onClose={()=>setMeetingState(undefined) }
       title='Create Meeting'
      
       handleClick={createMeeting}
       >
        <div className="flex flex-col gap-2.5 ">
          <label className="text-base text-normal leading-5.5 text-[#ECF0FF]">Add a description</label>
          <Textarea className="border-none bg-[#252A41]  focus-visible:ring-0 focus-visible:ring-offset-0" onChange={(e)=>{
            setValues({...values,description:e.target.value})
          }}/>
        </div>
        <div className="flex flex-col gap-2.5 w-full">
                    <label className="text-base text-normal leading-5.5 text-[#ECF0FF]">Select Date And Time</label>
<ReactDatePicker className="w-full rounded bg-[#252A41] p-2 focus:outline-none" dateFormat='MMMM d, yyyy h:m aa' timeCaption="Time" selected={values.dateTime} onChange={(date:Date|null)=>setValues({...values,dateTime:date !})} showTimeSelect timeFormat="HH:mm" timeIntervals={15}/>
        </div>
       </MeetingModal>
       ):(
 <MeetingModal
       isOpen={meetingState ==="isScheduleMeeting"}
       onClose={()=>setMeetingState(undefined) }
       title='Meeting Created'
       className='text-center'
      
       handleClick={()=>{
        navigator.clipboard.writeText(meetingLink)
        toast.success('Link Copied')
       }}
       image="/icons/checked.svg"
       buttonIcon="/icons/copy.svg"
       buttonText="Copy Meeting Link "
       />
       )}
       <MeetingModal
       isOpen={meetingState ==="isInstantMeeting"}
       onClose={()=>setMeetingState(undefined) }
       title='start an instant Meeting'
       className='text-center'
       buttonText='Start Meeting'
       handleClick={createMeeting}
       />
        <MeetingModal
       isOpen={meetingState ==="isJoiningMeeting"}
       onClose={()=>setMeetingState(undefined) }
       title='type the link here'
       className='text-center'
       buttonText='Join Meeting'
       handleClick={()=>router.push(values.link)}
       >
         <Input
          placeholder="Meeting link"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
          className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
       </MeetingModal>
    </section>
  )
}

export default MeetingTypeList
