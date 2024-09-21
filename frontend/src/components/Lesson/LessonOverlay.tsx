import {
  Modal,
  ModalProps,
  Chip,
  rem,
  Stack,
  Title,
  Text,
  UnstyledButton,
  Image,
  Flex,
} from "@mantine/core";
import {
  IconBook2,
  IconCircleArrowLeftFilled,
  IconCircleArrowRightFilled,
  IconFile,
  IconX,
} from "@tabler/icons-react";
import styles from "./LessonOverlay.module.css";
import { useMediaQuery } from "@mantine/hooks";
import LessonContentSection from "./LessonContentSection";
import { dummyLessonOverview, dummyContentArray } from "./LessonDummyData";

interface LessonOverlayProps extends ModalProps {
  courseTitle: string;
  moduleTitle: string;
  selectedLesson: string;
}

const LessonOverlay = ({
  courseTitle,
  moduleTitle,
  selectedLesson,
  opened,
  onClose,
}: LessonOverlayProps) => {
  const biggerViewport = useMediaQuery("(min-width: 70rem)");
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
      transitionProps={{ transition: "fade", duration: 200 }}
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
      <Flex align="center" direction="column" className={styles.noXOverflow}>
        {/* OVERLAY HEADER */}
        <Stack bg="primary.5" p="1rem" w="100vw" align="center">
          <Stack w={biggerViewport ? "40%" : "80%"} gap="0.5rem">
            <Title size="h2" fw="600" c="primary.0">
              {courseTitle}
            </Title>
            <Title
              size="h3"
              fw="600"
              c="primary.1"
              className={styles.alignTextIcon}
            >
              <IconBook2 />
              {moduleTitle}
            </Title>

            {/* Previous and Next button group */}
            <Flex w="100%" py="0.5rem">
              <UnstyledButton
                className={styles.lessonNavButtonPrev}
                disabled={false}
              >
                <IconCircleArrowLeftFilled size="1.55rem" />
                Previous lesson
              </UnstyledButton>
              <UnstyledButton
                className={styles.lessonNavButtonNext}
                disabled={false}
              >
                Next lesson
                <IconCircleArrowRightFilled size="1.55rem" />
              </UnstyledButton>
            </Flex>
          </Stack>
        </Stack>

        {/* OVERLAY MAIN CONTENT */}
        <Stack w={biggerViewport ? "40%" : "75%"} gap="0.5rem" py="0.5rem">
          <Title
            size="h2"
            fw="700"
            c="primary.5"
            className={styles.alignTextIcon}
            py="1rem"
          >
            <IconFile size="2rem" />
            {selectedLesson}
          </Title>
          <Image
            radius="md"
            src={"https://placehold.co/600x400?text=Lesson_Image"}
            w="auto"
          />
          <Text py="1rem" ta="justify">
            {" "}
            {dummyLessonOverview}
          </Text>
          {dummyContentArray.map(
            ({ contentTitle, contentDescription, fileUrl }) => (
              <LessonContentSection
                title={contentTitle}
                description={contentDescription}
                fileUrl={fileUrl}
              />
            )
          )}
        </Stack>
      </Flex>
    </Modal>
  );
};

export default LessonOverlay;
