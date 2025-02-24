import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import JobCard from "./job-card";
import { useEffect } from "react";
import { getMyJobs } from "@/api/apijobs";

const CreatedJobs = () => {
  const { user, isLoaded } = useUser();

  const {
    loading: loadingCreatedJobs,
    data: createdJobs,
    fn: fnCreatedJobs,
  } = useFetch(getMyJobs, { recruiter_id: user?.id });

  useEffect(() => {
    if (user && isLoaded) fnCreatedJobs();
  }, [isLoaded]);

  return (
    <div>
      {loadingCreatedJobs ? (
        <BarLoader height={5} width={"100%"} color="#3d81ff" className="mt-2" />
      ) : (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {createdJobs?.length ? (
            createdJobs.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  onJobSaved={fnCreatedJobs}
                  isMyJob={true}
                />
              );
            })
          ) : (
            <div>No Jobs Found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreatedJobs;
