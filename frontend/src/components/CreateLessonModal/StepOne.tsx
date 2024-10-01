import {
  Divider,
  Group,
  Select,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { FormLabel } from "./FormLabel";
import { UseFormReturnType } from "@mantine/form";
import { FC } from "react";
import { Module } from "../../interfaces/kit";

interface StepOneProps {
  form: UseFormReturnType<{
    lessonName: string;
    lessonOverview: string;
    module: string;
    content: never[];
  }>;
  modules: Module[];
}
export const StepOne: FC<StepOneProps> = ({ form, modules }) => {
  const moduleOptions: string[] = modules.map(
    (module) => module.title // Unique identifier for the module
  );

  // TODO: module is rendered as string not object, thus should be converted back upon submission

  return (
    <>
      <Group w="100%">
        <Title size="h2" c="primary.4" w="100%">
          Lesson details
        </Title>
      </Group>

      <Divider />

      <TextInput
        label={<FormLabel text="Lesson title" />}
        placeholder="Insert name of this lesson here..."
        variant="filled"
        {...form.getInputProps("lessonName")}
        error={form.errors.lessonName}
      />
      <Textarea
        label={<FormLabel text="Lesson overview" />}
        variant="filled"
        placeholder="Insert overview of lesson content here..."
        {...form.getInputProps("lessonOverview")}
        autosize
        minRows={4}
        maxRows={6}
      />
      <Select
        label={<FormLabel text="Module" />}
        data={moduleOptions}
        variant="filled"
        maw="30rem"
        {...form.getInputProps("module")}
      />
    </>
  );
};
