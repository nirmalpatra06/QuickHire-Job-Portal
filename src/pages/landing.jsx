import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <main className="flex flex-col gap-10 sm:gap-3 py-28 sm:py-36 w-full">
      <section className="pt-14 sm:pt-0">
        <h1 className="flex flex-col gap-4 items-center justify-center">
          <span className="text-2xl  text-center sm:text-6xl lg:text-8xl font-extrabold">
            Connecting Talent with Opportunity
          </span>
          <span className="text-sm sm:text-2xl lg:text-3xl text-gray-300">
            Your Dream Job Starts Here...
          </span>
        </h1>
        <p className="text-gray-500 mt-4 text-center text-xs sm:text-xl">
          Explore thousands of job listing
          <span className="text-red-400"> or </span>find the perfect candidate
        </p>
      </section>
      <div className="flex gap-4 justify-center">
        {/* buttons */}
        <Link to="/jobs">
          <Button size="xl" variant="blue">
            Find Job
          </Button>
        </Link>
        <Link to="/postjob">
          <Button size="xl" variant="destructive">
            Post a Job
          </Button>
        </Link>
      </div>
      {/* carousel */}
      {/* banner */}
      {/* <img src="bannerImg.jpeg" alt="Banner" /> */}
      <section>{/* cards */}</section>
      {/* accordian */}
    </main>
  );
};
export default LandingPage;
