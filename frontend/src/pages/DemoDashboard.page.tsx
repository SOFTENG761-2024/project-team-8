import CourseCardCollection from "../components/Dashboard/CourseCardCollection";
import DummyCourseImage from "../assets/dummy_course.png";
import { Input, Select, Grid, Stack } from "@mantine/core";
import { useState, useEffect } from "react";

// Define the Course type and create some dummy data
export interface Course {
  id: number;
  title: string;
  course: string;
  lessons: number;
  status: string;
  image: string;
}

// Dummy course data
const dummyCourses: Course[] = [
  {
    id: 1,
    title: "Farming & Agriculture",
    course: "Dinosaur Steps",
    lessons: 17,
    status: "Completed",
    image: DummyCourseImage,
  },
  {
    id: 2,
    title: "Science & Nature",
    course: "Dinosaur Steps",
    lessons: 12,
    status: "Active",
    image: DummyCourseImage,
  },
  {
    id: 3,
    title: "Math & Logic",
    course: "Dinosaur Steps",
    lessons: 20,
    status: "Active",
    image: DummyCourseImage,
  },
  {
    id: 4,
    title: "History & Culture",
    course: "Dinosaur Steps",
    lessons: 8,
    status: "Active",
    image: DummyCourseImage,
  },
  {
    id: 5,
    title: "TEAMATE",
    course: "Dinosaur Steps",
    lessons: 17,
    status: "Active",
    image: DummyCourseImage,
  },
  {
    id: 6,
    title: "Helooo",
    course: "Dinosaur Steps",
    lessons: 12,
    status: "Active",
    image: DummyCourseImage,
  },
  {
    id: 7,
    title: "Test",
    course: "Dinosaur Steps",
    lessons: 20,
    status: "Active",
    image: DummyCourseImage,
  },
  {
    id: 8,
    title: "Bob",
    course: "Dinosaur Steps",
    lessons: 8,
    status: "Completed",
    image: DummyCourseImage,
  },
];

const DemoDashboardPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [filter, setFilter] = useState<string | null>("recently-viewed");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // simulating fetch data (REPLACE THIS WITH OUR API CALL)
  useEffect(() => {
    // mock api call

    setCourses(dummyCourses);
  }, []);

  // update the courses shown whenever courses, search query, or filter changes
  useEffect(() => {
    const filtered = courses
      .filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        switch (filter) {
          case "name-asc":
            return a.title.localeCompare(b.title);
          case "name-desc":
            return b.title.localeCompare(a.title);
          case "completed":
            return a.status === "Completed" ? -1 : 1;
          case "active":
            return a.status === "Active" ? -1 : 1;
          default:
            return 0;
        }
      });

    setFilteredCourses(filtered);
  }, [courses, searchQuery, filter]);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Stack h="auto" align="stretch">
        <Grid pb={10}>
          <Grid.Col span={8}>
            <Input
              size="md"
              placeholder="Search for my course"
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Select
              size="md"
              defaultValue={"recently-viewed"}
              onChange={(value) => setFilter(value)}
              data={[
                { value: "all", label: "All" },
                { value: "recently-viewed", label: "Recently Viewed" },
                { value: "active", label: "Active" },
                { value: "completed", label: "Completed" },
                { value: "name-asc", label: "Name A-Z" },
                { value: "name-desc", label: "Name Z-A" },
              ]}
              placeholder="Filter & Sort"
            />
          </Grid.Col>
        </Grid>
        <div className="course-card-collection-wrapper">
          <CourseCardCollection courses={filteredCourses} />
        </div>
      </Stack>
    </div>
  );
};

export default DemoDashboardPage;
