import { FormGenerator } from "@/components/global/form-generator";
import { Loader } from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "@/hooks/use-create-workspace";
import { FC } from "react";

interface WorkspaceFormProps {}

export const WorkspaceForm: FC<WorkspaceFormProps> = ({}) => {
  const { errors, isPending, onFormSubmit, register } = useCreateWorkspace();
  return (
    <form className="flex flex-col gap-y-3" onSubmit={onFormSubmit}>
      <FormGenerator
        name="name"
        placeholder="Workspace Name"
        register={register}
        errors={errors}
        label="Name"
        inputType="input"
        type="text"
      />
      <Button className="text-sm w-full mt-2" type="submit" disabled={isPending}>
        <Loader state={isPending}>Create Workspace</Loader>
      </Button>
    </form>
  );
};
