import { getJobs } from "@/api/apijobs";
import JobCard from "@/components/job-card";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const JobListingPage = () => {
  const [location, setLocation] = useState("");
  const [company_id, setcompany_id] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoaded } = useUser();
  const {
    fn: fnJobs,
    data: jobs,
    loading: loadingJobs,
  } = useFetch(getJobs, { location, company_id, searchQuery });

  // console.log(jobs);

  useEffect(() => {
    if (isLoaded) {
      fnJobs();
    }
  }, [isLoaded, location, company_id, searchQuery]);

  if (!isLoaded) {
    return <BarLoader height={6} width={"100%"} color="#3d81ff" />;
  }

  return (
    <div className="pt-28">
      <h1 className="text-center text-6xl sm:text-7xl font-extrabold py-8">
        Latest Jobs
      </h1>

      {/* filters */}

      {loadingJobs && <BarLoader height={6} width={"100%"} color="#3d81ff" />}
      {loadingJobs == false && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
          {jobs.length ? (
            jobs.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  savedInit={job?.saved?.length > 0}
                />
              );
            })
          ) : (
            <h2>No jobs</h2>
          )}
        </div>
      )}
    </div>
  );
};
export default JobListingPage;
