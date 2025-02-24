import { getCompanies } from "@/api/apiCompanies";
import { getJobs } from "@/api/apijobs";
import JobCard from "@/components/job-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { State } from "country-state-city";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const JobListingPage = () => {
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoaded } = useUser();
  const {
    fn: fnJobs,
    data: jobs,
    loading: loadingJobs,
  } = useFetch(getJobs, { location, company_id, searchQuery });
  // console.log(jobs);

  const { fn: fnCompanies, data: companies } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
  }, [isLoaded]);
  useEffect(() => {
    if (isLoaded) {
      fnJobs();
    }
  }, [isLoaded, location, company_id, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const query = formData.get("search-query");
    if (query) setSearchQuery(query);
  };

  if (!isLoaded) {
    return <BarLoader height={6} width={"100%"} color="#3d81ff" />;
  }
  // console.log(companies);

  const handleClear = () => {
    setLocation("");
    setSearchQuery("");
    setCompany_id("");
    setSearchQuery("");
  };

  return (
    <div className="pt-28">
      <h1 className="text-center text-6xl sm:text-7xl font-extrabold py-4">
        Latest Jobs
      </h1>

      {/* filters */}
      <form
        onSubmit={handleSearch}
        className="w-full flex gap-2 items-center h-10 sm:h-12 px-4 my-3"
      >
        <Input
          type="text"
          placeholder="Search jobs by title."
          name="search-query"
          className="h-full md:text-lg"
        />
        <Button type="submit" variant="blue" className="h-full sm:w-28">
          Search
        </Button>
      </form>

      <div className="flex flex-col sm:flex-row gap-2 px-4 mb-6">
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select by location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("IN").map((state) => {
                return (
                  <SelectItem key={state.name} value={state.name}>
                    {state.name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          value={company_id}
          onValueChange={(value) => setCompany_id(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select by Companies" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies !== undefined &&
                companies.map(({ name, id }) => {
                  return (
                    <SelectItem key={name} value={id}>
                      {name}
                    </SelectItem>
                  );
                })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          variant="destructive"
          className="sm:w-1/2"
          onClick={handleClear}
        >
          Clear filters
        </Button>
      </div>

      {loadingJobs && <BarLoader height={6} width={"100%"} color="#3d81ff" />}
      {loadingJobs == false && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
          {jobs?.length ? (
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
            <h2 className="text-center">No jobs</h2>
          )}
        </div>
      )}
    </div>
  );
};
export default JobListingPage;
