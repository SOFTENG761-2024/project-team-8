import { Box, Text } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import CourseCardCollection from "../components/Dashboard/CourseCardCollection";
import { AuthContext } from "../context/AuthContextProvider";
import Parse from "../../parseconfig";
import { Course } from "./Dashboard.page";
import { formattedPageTitle } from "../constants/pageTitles.ts";

const BookmarksPage = () => {
  const [bookmarkedCourses, setBookmarkedCourses] = useState<Course[]>([]);
  const [bookmarkedCoursesId, setBookmarkedCoursesId] = useState<string[]>([]);
  const { currentUserData } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [completedCourseIds, setCompletedCourseIds] = useState<string[]>([]);
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

  if (loading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box>
      {bookmarkedCourses.length > 0 ? (
        <CourseCardCollection
          bookmarkedCourseIds={bookmarkedCoursesId}
          completedCourseIds={completedCourseIds}
          courses={bookmarkedCourses}
        />
      ) : (
        <Text>No bookmarked courses found</Text>
      )}
    </Box>
  );
};

export default BookmarksPage;
