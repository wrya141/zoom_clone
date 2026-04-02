import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner"
import '@stream-io/video-react-sdk/dist/css/styles.css'
import 'react-datepicker/dist/react-datepicker.css'
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yoom ",
  description: "Video Calling App",
  icons:{
    icon:'/icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return ( 
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}  antialiased`}
    >

  
      <body className=" bg-[#161925] ">
        <ClerkProvider appearance={{
  
    options: {
       logoImageUrl: '/icons/yoom-logo.svg',  
      socialButtonsVariant: 'iconButton',   
    },
    variables: {
      colorForeground: '#fff',
      colorPrimary: '#0e78f9',
      colorBackground: '#1c1f2e',
      colorInput: '#252a41',
      colorInputForeground: '#fff',
    }
  }} >
        {/*bg-[#161925] is bg-dark-2*/ children}
     <Toaster />
         </ClerkProvider>
      </body>
     
    </html> 
   
  );
}

/*
        variables:{
          colorText:'#fff',
          colorPrimary:'#0e78f9',
          colorBackground:'#1c1f2e',
          colorInputBackground:'#252a41',
          colorInputText:'#fff'
        }
          */