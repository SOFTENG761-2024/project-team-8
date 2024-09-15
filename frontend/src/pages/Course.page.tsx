import { useParams } from "react-router-dom";
import { Box, Group, Text, Title } from "@mantine/core";
import CourseContent from "../components/Course/CourseContent";
import { CourseSummary } from "../components/CourseSummary/CourseSummary.tsx";
import { useState } from "react";

const CoursePage = () => {
  const { courseId } = useParams();
  const [summaryExpanded, setSummaryExpanded] = useState<boolean>(true);

  return (
    <Box h="100%" w="100%">
      <Title order={3} c="primary.5">
        Course Title{" "}
        <Text inherit span c="primary.3">
          - Dinosaur Steps
        </Text>
      </Title>
      <Group justify="space-between" align="top" h="100%" mt="1rem">
        <Box h="100%">
          <CourseSummary
            summaryExpanded={summaryExpanded}
            setSummaryExpanded={setSummaryExpanded}
          />
        </Box>
        <CourseContent courseId={courseId} summaryExpanded={summaryExpanded} />
      </Group>
    </Box>
  );
};

export default CoursePage;
