import { getSavedJobs } from "@/api/apijobs";
import JobCard from "@/components/job-card";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";

const SavedJobPage = () => {
  const { isLoaded } = useUser();
  const {
    loading: loadingSavedJobs,
    data: savedJobs,
    fn: fnSavedJobs,
  } = useFetch(getSavedJobs);
  // console.log(savedJobs);

  useEffect(() => {
    if (isLoaded) {
      fnSavedJobs();
    }
  }, [isLoaded]);

  return (
    <div className="pt-28">
      <h1 className="text-center text-6xl sm:text-7xl font-extrabold py-4">
        Saved Jobs
      </h1>
      {!isLoaded ||
        (loadingSavedJobs && (
          <BarLoader
            className="mb-4"
            height={6}
            width={"100%"}
            color="#3d81ff"
          />
        ))}
      {loadingSavedJobs == false && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
          {savedJobs?.length ? (
            savedJobs.map((savedjob) => {
              return (
                <JobCard
                  key={savedjob.id}
                  job={savedjob?.job}
                  savedInit={true}
                  onJobSaved={fnSavedJobs}
                />
              );
            })
          ) : (
            <h2 className="text-center">No saved jobs found</h2>
          )}
        </div>
      )}
    </div>
  );
};
export default SavedJobPage;
