import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignIn,
  // SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {
  const [showSignIn, setshowSignIn] = useState(false);
  const { user } = useUser();

  const [search, setSearch] = useSearchParams();
  useEffect(() => {
    if (search.get("sign-in")) {
      setshowSignIn(true);
    }
  }, [search]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setshowSignIn(false);
      setSearch({});
    }
  };
  return (
    <>
      <nav className="flex fixed w-full  justify-between items-center px-4 py-3 bg-gray-900 z-10">
        <Link>
          <img className="h-16 sm:h-20" src="/mylogo.png" alt="Logo" />
        </Link>

        <div className="flex gap-8">
          <SignedOut>
            {/* <SignInButton></SignInButton> */}
            <Button
              className="font-bold"
              variant="secondary"
              onClick={() => setshowSignIn(true)}
            >
              Login
            </Button>
          </SignedOut>
          <SignedIn>
            {/* if reqruiter */}
            {user?.unsafeMetadata?.role === "reqruiter" && (
              <Link to="/postjob">
                <Button variant="destructive" className="rounded-full">
                  <PenBox size={20} />
                  Post a Job
                </Button>
              </Link>
            )}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/myjobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/savedjobs"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>
      {showSignIn && (
        <div
          className="flex items-center justify-center fixed inset-0 bg-black bg-opacity-80 z-20"
          onClick={handleOverlayClick}
        >
          <SignIn forceRedirectUrl="/onboarding" />
        </div>
      )}
    </>
  );
};
export default Header;
