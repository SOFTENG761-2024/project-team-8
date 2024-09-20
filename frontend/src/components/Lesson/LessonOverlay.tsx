import {
  Modal,
  ModalProps,
  Chip,
  rem,
  Stack,
  Title,
  Center,
  Flex,
  UnstyledButton,
} from "@mantine/core";
import {
  IconCircleArrowLeftFilled,
  IconCircleArrowRightFilled,
  IconX,
} from "@tabler/icons-react";
import styles from "./LessonOverlay.module.css";

interface LessonOverlayProps extends ModalProps {
  moduleTitle: string;
  selectedLesson: string;
}

const LessonOverlay = ({
  moduleTitle,
  selectedLesson,
  opened,
  onClose,
}: LessonOverlayProps) => {
  return (
    <Modal
      classNames={{
        header: styles.centerHeader,
        close: styles.closeButton,
        body: styles.modalBody,
      }}
      opened={opened}
      onClose={onClose}
      fullScreen
      radius={0}
      closeButtonProps={{
        icon: (
          <Chip
            icon={<IconX style={{ width: rem(16), height: rem(16) }} />}
            color="accentRed.4"
            variant="filled"
            checked
          >
            Exit
          </Chip>
        ),
      }}
    >
      <Center bg="primary.5" w="100vw" p="1rem">
        <Stack w="40rem">
          <Title size="h2" fw="600" c="primary.0">
            {selectedLesson}
          </Title>
          <Title size="h3" fw="600" c="primary.1">
            {moduleTitle}
          </Title>
          <Flex justify="center" align="center" w="100%">
            <UnstyledButton className={styles.lessonNavButtonPrev}>
              <IconCircleArrowLeftFilled size="1.55rem" />
              Previous lesson
            </UnstyledButton>
            <UnstyledButton className={styles.lessonNavButtonNext}>
              Next lesson
              <IconCircleArrowRightFilled size="1.55rem" />
            </UnstyledButton>
          </Flex>
        </Stack>
      </Center>
    </Modal>
  );
};

export default LessonOverlay;
