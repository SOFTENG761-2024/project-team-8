import {
  Divider,
  Group,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { FormLabel } from "./FormLabel";
import { UseFormReturnType } from "@mantine/form";
import { FC } from "react";

interface StepOneProps {
  form: UseFormReturnType<{
    lessonName: string;
    lessonOverview: string;
    content: never[];
  }>;
  moduleTitle: string;
}
export const StepOne: FC<StepOneProps> = ({ form, moduleTitle }) => {
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
      <Stack gap="0.5rem">
        <FormLabel text="Module" />
        <Text size="md">{moduleTitle}</Text>
      </Stack>
    </>
  );
};
