import {
  Blockquote,
  Box,
  Center,
  Flex,
  Loader,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import CourseCardCollection from "../components/Dashboard/CourseCardCollection";
import { AuthContext } from "../context/AuthContextProvider";
import Parse from "../../parseconfig";
import { Course } from "./Dashboard.page";
import { formattedPageTitle } from "../constants/pageTitles.ts";
import { IconInfoCircle } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const BookmarksPage = () => {
  const [bookmarkedCourses, setBookmarkedCourses] = useState<Course[]>([]);
  const [bookmarkedCoursesId, setBookmarkedCoursesId] = useState<string[]>([]);
  const { currentUserData } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [completedCourseIds, setCompletedCourseIds] = useState<string[]>([]);
  const theme = useMantineTheme();

  useEffect(() => {
    document.title = formattedPageTitle("BOOKMARKS");
    const fetchBookmarkedCourses = async () => {
      if (!currentUserData) {
        console.log("User not logged in");
        return;
      }

      try {
        const results = await Parse.Cloud.run("getBookmarkedCourses", {
          userId: currentUserData.id,
        });

        const mappedCourses: Course[] = results.map((course: Course) => ({
          id: course.id,
          title: course.title,
          kitName: course.kitName,
          lessons: course.lessons,
          image: course.image as Parse.File,
        }));

        // extract and store just the course IDs
        const bookmarkedCourseIds = mappedCourses.map(
          (course: Course) => course.id
        );
        setBookmarkedCoursesId(bookmarkedCourseIds);

        setBookmarkedCourses(mappedCourses);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookmarked courses:", error);
        setLoading(false);
      }
    };
    const fetchCompletedCourses = async () => {
      try {
        const completedCourses = await Parse.Cloud.run("getCompletedCourses", {
          userId: currentUserData?.id,
        });
        setCompletedCourseIds(completedCourses);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCompletedCourses();
    fetchBookmarkedCourses();
  }, [currentUserData]);

  return (
    <Box>
      {loading ? (
        <Center h="100%" w="100%">
          <Loader
            pt="1rem"
            m="0 auto"
            size={40}
            color={theme.colors.primary[4]}
            style={{ margin: "0 auto", display: "block" }} // Optional inline styling for centering
          />
        </Center>
      ) : bookmarkedCourses.length > 0 ? (
        <CourseCardCollection
          bookmarkedCourseIds={bookmarkedCoursesId}
          completedCourseIds={completedCourseIds}
          courses={bookmarkedCourses}
          unsubscribed={false}
        />
      ) : (
        <Box p={40}>
          <Blockquote
            color="blue"
            radius="xl"
            icon={<IconInfoCircle size={60} />}
          >
            You don't have any bookmarked courses.
          </Blockquote>
        </Box>
      )}
    </Box>
  );
};

export default BookmarksPage;
