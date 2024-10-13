import {
  Divider,
  Group,
  Select,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { FC } from "react";
import { Module } from "../../interfaces/kit";
import { FormLabel } from "./FormLabel";

interface StepOneProps {
  form: UseFormReturnType<{
    lessonName: string;
    lessonOverview: string;
    module: string;
    content: never[];
  }>;
  modules: Module[];
}

/**
 * @component
 * StepOne
 *
 * This component is for the first step of the create lesson modal,
 * offering a form to create a new lesson
 * 
 * @param {object} form - Form object containing lessonName, lessonOverview, module, and content
 * @param {Module[]} modules - Array of module objects
 * @returns {JSX.Element}
 */
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
        label={<FormLabel text="Lesson title" required />}
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
        label={<FormLabel text="Module" required />}
        data={moduleOptions}
        variant="filled"
        maw="30rem"
        {...form.getInputProps("module")}
      />
    </>
  );
};
