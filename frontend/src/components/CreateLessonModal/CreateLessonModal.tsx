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
      <Modal opened={opened} onClose={close} size="100%" h="100%">
        <Flex>
          <Stack h="100%" align="stretch" justify="flex-start" gap="md" w="30%">
            <Title size="h1" c="primary.4">
              Create a new lesson
            </Title>
            <Stepper
              active={active}
              onStepClick={setActive}
              orientation="vertical"
              size="xl"
            >
              <Stepper.Step label="Step 1" description="Add lesson details" />
              <Stepper.Step
                label="Step 2"
                description="Add or upload resources"
              />
              <Stepper.Step label="Step 3" description="Add lesson content" />
            </Stepper>
          </Stack>
          <Group w="70%" align="stretch" justify="flex-start" gap="md">
            <Divider orientation="vertical" mx="lg" />
            <Stack
              h="100%"
              w="80%"
              align="stretch"
              justify="flex-start"
              gap="md"
            >
              {active === 0 && (
                <>
                  <Group w="100%">
                    <Title size="h2" c="primary.4" w="100%">
                      Lesson details
                    </Title>
                  </Group>

                  <Divider />
                  <Text>Page 1</Text>
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
          </Group>
        </Flex>
      </Modal>
      <Button onClick={open}>Open create lesson modal</Button>
    </>
  );
};

export default CreateLessonModal;
