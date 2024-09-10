import { useParams } from "react-router-dom";
import { Box, Title } from "@mantine/core";
import CourseContent from "../components/CourseContent";

const CoursePage = () => {
  const { courseId } = useParams();

  return (
    <Box>
      <Title order={3} c="primary.5">Course Title</Title>
      <CourseContent />
    </Box>
  )
};

export default CoursePage;
