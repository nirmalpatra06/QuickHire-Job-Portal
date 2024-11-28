import { getJobs } from "@/api/apijobs";
import useFetch from "@/hooks/use-fetch";
import { useEffect } from "react";

const JobListingPage = () => {
  const {
    fn: fnJobs,
    data: dataJobs,
    loading: loadingJobs,
  } = useFetch(getJobs, {});

  // console.log(dataJobs);

  useEffect(() => {
    fnJobs();
  }, []);
  return <div className="pt-28">Joblisting</div>;
};
export default JobListingPage;
