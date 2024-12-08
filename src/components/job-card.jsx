import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import useFetch from "@/hooks/use-fetch";
import { saveJob } from "@/api/apijobs";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

const JobCard = ({
  job,
  isMyJob = false,
  savedInit = false,
  onJobSaved = () => {},
}) => {
  const [saved, setSaved] = useState(savedInit);
  const {
    fn: fnSavedJob,
    data: savedJob,
    loading: loadingSavedJob,
  } = useFetch(saveJob, { alreadySaved: saved });

  const { user } = useUser();
  const handleSaveJob = async () => {
    await fnSavedJob({
      user_id: user.id,
      job_id: job.id,
    });
    onJobSaved();
  };

  useEffect(() => {
    if (savedJob !== undefined) setSaved(savedJob?.length > 0);
  }, [savedJob]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          {job.title}
          {!isMyJob && <Trash2Icon size={20} className="cursor-pointer" />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          {job.company && (
            <img
              alt="comapany_logo"
              src={job.company.logo_url}
              className="h-6"
            />
          )}
          <div className="flex items-center gap-1">
            <MapPinIcon size={15} />
            <p>{job.location}</p>
          </div>
        </div>
        {job.description.substring(0, job.description.indexOf("."))}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link to={`/jobs/${job.id}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            More Details
          </Button>
        </Link>
        {!isMyJob && (
          <Button
            variant="outline"
            disabled={loadingSavedJob}
            onClick={handleSaveJob}
            className="w-14"
          >
            {saved ? (
              <Heart size={25} stroke="red" fill="red" />
            ) : (
              <Heart size={25} />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
