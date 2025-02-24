import CreatedApplications from "@/components/created-applications";
import CreatedJobs from "@/components/created-jobs";
import { useUser } from "@clerk/clerk-react";

const MyJobsPage = () => {
  const { user, isLoaded } = useUser();

  return (
    <div className="pt-28">
      <h1 className="text-center text-6xl sm:text-7xl font-extrabold py-4">
        {user?.unsafeMetadata?.role === "candidate"
          ? "My Applications"
          : "My Jobs"}
      </h1>
      {user?.unsafeMetadata?.role === "candidate" ? (
        <CreatedApplications />
      ) : (
        <CreatedJobs />
      )}
    </div>
  );
};
export default MyJobsPage;
