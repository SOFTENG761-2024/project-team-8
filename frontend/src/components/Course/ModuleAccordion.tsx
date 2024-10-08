import {
  Accordion,
  Box,
  Group,
  Stack,
  Text,
  useMantineTheme,
  Tooltip,
  Button,
} from "@mantine/core";
import {
  IconBook2,
  IconSquareRoundedChevronDownFilled,
  IconFile,
  IconFilePlus,
} from "@tabler/icons-react";
import styles from "./ModuleAccordion.module.css";
import { useContext, useState } from "react";
import LessonOverlay from "../Lesson/LessonOverlay";
import { useDisclosure } from "@mantine/hooks";
import { Lesson } from "../../interfaces/kit";
import { CourseContext } from "./CourseContext";
import { FullscreenContextProvider } from "../../context/FullscreenContextProvider";
import { AuthContext } from "../../context/AuthContextProvider";

interface ModuleAccordionProps {
  module: {
    title: string;
    lessons: Lesson[];
  };
}

const ModuleAccordion = ({ module }: ModuleAccordionProps) => {
  const theme = useMantineTheme();
  const { currentUserData } = useContext(AuthContext);
  const { currentCourseData } = useContext(CourseContext);
  const [opened, { open, close }] = useDisclosure(false);
  const [initialLessonIndex, setInitialLessonIndex] = useState<number | null>(
    null
  );

  // opens modal and sets the selected lesson index
  const handleLessonClick = (index: number) => {
    setInitialLessonIndex(index); // Store the clicked lesson index
    open(); // Open the modal
  };

  // custom onClose resets initialLessonIndex when modal is closed
  const handleClose = () => {
    setInitialLessonIndex(null);
    close();
  };

  return (
    <>
      {initialLessonIndex !== null && (
        <FullscreenContextProvider>
          <LessonOverlay
            courseTitle={
              currentCourseData?.title + " - " + currentCourseData?.kit
            }
            moduleTitle={module.title}
            currentLessonIndex={initialLessonIndex} // current lesson index
            moduleLessons={module.lessons} // full module lessons array, including content
            opened={opened}
            onClose={handleClose}
          />
        </FullscreenContextProvider>
      )}

      <Accordion
        variant="separated"
        className={styles.accordionContainer}
        chevron={
          <IconSquareRoundedChevronDownFilled
            stroke={2.5}
            color={theme.colors.neutral[5]}
          />
        }
        chevronSize={20}
      >
        <Accordion.Item
          key={module.title}
          value={module.title}
          className={styles.accordionItem}
        >
          <Accordion.Control
            icon={<IconBook2 color={theme.colors.neutral[4]} />}
            c="neutral.5"
          >
            <Group justify="space-between" pr="sm">
              <Text fw={700}>{module.title}</Text>
              <Text>{module.lessons.length} Lessons</Text>
            </Group>
          </Accordion.Control>
          <Accordion.Panel>
            <Stack pb="1rem">
              {module.lessons.map((lesson, index) => (
                <Tooltip
                  key={lesson.id}
                  arrowOffset={10}
                  arrowSize={5}
                  withArrow
                  label={"Open Lesson"}
                  transitionProps={{ transition: "fade-down", duration: 300 }}
                  position="bottom"
                  color="neutral.5"
                  offset={5}
                >
                  <Box
                    key={lesson.title}
                    className={styles.lessonCard}
                    p="1rem"
                    onClick={() => handleLessonClick(index)}
                  >
                    <Group>
                      <IconFile />
                      <Text c="neutral.5">{lesson.title}</Text>
                    </Group>
                  </Box>
                </Tooltip>
              ))}
            </Stack>
            {currentUserData?.get("role") === "admin" && (
              <Button
                className={styles.addLessonButton}
                leftSection={<IconFilePlus />}
                bg="primary.5"
                w="100%"
                size="lg"
              >
                <Text fw={600}>Add new lesson</Text>
              </Button>
            )}
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default ModuleAccordion;
