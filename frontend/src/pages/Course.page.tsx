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
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
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
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false); // State to track bookmarked status
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const results = await Parse.Cloud.run("getCourse", {
          courseId: courseId,
        });
        setCurrentCourseData(results);
        setLoading(false);

        // checking if the current course is bookmarked
        const bookmarks = currentUserData?.get("bookmarks") || [];
        setIsBookmarked(bookmarks.includes(courseId));
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourseData();
  }, [courseId]);

  const handleFavorite = async () => {
    if (!currentUserData) {
      console.log("No user is logged in.");
      return;
    }

    try {
      await Parse.Cloud.run("toggleFavoriteCourse", {
        courseId: courseId,
        userId: currentUserData.id, // user logged in ID
      });
      isBookmarked ? console.log("Unfavorited successfully.") : console.log("Favorited successfully.");
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error("Error toggling favorite:", error);
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
            <Button onClick={() => handleFavorite()} mr="xl" bg={"pink"}>
              <Group align="center">
                {isBookmarked ? <IconHeartFilled /> : <IconHeart />}
                <Text inherit>{isBookmarked ? "Unfavorite" : "Favorite"}</Text>
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
