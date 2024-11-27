import { getJobs } from "@/api/apijobs";
import { useSession } from "@clerk/clerk-react";
import { useEffect } from "react";

const JobListingPage = () => {
  const { session } = useSession();

  const fetchJobs = async () => {
    const supabaseAccessToken = await session.getToken({
      template: "supabase",
    });
    const data = await getJobs(supabaseAccessToken);
    console.log(data);
  };
  useEffect(() => {
    fetchJobs();
  }, []);

  return <div className="pt-28">Joblisting</div>;
};
export default JobListingPage;
