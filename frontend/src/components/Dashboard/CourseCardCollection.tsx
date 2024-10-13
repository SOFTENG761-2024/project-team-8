import React, { useState } from "react";
import { Flex, Grid, Pagination, Text } from "@mantine/core";
import CourseCard from "./CourseCard";
import { Course } from "../../pages/Dashboard.page";

interface CourseCardCollectionProps {
  courses: Course[];
  completedCourseIds: string[];
  bookmarkedCourseIds: string[];
  unsubscribed: boolean;
}

/**
 * Component displays the course cards containign course information to be displayed in paginated form
 *
 * @param {Course[]} courses - list of data Course interface form to be displayed in the course cards
 * @param {string[]} completedCourseIds - list of course ids of completed courses
 * @param {string[]} bookmarkedCourseIds - list of course ids of bookmarked/saved courses
 * @param {boolean} unsubscribed -is True if the collection displays courses the user is not subscribed to, otherwise, false
 */
const CourseCardCollection: React.FC<CourseCardCollectionProps> = ({
  courses,
  completedCourseIds,
  bookmarkedCourseIds,
  unsubscribed,
}) => {
  // Setting the active page for pagination
  const [activePage, setPage] = useState(1);
  const coursesPerPage = 4;
  // Calculating the index range for the current page
  const startIndex = (activePage - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;

  // Get the courses to display for the current page
  const displayedCourses = courses.slice(startIndex, endIndex);

  return (
    <>
      {/* Display a message when no courses are available */}
      {courses.length === 0 ? (
        <Flex justify="center" align="center" h="100px">
          <Text c={"neutral.5"} size="xl">
            Could not find the course you're looking for &#128546;
          </Text>
        </Flex>
      ) : (
        <>
          {/* Display courses in grid */}
          <Grid>
            {displayedCourses.map((course) => (
              <Grid.Col
                span={6} // this makes two rows
                key={course.id}
              >
                <CourseCard
                  course={course}
                  unsubscribed={unsubscribed}
                  isComplete={
                    !unsubscribed &&
                    completedCourseIds.includes(course.id.toString())
                  }
                  isBookmarked={
                    !unsubscribed &&
                    bookmarkedCourseIds.includes(course.id.toString())
                  }
                />
              </Grid.Col>
            ))}
          </Grid>

          {/* Centering pagination using Flex component */}
          <Flex justify="center" mt="lg">
            <Pagination
              onChange={setPage}
              total={Math.ceil(courses.length / coursesPerPage)}
              value={activePage}
              gap={20}
            />
          </Flex>
        </>
      )}
    </>
  );
};

export default CourseCardCollection;
