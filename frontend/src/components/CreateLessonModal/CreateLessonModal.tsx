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
  Table,
  ActionIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import classes from "./CreateLessonModal.module.css";
import { useForm } from "@mantine/form";
import { IconPlus, IconUpload } from "@tabler/icons-react";

const FormLabel = ({ text }) => (
  <Title size="h4" c="neutral.5">
    {text}
  </Title>
);

const CreateLessonModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [active, setActive] = useState(0);
  const courses = ["Course 1", "Course 2"]; // TODO: render with fetched data

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      lessonName: "",
      lessonOverview: "",
      course: "",
    },
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    console.log("TODO: on submit logic", form.getValues());

    e.preventDefault();
  };

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
        styles={{
          content: { height: "90vh", maxWidth: "1200px" },
          header: { height: "10%" },
          body: { height: "85%", padding: "1rem 3rem" },
        }}
        radius="lg"
        centered
      >
        <Flex h="100%" gap="xl">
          <Stack h="100%" align="stretch" justify="flex-start" gap="md" w="25%">
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
                verticalSeparator: classes.stepSeperator,
                stepCompletedIcon: classes.stepCompletedIcon,
                stepBody: classes.stepBody,
              }}
            >
              <Stepper.Step
                label="Add lesson details"
                classNames={{
                  stepIcon: classes.stepActiveIcon,
                }}
              />
              <Stepper.Step
                label="Add lesson content"
                classNames={{
                  stepIcon:
                    active < 1 ? classes.stepIcon : classes.stepActiveIcon,
                }}
              />
              <Stepper.Step
                label="Preview lesson"
                classNames={{
                  stepIcon:
                    active < 2 ? classes.stepIcon : classes.stepActiveIcon,
                }}
              />
            </Stepper>
          </Stack>
          <Group w="75%" justify="space-around" gap="md">
            <Divider orientation="vertical" mx="lg" />

            <form
              onSubmit={handleSubmit}
              style={{ height: "100%", width: "85%" }}
            >
              <Stack h="100%" w="100%">
                <Stack h="100%" w="100%" gap="xl">
                  {/* step 1 */}
                  {active === 0 && (
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
                        data={courses}
                        variant="filled"
                        maw="30rem"
                        {...form.getInputProps("course")}
                      />
                    </>
                  )}
                  {/* step 2 */}
                  {active === 1 && (
                    <>
                      <Group w="100%">
                        <Title size="h2" c="primary.4" w="100%">
                          Create and add lesson content
                        </Title>
                      </Group>

                      <Divider />
                      <Stack h="75%">
                        <Stack align="flex-start" gap="xs">
                          <Text tt="uppercase" lts="0.08em">
                            Content
                          </Text>
                          <Group w="100%" justify="space-between">
                            <Select
                              variant="filled"
                              maw="30rem"
                              w="60%"
                              data={["Activity 1", "Activity 2"]}
                              placeholder="Select activity to edit"
                            />
                            <Button
                              variant="outline"
                              className={classes.addContentButton}
                            >
                              ADD NEW CONTENT
                            </Button>
                          </Group>
                        </Stack>
                        <Stack className={classes.container}>
                          <TextInput
                            label={<FormLabel text="Title" />}
                            placeholder="Insert title of this activity here..."
                            classNames={{ input: classes.whiteInput }}
                          />
                          <Textarea
                            label={<FormLabel text="Description" />}
                            placeholder="Insert text about what this activity entails here..."
                            autosize
                            minRows={3}
                            maxRows={6}
                            classNames={{ input: classes.whiteInput }}
                          />
                          <FormLabel text="Resource upload" />
                          {/* <div className={classes.uploadContainer}> */}
                          <Button
                            variant="white"
                            fullWidth
                            rightSection={
                              <IconUpload className={classes.icon} />
                            }
                          >
                            Upload new file
                          </Button>
                          {/* </div> */}
                        </Stack>
                        <Group className={classes.buttonContainer}>
                          <Button
                            variant="outline"
                            className={`${classes.formButton} ${classes.saveButton}`}
                            c="accentGreen.5"
                          >
                            SAVE CHANGES
                          </Button>
                          <Button
                            variant="outline"
                            className={`${classes.formButton} ${classes.deleteButton}`}
                          >
                            DELETE ACTIVITY
                          </Button>
                        </Group>
                      </Stack>
                    </>
                  )}
                  {/* step 3 */}
                  {active === 2 && (
                    <>
                      <Group w="100%">
                        <Title size="h2" c="primary.4" w="100%">
                          Confirm lesson
                        </Title>
                      </Group>

                      <Divider />
                    </>
                  )}
                </Stack>
                {/* navigation buttons */}
                <Group className={classes.buttonGroup}>
                  <Button
                    variant="filled"
                    onClick={prevStep}
                    disabled={active === 0}
                    className={classes.button}
                  >
                    BACK
                  </Button>
                  {active < 2 ? (
                    <Button
                      variant="filled"
                      onClick={nextStep}
                      className={classes.button}
                    >
                      NEXT
                    </Button>
                  ) : (
                    <Button
                      variant="filled"
                      type="submit"
                      className={classes.button}
                    >
                      DONE
                    </Button>
                  )}
                </Group>
              </Stack>
            </form>
          </Group>
        </Flex>
      </Modal>
      {/* modal trigger (TODO as not sure how it looks yet) */}
      <Button onClick={open}>Open create lesson modal</Button>
    </>
  );
};

export default CreateLessonModal;
