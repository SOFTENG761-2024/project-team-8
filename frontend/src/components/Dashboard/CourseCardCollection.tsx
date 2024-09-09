import React, { useState } from "react";
import { Pagination, Grid, Flex } from "@mantine/core";
import CourseCard from "./CourseCard";
import { Course } from "../../pages/DemoDashboard.page";

interface CourseCardCollectionProps {
  courses: Course[];
}

const CourseCardCollection: React.FC<CourseCardCollectionProps> = ({
  courses,
}) => {
  // setting this as the active page
  const [activePage, setPage] = useState(1);
  const coursesPerPage = 4;

  // calculating the index range for the current page
  const startIndex = (activePage - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;

  // get the courses to display for the current page
  const displayedCourses = courses.slice(startIndex, endIndex);

  return (
    <div>
      <div>CourseCardCollection</div>
      {/* display courses in grid */}
      <Grid m={"xl"}>
        {displayedCourses.map((course) => (
          <Grid.Col span={6} key={course.id}>
            {" "}
            {/* Display 2 courses per row */}
            <CourseCard course={course} />
          </Grid.Col>
        ))}
      </Grid>

      {/* centering pagination using flex component */}
      <Flex justify="center" mt="lg">
        <Pagination
          onChange={setPage}
          total={Math.ceil(courses.length / coursesPerPage)}
        />
      </Flex>
    </div>
  );
};

export default CourseCardCollection;
