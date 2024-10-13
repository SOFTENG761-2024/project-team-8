import CourseCardCollection from "../components/Dashboard/CourseCardCollection";
import Parse from "../../parseconfig.ts";

import {
  Blockquote,
  Box,
  Center,
  Grid,
  Input,
  Loader,
  Paper,
  Select,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { IconFilter, IconInfoCircle, IconSearch } from "@tabler/icons-react";
import { Course } from "./Dashboard.page.tsx";
import { formattedPageTitle } from "../constants/pageTitles.ts";

const BrowsePage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const theme = useMantineTheme();
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [filter, setFilter] = useState<string | null>("recently-viewed");
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // fetch data and change page title
  useEffect(() => {
    document.title = formattedPageTitle("BROWSE");
    const fetchUserCourses = async () => {
      try {
        // get course content
        const sub = await Parse.Cloud.run("getUserKitsAndCourses");
        const allCourses = await Parse.Cloud.run("getAllKitCourses");
        // remove duplicates from all available courses
        const uniqueAllCourses = allCourses.filter(
          (obj: { id: string }, index: number, self: []) =>
            index === self.findIndex((o: { id: string }) => o.id === obj.id)
        );
        // filter out subscribed courses to get unsubscribed courses
        const result = uniqueAllCourses.filter(
          (obj1: { id: string }) =>
            !sub.some((obj2: { id: string }) => obj1.id === obj2.id)
        );
        setCourses(result);
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
      .filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.kitName.toLowerCase().includes(searchQuery.toLowerCase())
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
    <Box w="100%" h="100%">
      {loading ? (
        <Center h="100%" w="100%">
          <Loader
            pt="1rem"
            m="0 auto"
            size={40}
            color={theme.colors.primary[4]}
            style={{ margin: "0 auto", display: "block" }}
          />
        </Center>
      ) : courses.length === 0 ? (
        <Box p={40}>
          <Blockquote
            color="blue"
            radius="xl"
            icon={<IconInfoCircle size={60} />}
          >
            You have access to all the courses available. Keep on the lookout
            for new courses! &#128512;
          </Blockquote>
        </Box>
      ) : (
        <Stack h="auto" align="stretch" gap={0}>
          <Paper bg="primary.0" mb="0.5rem" p="0.75rem" radius="0.75rem">
            <Text c="primary.3" fw="800" size="sm">
              You do not have access to these courses
            </Text>
            <Text c="primary.4" fw="500" mt="0.25rem" size="sm">
              Please contact ByteEd by email at DEMO@byteed.com with the course
              name, course kit, and username or email of your ByteEd account.
            </Text>
          </Paper>
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
                defaultValue="recently-viewed"
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
            <CourseCardCollection
              courses={filteredCourses}
              unsubscribed
              completedCourseIds={[]}
              bookmarkedCourseIds={[]}
            />
          </Box>
        </Stack>
      )}
    </Box>
  );
};
export default BrowsePage;
