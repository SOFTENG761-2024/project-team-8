import React, { useState } from "react";
import { Pagination, Grid } from "@mantine/core"; // Import Grid and Pagination from Mantine
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
      <Grid>
        {displayedCourses.map((course) => (
          <Grid.Col span={6} key={course.id}>
            {" "}
            {/* Display 2 courses per row */}
            <CourseCard course={course} />
          </Grid.Col>
        ))}
      </Grid>

      {/* Pagination component */}
      <Pagination
        page={activePage}
        onChange={setPage}
        total={Math.ceil(courses.length / coursesPerPage)}
        position="center"
        mt="lg"
      />
    </div>
  );
};

export default CourseCardCollection;
