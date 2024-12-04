import { getJobs } from "@/api/apijobs";
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
        <div>
          {jobs.length ? (
            jobs.map((job) => {
              return <span key={job.id}>{job.title}</span>;
            })
          ) : (
            <h2>No jobs</h2>
          )}
        </div>
      )}

      {/* {jobs?.length ? (
        jobs.map((job) => {
          return <span key={job.id}>{job.title}</span>;
        })
      ) : (
        <div>No Jobs found</div>
      )} */}
    </div>
  );
};
export default JobListingPage;
