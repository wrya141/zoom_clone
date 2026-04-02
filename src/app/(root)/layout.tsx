import { Metadata } from 'next';
import StreamClientProvider from '../../../providers/StreamClientProvider'
import { ReactNode } from "react"
export const metadata: Metadata = {
  title: "Yoom ",
  description: "Video Calling App",
  icons:{
    icon:'/icons/logo.svg'
  }
};
const RootLayout = ({ children }: { children: ReactNode }) => {
    
    return (
        <main>
            <StreamClientProvider>
                {children}
            </StreamClientProvider>
        </main>
    )
}

export default RootLayout