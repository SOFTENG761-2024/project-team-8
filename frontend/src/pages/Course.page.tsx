import { useParams } from "react-router-dom";
import {
  Box,
  Center,
  Group,
  Loader,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import CourseContent from "../components/Course/CourseContent";
import { CourseSummary } from "../components/CourseSummary/CourseSummary.tsx";
import { useContext, useEffect, useState } from "react";
import Parse from "../../parseconfig.ts";
import { Course } from "../interfaces/kit.ts";
import { CourseContext } from "../components/Course/CourseContext.tsx";

export interface CoursePage extends Course {
  num_lessons: number;
  kit: string;
}

const CoursePage = () => {
  const { courseId } = useParams();
  const theme = useMantineTheme();
  const { currentCourseData, setCurrentCourseData } = useContext(CourseContext);
  const [summaryExpanded, setSummaryExpanded] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const results = await Parse.Cloud.run("getCourse", {
          courseId: courseId,
        });
        setCurrentCourseData(results);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourseData();
  }, []);
  return (
    <Box h="100%" w="100%">
      {loading ? (
        <Center h="100%" w="100%">
          <Loader size={100} color={theme.colors.primary[4]} />
        </Center>
      ) : (
        <>
          <Title order={3} c="primary.5">
            {currentCourseData?.title + " "}
            <Text inherit span c="primary.3">
              - {currentCourseData?.kit}
            </Text>
          </Title>
          <Group justify="space-between" align="top" h="100%" mt="1rem">
            <Box h="100%">
              <CourseSummary
                summaryExpanded={summaryExpanded}
                setSummaryExpanded={setSummaryExpanded}
              />
            </Box>
            <CourseContent summaryExpanded={summaryExpanded} />
          </Group>
        </>
      )}
    </Box>
  );
};

export default CoursePage;
