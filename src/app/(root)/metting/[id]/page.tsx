'use client'
import { useParams } from "next/navigation"

const Metting = () => {
    const params=useParams();
    const id=params.id
  return (
    <div>
      my psot: {id}
    </div>
  )
}

export default Metting
