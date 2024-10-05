import { useParams } from "react-router-dom";
import {
  Box,
  Button,
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
import { useToggle } from "@mantine/hooks";
import { AuthContext } from "../context/AuthContextProvider.tsx";
import { formattedPageTitle } from "../constants/pageTitles.ts";

export interface CoursePage extends Course {
  num_lessons: number;
  kit: string;
}

const CoursePage = () => {
  const { courseId } = useParams();
  const { currentUserData } = useContext(AuthContext);
  const theme = useMantineTheme();
  const [isComplete, toggle] = useToggle(["Complete", "Incomplete"]);
  const { currentCourseData, setCurrentCourseData } = useContext(CourseContext);
  const [summaryExpanded, setSummaryExpanded] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    document.title = formattedPageTitle("COURSE");

    const fetchCourseData = async () => {
      try {
        const courseResult = await Parse.Cloud.run("getCourse", {
          courseId: courseId,
        });
        const completedResult = await Parse.Cloud.run("isCourseCompleted", {
          courseId: courseId,
          userId: currentUserData?.id,
        });
        setCurrentCourseData(courseResult);
        if (completedResult) {
          toggle("Complete");
        } else {
          toggle("Incomplete");
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourseData();
  }, []);

  const toggleIsComplete = async () => {
    try {
      const result = await Parse.Cloud.run("toggleCompleteCourse", {
        courseId: courseId,
        userId: currentUserData?.id,
      });
      console.log(result);
      toggle();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box h="100%" w="100%">
      {loading ? (
        <Center h="100%" w="100%">
          <Loader size={100} color={theme.colors.primary[4]} />
        </Center>
      ) : (
        <>
          <Group justify="space-between">
            <Title order={3} c="primary.5">
              {currentCourseData?.title + " "}
              <Text inherit span c="primary.3">
                - {currentCourseData?.kit}
              </Text>
            </Title>
            <Button onClick={toggleIsComplete}>{isComplete}</Button>
          </Group>
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
