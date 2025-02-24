import { getCompanies } from "@/api/apiCompanies";
import { addNewJob } from "@/api/apijobs";
import AddCompanyDrawer from "@/components/add-company";
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
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import { State } from "country-state-city";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  location: z.string().min(1, { message: "Select Location" }),
  company_id: z.string().min(1, { message: "Select or Add a new Company" }),
  requirements: z.string().min(1, { message: "Write your requirements" }),
});
const PostJobPage = () => {
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: "",
      comapny_id: "",
      requirements: "",
    },
    resolver: zodResolver(schema),
  });
  const {
    fn: fnCompanies,
    data: companies,
    loading: loadingCompanies,
  } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
  }, [isLoaded]);

  const {
    fn: fnCreateJob,
    data: dataCreateJob,
    loading: loadingCreateJob,
    error: errorCreateJob,
  } = useFetch(addNewJob);

  useEffect(() => {
    if (dataCreateJob?.length > 0) navigate("/jobs");
  }, [loadingCreateJob]);

  const handleOnSubmit = (data) => {
    fnCreateJob({
      ...data,
      recruiter_id: user.id,
      isOpen: true,
    });
  };

  if (user?.unsafeMetadata?.role === "candidate") {
    return <Navigate to="/jobs" />;
  }

  return (
    <div className="pt-28 px-4">
      <h2 className="text-5xl  text-center sm:text-6xl lg:text-8xl font-extrabold pb-8">
        Post a Job
      </h2>
      {!isLoaded ||
        (loadingCompanies && (
          <BarLoader
            className="mb-4"
            height={6}
            width={"100%"}
            color="#3d81ff"
          />
        ))}
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="flex flex-col gap-4"
      >
        <Input
          type="text"
          placeholder="Job Title"
          className=" h-full md:text-lg"
          {...register("title")}
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        <Textarea placeholder="Job Description" {...register("description")} />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}

        <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-4">
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
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
            )}
          />

          <Controller
            name="company_id"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Companies">
                    {field.value
                      ? companies?.find((com) => com.id === Number(field.value))
                          ?.name
                      : "Company"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies !== undefined &&
                      companies?.map(({ name, id }) => {
                        return (
                          <SelectItem key={name} value={id}>
                            {name}
                          </SelectItem>
                        );
                      })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <AddCompanyDrawer fetchCompanies={fnCompanies} />
        </div>
        {errors.location && (
          <p className="text-red-500">{errors.location.message}</p>
        )}
        {errors.comapny_id && (
          <p className="text-red-500">{errors.comapny_id.message}</p>
        )}
        <Controller
          name="requirements"
          control={control}
          render={({ field }) => (
            <MDEditor value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.requirements && (
          <p className="text-red-500">{errors.requirements.message}</p>
        )}

        {errorCreateJob?.message && (
          <p className="text-red-500">{errorCreateJob?.message}</p>
        )}
        {loadingCreateJob && (
          <BarLoader
            className="mb-4"
            height={6}
            width={"100%"}
            color="#3d81ff"
          />
        )}
        <Button type="submit" variant="blue" className="mt-2" size="lg">
          Submit
        </Button>
      </form>
    </div>
  );
};
export default PostJobPage;
