"use client";
import { useUser, UserButton } from "@clerk/nextjs";
import LoginButton from "@/components/LoginButton";
// import LoginButton from "@/components/LoginButton";
// import { SignedOut, UserButton } from "@clerk/nextjs";
import { User } from "lucide-react";

function HeaderProfileBtn() {
  const { isSignedIn } = useUser();
  return (
    <>
      <UserButton>
        <UserButton.MenuItems>
          <UserButton.Link
            label="Profile"
            labelIcon={<User className="size-4" />}
            href="/profile"
          />
        </UserButton.MenuItems>
      </UserButton>

      {!isSignedIn ? <LoginButton /> : <UserButton />}
    </>
  );
}
export default HeaderProfileBtn;