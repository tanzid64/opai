import { onCreateWorkspace } from "@/actions/workspace";
import { workspaceSchema } from "@/components/forms/workspace-form/schema";
import { useMutationData } from "./use-mutation-data";
import { useZodForm } from "./use-zod-form";

export const useCreateWorkspace = () => {
  const { mutate, isPending } = useMutationData(
    ["create-workspace"],
    (data: { name: string }) => onCreateWorkspace(data.name),
    "user-workspaces",
  );

  const { errors, onFormSubmit, register } = useZodForm(
    workspaceSchema,
    mutate,
  );
  return {
    errors,
    onFormSubmit,
    register,
    isPending,
  };
};
