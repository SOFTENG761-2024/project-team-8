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
  useMantineTheme,
  Tooltip,
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
import { useState } from "react";
import { Lesson } from "../../interfaces/kit";

interface LessonOverlayProps extends ModalProps {
  courseTitle: string;
  moduleTitle: string;
  currentLessonIndex: number; // The index of the current lesson
  moduleLessons: Lesson[]; // The full list of lessons in the module
  opened: boolean;
  onClose: () => void;
}

const LessonOverlay = ({
  courseTitle,
  moduleTitle,
  currentLessonIndex: initialLessonIndex,
  moduleLessons,
  opened,
  onClose,
}: LessonOverlayProps) => {
  const biggerViewport = useMediaQuery("(min-width: 70rem)");
  const theme = useMantineTheme();

  // tracking the current lesson index locally within the overlay
  const [lessonIndex, setLessonIndex] = useState(initialLessonIndex);

  const currentLesson = moduleLessons[lessonIndex];  // getting the current lesson

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
            icon={
              <IconX
                style={{
                  width: rem(16),
                  height: rem(16),
                  color: theme.colors.accentRed[4],
                }}
              />
            }
            color="accentRed.1"
            variant="filled"
            checked
            classNames={{ root: styles.exitChip }}
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

            {/* PREVIOUS button group */}
            <Flex w="100%" py="0.5rem">
              {lessonIndex === 0 ?
                <Tooltip label="No Previous Lesson" transitionProps={{ transition: 'pop', duration: 300 }} position="bottom">
                  <UnstyledButton
                    disabled={lessonIndex === 0} // Disable if on first lesson
                    className={styles.lessonNavButtonPrev}
                    onClick={() => setLessonIndex(lessonIndex - 1)}
                  >
                    <IconCircleArrowLeftFilled size="1.55rem" />
                    {lessonIndex === 0 ? "Start of module" : "Previous lesson"}
                  </UnstyledButton>
                </Tooltip>
                :
                <UnstyledButton
                  disabled={lessonIndex === 0} // Disable if on first lesson
                  className={styles.lessonNavButtonPrev}
                  onClick={() => setLessonIndex(lessonIndex - 1)}
                >
                  <IconCircleArrowLeftFilled size="1.55rem" />
                  {lessonIndex === 0 ? "Start of module" : "Previous lesson"}
                </UnstyledButton>}

              {/* NEXT button group */}
              {lessonIndex === moduleLessons.length - 1 ?
                <Tooltip label="Complete the module" transitionProps={{ transition: 'pop', duration: 300 }} position="bottom">
                  <UnstyledButton
                    // disabled={lessonIndex === moduleLessons.length - 1} // could disable if last lesson?
                    className={styles.lessonNavButtonNext}
                    onClick={lessonIndex === moduleLessons.length - 1 ? onClose : () => setLessonIndex(lessonIndex + 1)}
                  >
                    {lessonIndex === moduleLessons.length - 1 ? "Finish Module" : "Next lesson"}
                    <IconCircleArrowRightFilled size="1.55rem" />
                  </UnstyledButton>
                </Tooltip>
                :
                <UnstyledButton
                  // disabled={lessonIndex === moduleLessons.length - 1} // could disable if last lesson?
                  className={styles.lessonNavButtonNext}
                  onClick={lessonIndex === moduleLessons.length - 1 ? onClose : () => setLessonIndex(lessonIndex + 1)}
                >
                  {lessonIndex === moduleLessons.length - 1 ? "Finish Module" : "Next lesson"}
                  <IconCircleArrowRightFilled size="1.55rem" />
                </UnstyledButton>}
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
            {currentLesson.title}
          </Title>
          <Image
            radius="md"
            src={"https://placehold.co/600x400?text=Lesson_Image"}
            w="auto"
          />
          <Text py="1rem" ta="justify">
            {" "}
            {currentLesson.overview || "No overview available"}
          </Text>
          {currentLesson.content.map(
            ({ title, description, printout }, index) => (
              <LessonContentSection
                key={index}
                title={title}
                description={description}
                fileUrl={printout.url()}
              />
            )
          )}
        </Stack>
      </Flex>
    </Modal>
  );
};

export default LessonOverlay;
