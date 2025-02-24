import { getApplications } from "@/api/apiApplications";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import ApplicationCard from "./application-card";

const CreatedApplications = () => {
  const { user } = useUser();

  const {
    loading: loadingApplications,
    fn: fnApplications,
    data: dataApplications,
  } = useFetch(getApplications, {
    user_id: user.id,
  });

  useEffect(() => {
    fnApplications();
  }, []);

  if (loadingApplications) {
    return (
      <BarLoader className="my-4" height={6} width={"100%"} color="#3d81ff" />
    );
  }
  return (
    <div className="flex flex-col gap-2 my-4">
      {dataApplications?.map((application) => {
        return (
          <ApplicationCard
            key={application.id}
            application={application}
            isCandidate={true}
          />
        );
      })}
    </div>
  );
};

export default CreatedApplications;
