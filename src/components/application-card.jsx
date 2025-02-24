import { Boxes, BriefcaseBusinessIcon, Download, School } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import useFetch from "@/hooks/use-fetch";
import { updateApplicationStatus } from "@/api/apiApplications";
import { BarLoader } from "react-spinners";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const ApplicationCard = ({ application, isCandidate = false }) => {
  const handleDownload = () => {
    const resumeUrl = application?.resume;
    // console.log("Resume URL:", resumeUrl);
    if (resumeUrl) {
      const link = document.createElement("a");
      link.href = resumeUrl;
      link.target = "_blank";
      link.click();
      // } else {
      //   console.error("Resume URL is not defined");
      // }
    }
  };

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateApplicationStatus,
    {
      job_id: application.job_id,
    }
  );
  const handleStatusChange = (status) => {
    fnHiringStatus(status);
  };
  return (
    <Card className="mx-2">
      {loadingHiringStatus && (
        <BarLoader height={6} width={"100%"} color="#3d81ff" />
      )}
      <CardHeader>
        <CardTitle className="flex justify-between text-lg">
          {isCandidate
            ? `${application?.job?.title} at ${application?.job?.company?.name}`
            : application?.name}
          <Download
            size={12}
            onClick={handleDownload}
            className="bg-white text-black rounded-full h-8 w-8 cursor-pointer p-1"
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex gap-2 items-center">
            <BriefcaseBusinessIcon size={18} />
            {application?.experience} years of experience
          </div>
          <div className="flex gap-2 items-center">
            <School size={18} />
            {application?.education}
          </div>
          <div className="flex gap-2 items-center">
            <Boxes size={18} />
            Skills : <p className="font-bold">{application?.skills}</p>
          </div>
        </div>
        <hr />
      </CardContent>
      <CardFooter className="flex justify-between">
        <p>{new Date(application?.created_at).toLocaleString()}</p>
        {isCandidate ? (
          <span className="font-bold capitalize">
            Status: {application.status}
          </span>
        ) : (
          <Select onValueChange={handleStatusChange}>
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Application Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="interviewing">Interviewing</SelectItem>
                <SelectItem value="hired">Hired</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </CardFooter>
    </Card>
  );
};

export default ApplicationCard;
