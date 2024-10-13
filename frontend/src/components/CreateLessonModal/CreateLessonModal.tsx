import {
  Button,
  Divider,
  Group,
  Modal,
  Stack,
  Stepper,
  Title,
  Flex,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import classes from "./CreateLessonModal.module.css";
import { useForm } from "@mantine/form";
import { Content } from "../../interfaces/kit";
import { StepOne } from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";


/**
 * @component
 * CreateLessonModal
 *
 * This component is for the create lesson modal,
 * offering a form to create a new lesson
 * 
 * @returns {JSX.Element}
 */
const CreateLessonModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [active, setActive] = useState(0);
  const modules = [
    { category: "string", title: "string", description: "string", lessons: [] },
  ]; // TODO: render with fetched data
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

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    form.validate();
    console.log("TODO: on submit logic", form.getValues(), contents);
    e.preventDefault();
  };

  const nextStep = () => {
    let canProceed = true;
    if (active == 0) {
      // Validate fields for step 1
      const lessonNameError = form.validateField("lessonName").hasError;
      const moduleError = form.validateField("module").hasError;

      if (lessonNameError || moduleError) {
        canProceed = false; // Prevent proceeding if there are errors
      }
    } else if (active == 1) {
      // Validate fields for step 2
      const contentError = contents.length < 1;

      if (contentError) {
        setError("At least one content is required");
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
              <Stack h="100%" w="100%" className={classes.contentContainer}>
                <Stack
                  h="100%"
                  w="100%"
                  gap="l"
                  style={{ flexGrow: 1, overflowY: "auto" }}
                >
                  {/* step 1 */}
                  {active === 0 && <StepOne form={form} modules={modules} />}
                  {/* step 2 */}
                  {active === 1 && (
                    <StepTwo
                      contents={contents}
                      setContents={setContents}
                      error={error}
                    />
                  )}
                  {/* step 3 */}
                  {active === 2 && (
                    <StepThree form={form} contentLength={contents.length} />
                  )}
                </Stack>
                {/* navigation buttons */}
                <Group className={classes.buttonGroup} h="auto">
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
