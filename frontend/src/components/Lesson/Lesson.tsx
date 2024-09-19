import { Text, Box } from '@mantine/core';

interface LessonProps {
  module: {
    title: string;
    lessons: string[];
  };
  selectedLesson: string;
}

const Lesson = ({ module, selectedLesson }: LessonProps) => {
  return (
    <Box p="1rem">
      <Text size="lg">Module: {module.title}</Text>
      <Text size="md">Lesson: {selectedLesson}</Text>
      <Text size="sm">
        This module contains {module.lessons.length} lessons.
      </Text>
    </Box>
  );
};

export default Lesson;
