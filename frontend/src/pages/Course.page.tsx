import { useParams } from "react-router-dom";
import { Box, Button, Group, Text, Title } from "@mantine/core";
import CourseContent from "../components/Course/CourseContent";
import { CourseSummary } from "../components/CourseSummary/CourseSummary.tsx";
import { useState } from "react";
import PdfViewer from "../components/PdfViewer/PdfViewer.tsx";

const CoursePage = () => {
  const { courseId } = useParams();
  const [summaryExpanded, setSummaryExpanded] = useState<boolean>(true);
  const [fullscreen, setFullscreen] = useState<boolean>(false);

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
      <PdfViewer
        url="https://parsefiles.back4app.com/vt1VirZhot1njEgarRDLCF1FtwuMO6DOfMqC9gj8/0284af214b913ab4a7875e8203c33bea_Demonstration%20Copy%20-%20Dinosaur%20Commands%20Module%20-%20Lesson%2002%20-%20Teaching%20Slides.pdf"
        fullscreen={fullscreen}
        setFullscreen={setFullscreen}
      />
      <Button onClick={() => setFullscreen(true)}>Toggle Fullscreen</Button>
      <a
        target="_blank"
        href="https://parsefiles.back4app.com/vt1VirZhot1njEgarRDLCF1FtwuMO6DOfMqC9gj8/0284af214b913ab4a7875e8203c33bea_Demonstration%20Copy%20-%20Dinosaur%20Commands%20Module%20-%20Lesson%2002%20-%20Teaching%20Slides.pdf"
        download="filename.pdf"
      >
        <Button>Download PDF</Button>
      </a>
    </Box>
  );
};

export default CoursePage;
