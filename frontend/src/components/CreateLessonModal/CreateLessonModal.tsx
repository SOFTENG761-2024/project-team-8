import {
  Button,
  Divider,
  Group,
  Modal,
  Stack,
  Stepper,
  Title,
  Text,
  Flex,
  TextInput,
  Textarea,
  Select,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { act, useState } from "react";
import classes from "./CreateLessonModal.module.css";
import { IconCheck, IconCircleCheck } from "@tabler/icons-react";

const CreateLessonModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [active, setActive] = useState(1);
  const courses = ["Course 1", "Course 2"]; // TODO: render with fetched data

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size="100%"
        // maw="50rem"
        // h="100%"
        // mih="30em"
        styles={{
          content: { height: "90vh" },
          header: { height: "10%" },
          body: { height: "85%" },
        }}
        centered
      >
        <Flex h="100%">
          <Stack h="100%" align="stretch" justify="flex-start" gap="md" w="30%">
            <Title size="h1" c="primary.4">
              Create a new lesson
            </Title>
            <Stepper
              active={active}
              onStepClick={setActive}
              orientation="vertical"
              size="xl"
              iconSize={rem(60)}
              classNames={{
                root: classes.steps,
                steps: classes.steps,
                step: classes.step,
                stepIcon: classes.stepIcon,
                verticalSeparator: classes.stepSeperator,
                stepCompletedIcon: classes.stepCompletedIcon,
                stepBody: classes.stepBody,
              }}
            >
              <Stepper.Step label="Add lesson details" />
              <Stepper.Step label="Add or upload resources" />
              <Stepper.Step label="Add lesson content" />
            </Stepper>
          </Stack>
          <Group w="70%" justify="flex-start" gap="md">
            <Divider orientation="vertical" mx="lg" />
            <Stack h="100%" w="80%">
              <Stack h="100%" w="100%">
                {active === 0 && (
                  <>
                    <Group w="100%">
                      <Title size="h2" c="primary.4" w="100%">
                        Lesson details
                      </Title>
                    </Group>

                    <Divider />

                    <TextInput
                      label={
                        <Title
                          size="h5"
                          c="neutral.5"
                          tt={"uppercase"}
                          lts="0.08em"
                        >
                          lesson name
                        </Title>
                      }
                      placeholder="Insert name of this lesson here..."
                      variant="filled"
                    />
                    <Textarea
                      label={
                        <Title
                          size="h5"
                          c="neutral.5"
                          tt={"uppercase"}
                          lts="0.08em"
                        >
                          lesson overview
                        </Title>
                      }
                      variant="filled"
                      placeholder="Insert overview of lesson content here..."
                    />
                    <Select
                      label={
                        <Title
                          size="h5"
                          c="neutral.5"
                          tt={"uppercase"}
                          lts="0.08em"
                        >
                          select course for this lesson
                        </Title>
                      }
                      data={courses}
                      variant="filled"
                      maw="30rem"
                    />
                  </>
                )}
                {active === 1 && (
                  <>
                    <Group>
                      <Divider orientation="vertical" mx="lg" />
                      <Text>Page 2</Text>
                    </Group>
                  </>
                )}
                {active === 2 && (
                  <>
                    <Group>
                      <Divider orientation="vertical" mx="lg" />
                      <Text>Page 3</Text>
                    </Group>
                  </>
                )}
              </Stack>
              <Group className={classes.buttonGroup}>
                <Button
                  variant="filled"
                  onClick={prevStep}
                  disabled={active === 0}
                  className={classes.button}
                >
                  BACK
                </Button>
                <Button
                  variant="filled"
                  onClick={nextStep}
                  className={classes.button}
                >
                  {active === 2 ? "DONE" : "NEXT"}
                </Button>
              </Group>
            </Stack>
          </Group>
        </Flex>
      </Modal>
      <Button onClick={open}>Open create lesson modal</Button>
    </>
  );
};

export default CreateLessonModal;
