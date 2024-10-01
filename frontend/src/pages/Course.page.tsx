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
import { IconBookmark, IconBookmarkFilled } from "@tabler/icons-react";
import { AuthContext } from "../context/AuthContextProvider.tsx";

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
  const { currentUserData } = useContext(AuthContext);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const results = await Parse.Cloud.run("getCourse", {
          courseId: courseId,
        });
        setCurrentCourseData(results);
        setLoading(false);

        // check if the current course is bookmarked using cloud function
        if (currentUserData) {
          const isBookmarked = await Parse.Cloud.run("isCourseBookmarked", {
            courseId: courseId,
            userId: currentUserData.id,
          });
          setIsBookmarked(isBookmarked);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourseData();
  }, [courseId, currentUserData]);

  const handleBookmark = async () => {
    if (!currentUserData) {
      console.log("No user is logged in.");
      return;
    }

    try {
      await Parse.Cloud.run("toggleBookmarkCourse", {
        courseId: courseId,
        userId: currentUserData.id, // user logged in ID
      });
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error("Error toggling bookmarking:", error);
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
          <Group align="center" justify="space-between">
            <Title order={3} c="primary.5">
              {currentCourseData?.title + " "}
              <Text inherit span c="primary.3">
                - {currentCourseData?.kit}
              </Text>
            </Title>
            <Button onClick={() => handleBookmark()} mr="xl" bg={"pink"}>
              <Group align="center">
                {isBookmarked ? <IconBookmarkFilled /> : <IconBookmark />}
                <Text inherit>{isBookmarked ? "Unbookmark" : "Bookmark"}</Text>
              </Group>
            </Button>
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
