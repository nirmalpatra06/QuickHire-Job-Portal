import { getSingleJob } from "@/api/apijobs";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const JobPage = () => {
  const { isLoaded, user } = useUser();
  const { id } = useParams();
  const {
    fn: fnJobs,
    data: job,
    loading: loadingJob,
  } = useFetch(getSingleJob, { job_id: id });

  useEffect(() => {
    if (isLoaded) {
      fnJobs();
    }
  }, [isLoaded]);
  if (!isLoaded || loadingJob) {
    return <BarLoader height={6} width={"100%"} color="#3d81ff" />;
  }
  return (
    <div className="pt-32 px-4 flex flex-col">
      <div className="flex flex-col-reverse justify-between items-center gap-6 md:flex-row ">
        <h1 className="font-extrabold pb-3 text-4xl sm:text-6xl">
          {job?.title}
        </h1>
        <img src={job?.company?.logo_url} alt={job?.title} className="h-12" />
      </div>
      <div className="flex justify-between">
        <div className="flex gap-1">
          <MapPinIcon />
          {job?.location}
        </div>
        <div className="flex gap-1">
          <Briefcase />
          {job?.applications?.length} Applicants
        </div>
        <div className="flex gap-2">
          {job?.isOpen ? (
            <>
              <DoorOpen />
              Open
            </>
          ) : (
            <>
              <DoorClosed />
              Closed
            </>
          )}
        </div>
        {/* Hiring Status */}
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold">About the Job</h2>
      <p className="sm:text-lg">{job?.description}</p>
      <h2 className="text-2xl sm:text-3xl font-bold">
        What we are looking for
      </h2>
    </div>
  );
};
export default JobPage;
