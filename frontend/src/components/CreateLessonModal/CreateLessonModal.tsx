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
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import classes from "./CreateLessonModal.module.css";
import { useForm } from "@mantine/form";

const FormLabel = ({ text }) => (
  <Title size="h5" c="neutral.5" tt={"uppercase"} lts="0.08em">
    {text}
  </Title>
);

const resourceList = [
  {
    name: 1,
    type: "PDF",
    size: 1,
  },
  {
    name: 2,
    type: "PDF",
    size: 2,
  },
];

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

  const rows = resourceList.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td align={"center"}>{element.type}</Table.Td>
      <Table.Td align={"center"}>{element.size}</Table.Td>
      <Table.Td align={"center"}>{element.size}</Table.Td>
    </Table.Tr>
  ));

  const ths = (
    <Table.Tr>
      <Table.Th ta={"left"} className={classes.tableHeader}>
        FILE NAME
      </Table.Th>
      <Table.Th className={classes.tableHeader}>TYPE</Table.Th>
      <Table.Th className={classes.tableHeader}>SIZE</Table.Th>
    </Table.Tr>
  );

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size="90%"
        styles={{
          content: { height: "90vh", maxWidth: "1200px" },
          header: { height: "10%" },
          body: { height: "85%", padding: "1rem 4rem" },
        }}
        centered
      >
        <Flex h="100%" gap="xl">
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
                label="Add or upload resources"
                classNames={{
                  stepIcon:
                    active < 1 ? classes.stepIcon : classes.stepActiveIcon,
                }}
              />
              <Stepper.Step
                label="Add lesson content"
                classNames={{
                  stepIcon:
                    active < 2 ? classes.stepIcon : classes.stepActiveIcon,
                }}
              />
            </Stepper>
          </Stack>
          <Group w="70%" justify="flex-start" gap="md">
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
                        label={<FormLabel text="Lesson Name" />}
                        placeholder="Insert name of this lesson here..."
                        variant="filled"
                        {...form.getInputProps("lessonName")}
                      />
                      <Textarea
                        label={<FormLabel text="Lesson Overview" />}
                        variant="filled"
                        placeholder="Insert overview of lesson content here..."
                        {...form.getInputProps("lessonOverview")}
                        autosize
                        minRows={4}
                        maxRows={6}
                      />
                      <Select
                        label={
                          <FormLabel text="select course for this lesson" />
                        }
                        data={courses}
                        variant="filled"
                        maw="30rem"
                        {...form.getInputProps("course")}
                      />
                    </>
                  )}
                  {/* step 2 (TODO) */}
                  {active === 1 && (
                    <>
                      <Group w="100%">
                        <Title size="h2" c="primary.4" w="100%">
                          Resoure List
                        </Title>
                      </Group>

                      <Divider />
                      <Stack className={classes.tableContainer}>
                        <Table
                          className={classes.table}
                          horizontalSpacing="xl"
                          highlightOnHover
                          highlightOnHoverColor="neutral.3"
                          striped
                          stripedColor="neutral.2"
                        >
                          <Table.Thead>{ths}</Table.Thead>
                          <Table.Tbody>{rows}</Table.Tbody>
                        </Table>
                      </Stack>
                    </>
                  )}
                  {/* step 3 (TODO) */}
                  {active === 2 && (
                    <>
                      <Group>
                        <Divider orientation="vertical" mx="lg" />
                        <Text>Page 3</Text>
                      </Group>
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
