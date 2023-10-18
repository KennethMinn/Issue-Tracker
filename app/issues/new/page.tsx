"use client";

import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import z from "zod";
import { createIssueSchema } from "@/app/api/issues/route";
import { zodResolver } from "@hookform/resolvers/zod";

// interface IssueForm {
//   title: string;
//   description: string;
// }

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssue = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  const router = useRouter();
  return (
    <form
      className=" max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        axios.post("/api/issues", data);
        router.push("/issues");
      })}
    >
      <TextField.Root>
        <TextField.Input placeholder="Title" {...register("title")} />
      </TextField.Root>
      {errors.title && <p className=" text-red-600">{errors.title.message}</p>}
      <Controller
        control={control}
        name="description"
        render={({ field }) => (
          <SimpleMDE placeholder="Reply to comment…" {...field} />
        )}
      />
      {errors.description && (
        <p className=" text-red-600">{errors.description.message}</p>
      )}
      <Button type="submit" className="">
        Submit New Issue
      </Button>
    </form>
  );
};

export default NewIssue;
