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
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

const CreateLessonModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [active, setActive] = useState(1);
  return (
    <>
      <Modal opened={opened} onClose={close}>
        <Flex>
          <Stack>
            <Title size="h1" c="primary.4">
              Create a new lesson
            </Title>
            <Stepper
              active={active}
              onStepClick={setActive}
              orientation="vertical"
            >
              <Stepper.Step label="Step 1" description="Add lesson details" />
              <Stepper.Step
                label="Step 2"
                description="Add or upload resources"
              />
              <Stepper.Step label="Step 3" description="Add lesson content" />
            </Stepper>
          </Stack>
          {active === 0 && (
            <Group>
              <Divider orientation="vertical" />
              <Text>Page 1</Text>
            </Group>
          )}
          {active === 1 && (
            <Group>
              <Divider orientation="vertical" />
              <Text>Page 2</Text>
            </Group>
          )}
          {active === 2 && (
            <Group>
              <Divider orientation="vertical" />
              <Text>Page 3</Text>
            </Group>
          )}
        </Flex>
      </Modal>
      <Button onClick={open}>Open create lesson modal</Button>
    </>
  );
};

export default CreateLessonModal;
