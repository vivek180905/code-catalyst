"use client";
import { useUser, UserButton } from "@clerk/nextjs";
import LoginButton from "@/components/LoginButton";
import { User } from "lucide-react";

function HeaderProfileBtn() {
  const { isSignedIn } = useUser();
  return (
    <>
      {isSignedIn ? (
        <UserButton>
          <UserButton.MenuItems>
            <UserButton.Link
              label="Profile"
              labelIcon={<User className="size-4" />}
              href="/profile"
            />
          </UserButton.MenuItems>
        </UserButton>
      ) : (
        <LoginButton />
      )}
    </>
  );
}
export default HeaderProfileBtn;