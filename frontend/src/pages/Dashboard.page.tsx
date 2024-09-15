import CourseCardCollection from "../components/Dashboard/CourseCardCollection";
import DummyCourseImage from "../assets/dummy_course.png";
import { Input, Select, Grid, Stack, Box } from "@mantine/core";
import { useState, useEffect } from "react";
import { IconFilter } from '@tabler/icons-react';

// defininng the Course type and create some dummy data
export interface Course {
  id: string | number;
  title: string;
  course: string;
  lessons: number;
  status: string;
  image: string;
}

// dummy course data
const dummyCourses: Course[] = [
  {
    id: "OD8B3IFblh",
    title: "Farming & Agriculture",
    course: "Dinosaur Steps",
    lessons: 17,
    status: "Completed",
    image: DummyCourseImage,
  },
  {
    id: "IYoDFvC311",
    title: "Science & Nature",
    course: "Dinosaur Steps",
    lessons: 12,
    status: "Active",
    image: DummyCourseImage,
  },
  {
    id: "SSRXHpmY3V",
    title: "Math & Logic",
    course: "Dinosaur Steps",
    lessons: 20,
    status: "Active",
    image: DummyCourseImage,
  },
  {
    id: "1",
    title: "History & Culture",
    course: "Dinosaur Steps",
    lessons: 8,
    status: "Active",
    image: DummyCourseImage,
  },
  {
    id: "2",
    title: "TEAMATE",
    course: "Dinosaur Steps",
    lessons: 17,
    status: "Active",
    image: DummyCourseImage,
  },
  {
    id: "3",
    title: "Helooo",
    course: "Dinosaur Steps",
    lessons: 12,
    status: "Active",
    image: DummyCourseImage,
  },
  {
    id: "4",
    title: "Test",
    course: "Dinosaur Steps",
    lessons: 20,
    status: "Active",
    image: DummyCourseImage,
  },
  {
    id: "5",
    title: "Bob",
    course: "Dinosaur Steps",
    lessons: 8,
    status: "Completed",
    image: DummyCourseImage,
  },
];

const DashboardPage = () => {
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
    <Box w={"100%"} h={"100%"}>
      <Stack h="auto" align="stretch">
        <Grid pb={10}>
          <Grid.Col span={8}>
            <Input
              size="md"
              variant="filled"
              placeholder="Search for course..."
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Select
              size="md"
              variant="filled"
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
              rightSection={<IconFilter />}
            />
          </Grid.Col>
        </Grid>
        <Box className="course-card-collection-wrapper">
          <CourseCardCollection courses={filteredCourses} />
        </Box>
      </Stack>
    </Box>
  );
};

export default DashboardPage;
