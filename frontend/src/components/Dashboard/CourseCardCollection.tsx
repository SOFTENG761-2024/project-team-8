import React, { useState } from "react";
import { Pagination, Grid, Flex, Text, Box } from "@mantine/core";
import CourseCard from "./CourseCard";
import { Course } from "../../pages/Dashboard.page";

interface CourseCardCollectionProps {
  courses: Course[];
  unsubscribed: Boolean;
}

const CourseCardCollection: React.FC<CourseCardCollectionProps> = ({
  courses,
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
    <Box>
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
                <CourseCard course={course} unsubscribed={unsubscribed} />
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
    </Box>
  );
};

export default CourseCardCollection;
