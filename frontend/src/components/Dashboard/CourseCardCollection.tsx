import React, { useState } from "react";
import { Pagination, Grid, Flex, Text } from "@mantine/core";
import CourseCard from "./CourseCard";
import { Course } from "../../pages/DemoDashboard.page";

interface CourseCardCollectionProps {
  courses: Course[];
}

const CourseCardCollection: React.FC<CourseCardCollectionProps> = ({
  courses,
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
    <div>
      {/* Display a message when no courses are available */}
      {courses.length === 0 ? (
        <Flex justify="center" align="center" h="100px">
          <Text size="xl">
            Could not find the course you're looking for &#128546;
          </Text>
        </Flex>
      ) : (
        <>
          {/* Display courses in grid */}
          <Grid>
            {displayedCourses.map((course) => (
              <Grid.Col
                span={6} // Adjust for 2 courses per row, adapt as needed
                md={6} // Half-width on medium screens
                key={course.id}
              >
                <CourseCard course={course} />
              </Grid.Col>
            ))}
          </Grid>

          {/* Center pagination using Flex component */}
          <Flex justify="center" mt="lg">
            <Pagination
              onChange={setPage}
              total={Math.ceil(courses.length / coursesPerPage)}
              page={activePage} // Sync the active page
            />
          </Flex>
        </>
      )}
    </div>
  );
};

export default CourseCardCollection;
