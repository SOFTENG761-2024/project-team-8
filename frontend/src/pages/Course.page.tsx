import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  Group,
  Loader,
  Text,
  Title,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import CourseContent from "../components/Course/CourseContent";
import { CourseSummary } from "../components/CourseSummary/CourseSummary.tsx";
import { useContext, useEffect, useState } from "react";
import Parse from "../../parseconfig.ts";
import { Course } from "../interfaces/kit.ts";
import { CourseContext } from "../components/Course/CourseContext.tsx";
import {
  IconAward,
  IconAwardFilled,
  IconBookmark,
  IconBookmarkFilled,
} from "@tabler/icons-react";
import { AuthContext } from "../context/AuthContextProvider.tsx";
import { formattedPageTitle } from "../constants/pageTitles.ts";
import NotFoundPage from "./NotFound.page.tsx";

export interface CoursePage extends Course {
  num_lessons: number;
  kit: string;
}

const CoursePage = () => {
  const { courseId } = useParams();
  const { currentUserData } = useContext(AuthContext);
  const theme = useMantineTheme();
  const [isComplete, setIsComplete] = useState(false);
  const { currentCourseData, setCurrentCourseData } = useContext(CourseContext);
  const [summaryExpanded, setSummaryExpanded] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [isNotFound, setIsNotFound] = useState<boolean>(false);
  useEffect(() => {
    document.title = formattedPageTitle("COURSE");

    const fetchCourseData = async () => {
      try {
        const courseResult = await Parse.Cloud.run("getCourse", {
          courseId: courseId,
        });
        console.log(courseResult)
        // If courseResult is null or undefined, set isNotFound to true
        if (!courseResult) {
          setIsNotFound(true);
          setLoading(false);
          return;
        }

        const completedResult = await Parse.Cloud.run("isCourseCompleted", {
          courseId: courseId,
          userId: currentUserData?.id,
        });
        setCurrentCourseData(courseResult);
        setIsComplete(completedResult);

        // check if the current course is bookmarked using cloud function
        if (currentUserData) {
          const isBookmarked = await Parse.Cloud.run("isCourseBookmarked", {
            courseId: courseId,
            userId: currentUserData.id,
          });
          setIsBookmarked(isBookmarked);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setIsNotFound(true);
        setLoading(false);
      }
    };
    fetchCourseData();
  }, [courseId, currentUserData]);

  const toggleIsComplete = async () => {
    try {
      await Parse.Cloud.run("toggleCompleteCourse", {
        courseId: courseId,
        userId: currentUserData?.id,
      });
      setIsComplete(!isComplete);
    } catch (error) {
      console.log(error);
    }
  };
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
      ) : isNotFound ? (
        <NotFoundPage />
      ) : (
        <>
          <Group align="center" justify="space-between">
            <Title order={3} c="primary.5">
              {currentCourseData?.title + " "}
              <Text inherit span c="primary.3">
                - {currentCourseData?.kit}
              </Text>
            </Title>
            <Group>
              <Tooltip
                multiline
                label={
                  isComplete
                    ? "Mark this course as incomplete"
                    : "Mark this course as complete"
                }
                position="bottom"
                transitionProps={{ transition: "pop", duration: 300 }}
              >
                <Button
                  radius="xl"
                  bg={theme.colors.accentGreen[2]}
                  c={theme.colors.accentGreen[5]}
                  onClick={toggleIsComplete}
                  leftSection={isComplete ? <IconAwardFilled /> : <IconAward />}
                >
                  {isComplete ? "Mark as incomplete" : "Mark as complete"}
                </Button>
              </Tooltip>
              <Tooltip
                multiline
                label={
                  isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"
                }
                position="bottom"
                transitionProps={{ transition: "pop", duration: 300 }}
              >
                <Button
                  radius="xl"
                  bg={theme.colors.accentRed[1]}
                  c={theme.colors.accentRed[4]}
                  onClick={() => handleBookmark()}
                  leftSection={
                    isBookmarked ? <IconBookmarkFilled /> : <IconBookmark />
                  }
                  mr={"1rem"}
                >
                  {isBookmarked ? "Unbookmark" : "Bookmark"}
                </Button>
              </Tooltip>
            </Group>
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
