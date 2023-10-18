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
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { useState } from "react";

// interface IssueForm {
//   title: string;
//   description: string;
// }

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssue = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        try {
          setIsSubmitting(true);
          await axios.post("/api/issues", data);
          router.push("/issues");
        } catch (error) {
          setIsSubmitting(false);
        } finally {
          setIsSubmitting(false);
        }
      })}
    >
      <TextField.Root>
        <TextField.Input placeholder="Title" {...register("title")} />
      </TextField.Root>
      <ErrorMessage>{errors.title?.message}</ErrorMessage>
      <Controller
        control={control}
        name="description"
        render={({ field }) => (
          <SimpleMDE placeholder="Reply to comment…" {...field} />
        )}
      />
      <ErrorMessage>{errors.description?.message}</ErrorMessage>
      <Button type="submit" className=" cursor-pointer" disabled={isSubmitting}>
        Submit New Issue {isSubmitting && <Spinner />}
      </Button>
    </form>
  );
};

export default NewIssue;
