import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { PenBox } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [showSignIn, setshowSignIn] = useState(false);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setshowSignIn(false);
    }
  };
  return (
    <>
      <nav className="flex fixed w-full justify-between items-center px-4 py-4 bg-gray-900">
        <Link>
          <img className="h-16" src="/mylogo.png" alt="Logo" />
        </Link>

        <div className="flex gap-8">
          <SignedOut>
            {/* <SignInButton></SignInButton> */}
            <Button variant="secondary" onClick={() => setshowSignIn(true)}>
              LogIn
            </Button>
          </SignedOut>
          <SignedIn>
            {/* if reqruiter */}
            <Link to="/postjob">
              <Button variant="destructive" className="rounded-full">
                <PenBox size={20} />
                Post a Job
              </Button>
            </Link>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
      {showSignIn && (
        <div
          className="flex items-center justify-center fixed inset-0 bg-black bg-opacity-80"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            signUpFallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};
export default Header;
