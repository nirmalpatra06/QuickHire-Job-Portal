import { getSingleJob, updateHiringStatus } from "@/api/apijobs";
import ApplyJobDrawer from "@/components/apply-job";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import MDEditor from "@uiw/react-md-editor";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const JobPage = () => {
  const { isLoaded, user } = useUser();
  const { id } = useParams();
  const {
    fn: fnJob,
    data: job,
    loading: loadingJob,
  } = useFetch(getSingleJob, { job_id: id });

  const handleHiringStatusChange = (value) => {
    const isOpen = value === "open";
    fnHiringStatus(isOpen).then(() => fnJob());
  };
  const { fn: fnHiringStatus, loading: loadingHiringStatus } = useFetch(
    updateHiringStatus,
    { job_id: id }
  );

  useEffect(() => {
    if (isLoaded) {
      fnJob();
    }
  }, [isLoaded]);

  return (
    <div className="pt-32 flex flex-col">
      {loadingJob && <BarLoader height={6} width={"100%"} color="#3d81ff" />}
      <h2 className="text-center text-gray-200 text-6xl sm:text-7xl font-extrabold py-4">
        Job Details
      </h2>
      <div className="flex flex-col-reverse justify-between items-center gap-6 md:flex-row px-4">
        <h2 className="font-extrabold pb-3 text-4xl sm:text-6xl">
          {job?.title}
        </h2>
        <img src={job?.company?.logo_url} alt={job?.title} className="h-12" />
      </div>
      <div className="flex justify-between px-4">
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
      </div>
      {/* Hiring Status */}
      <div className="px-4 py-2">
        {job?.recruiter_id === user?.id && (
          <Select onValueChange={handleHiringStatusChange}>
            <SelectTrigger
              className={`w-full ${
                job?.isOpen ? "bg-green-900" : "bg-red-900"
              }`}
            >
              <SelectValue
                placeholder={`Hiring status ${
                  job?.isOpen ? "(Open)" : "(Closed)"
                }`}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold px-4">About the Job</h2>
      <p className="sm:text-lg px-4">{job?.description}</p>
      <h2 className="text-2xl sm:text-3xl font-bold px-4">
        What we are looking for
      </h2>
      <MDEditor.Markdown
        source={job?.requirements}
        className="sm:text-lg bg-transparent px-4 pb-4"
      />
      {/* render applications */}
      {job?.recruiter_id !== user?.id && (
        <ApplyJobDrawer
          job={job}
          user={user}
          fetchJob={fnJob}
          applied={job?.applications?.find((ap) => ap.candidate_id === user.id)}
        />
      )}
    </div>
  );
};
export default JobPage;
