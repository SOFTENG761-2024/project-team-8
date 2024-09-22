import {
  Accordion,
  Box,
  Group,
  Stack,
  Text,
  useMantineTheme,
  Tooltip,
} from "@mantine/core";
import {
  IconBook2,
  IconSquareRoundedChevronDownFilled,
  IconFile,
} from "@tabler/icons-react";
import styles from "./ModuleAccordion.module.css";
import { useState } from "react";
import LessonOverlay from "../Lesson/LessonOverlay";
import { useDisclosure } from "@mantine/hooks";

interface ModuleAccordionProps {
  module: {
    title: string;
    lessons: string[];
  };
}

const ModuleAccordion = ({ module }: ModuleAccordionProps) => {
  const theme = useMantineTheme();

  const [opened, { open, close }] = useDisclosure(false);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  const handleLessonClick = (lesson: string) => {
    setSelectedLesson(lesson);
    open();
  };

  return (
    <>
      {selectedLesson && (
        <LessonOverlay
          courseTitle={"Course Title - Dinosaur Steps"}
          moduleTitle={module.title}
          selectedLesson={selectedLesson}
          opened={opened}
          onClose={close}
        />
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
            <Stack>
              {module.lessons.map((lesson) => (
                <Tooltip arrowOffset={10} arrowSize={5} withArrow label={"Open Lesson"} transitionProps={{ transition: 'fade-down', duration: 300 }} position="bottom" color="neutral.5" offset={5}>
                  <Box
                    key={lesson}
                    className={styles.lessonCard}
                    p="1rem"
                    onClick={() => handleLessonClick(lesson)}
                  >
                    <Group>
                      <IconFile />
                      <Text c="neutral.5">{lesson}</Text>
                    </Group>
                  </Box>
                </Tooltip>
              ))}
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default ModuleAccordion;
