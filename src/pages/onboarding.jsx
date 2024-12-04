import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const OnboardingPage = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  // console.log(user);

  const handleOnboardingRoleSelection = async (role) => {
    await user
      .update({
        unsafeMetadata: { role },
      })
      .then(() => {
        navigate(role === "reqruiter" ? "/postjob" : "/jobs");
      })
      .catch((err) => {
        console.log("Error occured in updating role", err);
      });
  };

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigate(
        user?.unsafeMetadata?.role === "reqruiter" ? "/postjob" : "/jobs"
      );
    }
  }, [user]);

  if (!isLoaded) {
    return <BarLoader height={6} width={"100%"} color="#3d81ff" />;
  }

  return (
    <div className="pt-28 min-h-screen flex flex-col items-center">
      <h1 className="font-extrabold text-7xl sm:text-8xl pt-20">I am a...</h1>
      <div className="grid grid-cols-2 mt-16 gap-4 w-full  px-10 md:px-40">
        <Button
          variant="blue"
          className="h-20 text-2xl"
          onClick={() => handleOnboardingRoleSelection("candidate")}
        >
          Candidate
        </Button>
        <Button
          variant="destructive"
          className="h-20 text-2xl"
          onClick={() => handleOnboardingRoleSelection("reqruiter")}
        >
          Reqruiter
        </Button>
      </div>
    </div>
  );
};
export default OnboardingPage;
