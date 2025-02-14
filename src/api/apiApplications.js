import supabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function applyToJob(token, _, jobData) {
    const supabase = await supabaseClient(token);

    const random = Math.floor(Math.random() * 9000);
    const fileName = `resume-${random}-${jobData.candidate_id}`;

    const { error: stoargeError } = await supabase.storage.from("resumes").upload(fileName, jobData.candidate_id);
    if (stoargeError) {
        console.error("Error uploading Resume:", error);
        return null;
    }

    const resume = `${supabaseUrl}/storage/v1/object/public/resume//${fileName}`;


    const { data, error } = await supabase.from("applications").insert([
        {
            ...jobData, resume
        }
    ]).select();
    if (error) {
        console.error("Error Submitting application:", error);
        return null;
    }
    return data;
}