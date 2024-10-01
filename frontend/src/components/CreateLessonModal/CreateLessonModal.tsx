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
  Anchor,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { act, useState } from "react";
import classes from "./CreateLessonModal.module.css";
import { useForm } from "@mantine/form";
import { Content, Module } from "../../interfaces/kit";
import {
  IconCheck,
  IconCircleCheckFilled,
  IconUpload,
} from "@tabler/icons-react";
import { FormLabel } from "./FormLabel";
import { AddContentForm } from "./AddContentForm";

const CreateLessonModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [active, setActive] = useState(0);
  const modules = ["Module 1", "Module 2"]; // TODO: render with fetched data
  const [editContent, setEditContent] = useState<Content | null>(null);
  const [contents, setContents] = useState<Content[]>([]);
  const [error, setError] = useState<string>("");

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      lessonName: "",
      lessonOverview: "",
      module: "",
      content: [],
    },
    validate: {
      lessonName: (value) =>
        value.length < 2 ? "Lesson name is required" : null,
      module: (value) => (value && value != "" ? null : "Module is required"),
    },
  });

  const handleSave = (newContent: Content) => {
    console.log(newContent);
    setContents([...contents, newContent]); // Update parent state
    // Don't close the modal here unless you want to
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    form.validate();
    console.log("TODO: on submit logic", form.getValues());
    e.preventDefault();
  };

  const nextStep = () => {
    let canProceed = true;
    if (active == 0) {
      // Validate fields for step 0
      const lessonNameError = form.validateField("lessonName").hasError;
      const moduleError = form.validateField("module").hasError;

      if (lessonNameError || moduleError) {
        canProceed = false; // Prevent proceeding if there are errors
      }
    } else if (active == 1) {
      // Validate fields for step 1
      const contentError = contents.length < 1;

      if (contentError) {
        canProceed = false; // Prevent proceeding if there's an error
      } else {
        setError("");
      }
    }

    if (canProceed) {
      setActive((current) => (current < 3 ? current + 1 : current));
    }
  };
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
              allowNextStepsSelect={false}
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
                        data={modules}
                        variant="filled"
                        maw="30rem"
                        {...form.getInputProps("module")}
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
                              data={contents.map((content) => content.title)}
                              placeholder="Select activity to edit"
                              value={editContent ? editContent.title : null} // Use the id or unique identifier for value
                              onChange={(value) => {
                                const selectedContent = contents.find(
                                  (content) => content.title === value
                                );
                                setEditContent(selectedContent || null); // Set the entire object or null if not found
                              }}
                            />
                            <Button
                              variant="outline"
                              className={classes.addContentButton}
                            >
                              ADD NEW CONTENT
                            </Button>
                          </Group>
                        </Stack>

                        <AddContentForm
                          oldContent={editContent}
                          onSave={handleSave}
                        />
                        {error && (
                          <Text size="sm" c="accentRed.3">
                            {error}
                          </Text>
                        )}
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
                      <Stack align="center">
                        <IconCircleCheckFilled
                          className={classes.confirmIcon}
                          size="6rem"
                        />
                        <Title size="h2" c="neutral.5">
                          Confirmation
                        </Title>
                        <Text c="neutral.5">
                          View preview of this lesson by clicking{" "}
                          <Anchor c="primary.5" underline="always">
                            here
                          </Anchor>
                        </Text>

                        <Title size="h5" tt="uppercase" lts="0.08em" mt="5vh">
                          Lesson summary
                        </Title>
                        <Stack w="100%" className={classes.summaryContainer}>
                          <Group justify="space-between">
                            <Text c="neutral.5">Lesson name</Text>
                            <Text c="neutral.4">
                              {form.getValues().lessonName}
                            </Text>
                          </Group>
                          <Group justify="space-between">
                            <Text c="neutral.5">Module</Text>
                            <Text c="neutral.4">{form.getValues().module}</Text>
                          </Group>
                          <Group justify="space-between">
                            <Text c="neutral.5">
                              Number of content sections
                            </Text>
                            <Text c="neutral.4">{contents.length}</Text>
                          </Group>
                        </Stack>
                      </Stack>
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
