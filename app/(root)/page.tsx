//  using the () removes it from url path



// import { SignedIn, SignedOut, SignOutButton, SignUp, SignUpButton, UserButton } from "@clerk/nextjs";
// import Image from "next/image";
import EditorPanel from "./_components/EditorPanel";
import OutputPanel from "./_components/OutputPanel";
import Header from "./_components/header";


export default function Home() {
  return <div>
     <div className="min-h-screen">
      <div className="max-w-[1800px] mx-auto p-4">
       <Header />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <EditorPanel />
          <OutputPanel />
        </div>
      </div>
    </div>
  </div>;
}
