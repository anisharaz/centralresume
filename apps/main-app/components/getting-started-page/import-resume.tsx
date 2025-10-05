import { RESUME_SCHEMA_TYPE } from "@centralresume/resume-core/schema";
import { UseFormReturn } from "react-hook-form";

function ImportExistingResume({
  form,
}: {
  form: UseFormReturn<RESUME_SCHEMA_TYPE>;
}) {
  const { setValue, getValues, formState } = form;
  return <div>Page to import resume , leave it empty for now</div>;
}

export default ImportExistingResume;
