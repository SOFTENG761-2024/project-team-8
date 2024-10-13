import {
  Modal,
  ModalProps,
  Chip,
  rem,
  Stack,
  Title,
  Text,
  UnstyledButton,
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
  IconCircleCheckFilled,
} from "@tabler/icons-react";
import styles from "./LessonOverlay.module.css";
import { useMediaQuery } from "@mantine/hooks";
import LessonContentSection from "./LessonContentSection";
import { useContext, useState } from "react";
import { Lesson } from "../../interfaces/kit";
import { FullscreenContext } from "../../context/FullscreenContextProvider";

interface LessonOverlayProps extends ModalProps {
  courseTitle: string;
  moduleTitle: string;
  currentLessonIndex: number; // The index of the current lesson
  moduleLessons: Lesson[]; // The full list of lessons in the module
  opened: boolean;
  onClose: () => void;
}

/**
 * @component
 * LessonOverlay
 *
 * This component is for the lesson overlay section of the course page,
 * displaying the lesson content
 * 
 * @param {string} courseTitle - The title of the course
 * @param {string} moduleTitle - The title of the module
 * @param {number} currentLessonIndex - The index of the current lesson
 * @param {Lesson[]} moduleLessons - The full list of lessons in the module
 * @param {boolean} opened - True if the overlay is open, false otherwise
 * @param {function} onClose - Function to close the overlay
 * @returns {JSX.Element}
 */
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
  const currentLesson = moduleLessons[lessonIndex]; // getting the current lesson

  const { isAnyPdfFullscreen, setLessonChanged } =
    useContext(FullscreenContext);
  const finalLessonInModule = lessonIndex === moduleLessons.length - 1;
  const firstLessonInModule = lessonIndex === 0;

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
      closeOnEscape={!isAnyPdfFullscreen}
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
              <Tooltip
                label="No Previous Lesson"
                transitionProps={{ transition: "pop", duration: 300 }}
                position="bottom"
                disabled={!firstLessonInModule} // display when on first lesson
              >
                <UnstyledButton
                  disabled={firstLessonInModule} // Disable if on first lesson
                  className={styles.lessonNavButtonPrev}
                  onClick={() => {
                    setLessonIndex(lessonIndex - 1);
                    setLessonChanged(true);
                  }}
                >
                  <IconCircleArrowLeftFilled size="1.55rem" />
                  {firstLessonInModule ? "Start of module" : "Previous lesson"}
                </UnstyledButton>
              </Tooltip>

              {/* NEXT button group */}
              <Tooltip
                label="Complete the module"
                transitionProps={{ transition: "pop", duration: 300 }}
                position="bottom"
                disabled={!finalLessonInModule} // display only when on last lesson of module
              >
                <UnstyledButton
                  className={styles.lessonNavButtonNext}
                  onClick={
                    finalLessonInModule
                      ? onClose
                      : () => {
                        setLessonIndex(lessonIndex + 1);
                        setLessonChanged(true);
                      }
                  }
                >
                  {finalLessonInModule ? "Finish Module" : "Next lesson"}
                  {finalLessonInModule ? (
                    <IconCircleCheckFilled size="1.55rem" />
                  ) : (
                    <IconCircleArrowRightFilled size="1.55rem" />
                  )}
                </UnstyledButton>
              </Tooltip>
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

          <Text py="1rem" ta="justify">
            {currentLesson.overview || "No overview available"}
          </Text>
          {currentLesson.content.map(
            ({ title, description, printout }, index) => (
              <LessonContentSection
                key={index}
                title={title}
                description={description}
                fileUrl={printout && printout.url()}
              />
            )
          )}
        </Stack>
      </Flex>
    </Modal>
  );
};

export default LessonOverlay;
