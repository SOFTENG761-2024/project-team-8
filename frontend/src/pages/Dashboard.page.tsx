import CourseCardCollection from "../components/Dashboard/CourseCardCollection";
import Parse from "../../parseconfig.ts";

import {
  Box,
  Center,
  Grid,
  Input,
  Loader,
  Select,
  Stack,
  useMantineTheme,
} from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { IconFilter, IconSearch } from "@tabler/icons-react";
import { AuthContext } from "../context/AuthContextProvider.tsx";
import { formattedPageTitle } from "../constants/pageTitles.ts";

// defininng the Course type and create some dummy data
export interface Course {
  id: string;
  description: string;
  title: string;
  kitName: string;
  lessons: number;
  image: Parse.File;
}

const DashboardPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const theme = useMantineTheme();
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [filter, setFilter] = useState<string | null>("recently-viewed");
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { currentUserData } = useContext(AuthContext);
  const [bookmarkedCourses, setBookmarkedCourses] = useState<string[]>([]);
  const [completedCourseIds, setCompletedCourseIds] = useState<string[]>([]);
  useEffect(() => {
    document.title = formattedPageTitle("DASHBOARD");
  }, []);

  // fetch data
  useEffect(() => {
    const fetchUserCourses = async () => {
      try {
        const courses = await Parse.Cloud.run("getUserKitsAndCourses");
        setCourses(courses);
        const completedCourses = await Parse.Cloud.run("getCompletedCourses", {
          userId: currentUserData?.id,
        });
        setCompletedCourseIds(completedCourses);
        // Fetch bookmarked course IDs
        const bookmarkResults = await Parse.Cloud.run("getBookmarkedCourses", {
          userId: currentUserData?.id,
        });

        // Extract and store just the course IDs
        const bookmarkedCourseIds = bookmarkResults.map(
          (course: Course) => course.id
        );
        setBookmarkedCourses(bookmarkedCourseIds);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserCourses();
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
              rightSection={<IconSearch />}
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
                { value: "name-asc", label: "Name A-Z" },
                { value: "name-desc", label: "Name Z-A" },
              ]}
              placeholder="Filter & Sort"
              rightSection={<IconFilter />}
            />
          </Grid.Col>
        </Grid>
        <Box className="course-card-collection-wrapper">
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
          ) : (
            <CourseCardCollection
              courses={filteredCourses} unsubscribed={false}
              completedCourseIds={completedCourseIds}
              bookmarkedCourseIds={bookmarkedCourses}
            />
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default DashboardPage;
