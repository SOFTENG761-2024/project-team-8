import { useParams } from "react-router-dom";
import { Box, Group, Text, Title } from "@mantine/core";
import CourseContent from "../components/Course/CourseContent";

const CoursePage = () => {
  const { courseId } = useParams();

  return (
    <Box p="2rem">
      <Title order={3} c="primary.5">Course Title <Text inherit span c="primary.3">- Dinosaur Steps</Text></Title>
      <Group justify="space-between">
        <Box w="40%">
          <Text>Placeholder for Course Summary</Text>
        </Box>
        <CourseContent courseId={courseId} summaryExpanded />
      </Group>
    </Box>
  )
};

export default CoursePage;
