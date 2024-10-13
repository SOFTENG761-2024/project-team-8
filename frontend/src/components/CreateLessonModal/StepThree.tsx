import { Anchor, Divider, Group, Stack, Text, Title } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { FC } from "react";
import classes from "./CreateLessonModal.module.css";

interface StepThreeProps {
  form: UseFormReturnType<{
    lessonName: string;
    lessonOverview: string;
    module: string;
    content: never[];
  }>;
  contentLength: number;
}
const StepThree: FC<StepThreeProps> = ({ form, contentLength }) => {
  return (
    <>
      <Group w="100%">
        <Title size="h2" c="primary.4" w="100%">
          Confirm lesson
        </Title>
      </Group>

      <Divider />
      <Stack align="center">
        <IconCircleCheckFilled className={classes.confirmIcon} size="6rem" />
        <Title size="h2" c="neutral.5">
          Confirmation
        </Title>
        <Text c="neutral.5">
          View preview of this lesson by clicking{" "}
          <Anchor c="primary.5" underline="always">
            here
          </Anchor>
        </Text>

        <Title size="h5" tt="uppercase" lts="0.08em" mt="3vh">
          Lesson summary
        </Title>
        <Stack w="100%" className={classes.summaryContainer}>
          <Group justify="space-between">
            <Text c="neutral.5">Lesson name</Text>
            <Text c="neutral.4">{form.getValues().lessonName}</Text>
          </Group>
          <Group justify="space-between">
            <Text c="neutral.5">Module</Text>
            <Text c="neutral.4">{form.getValues().module}</Text>
          </Group>
          <Group justify="space-between">
            <Text c="neutral.5">Number of content sections</Text>
            <Text c="neutral.4">{contentLength}</Text>
          </Group>
        </Stack>
      </Stack>
    </>
  );
};

export default StepThree;
