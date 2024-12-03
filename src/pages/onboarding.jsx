import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";

const OnboardingPage = () => {
  const { user, isLoaded } = useUser();
  // console.log(user);
  if (!isLoaded) {
    return <BarLoader height={6} width={"100%"} color="#3d81ff" />;
  }

  return (
    <div className="pt-28 min-h-screen flex flex-col items-center">
      <h1 className="font-extrabold text-7xl sm:text-8xl pt-20">I am a...</h1>
      <div className="grid grid-cols-2 mt-16 gap-4 w-full  px-10 md:px-40">
        <Button variant="blue" className="h-20 text-2xl">
          Candidate
        </Button>
        <Button variant="destructive" className="h-20 text-2xl">
          Reqruiter
        </Button>
      </div>
    </div>
  );
};
export default OnboardingPage;
