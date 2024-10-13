import Parse from "../../parseconfig.ts";
import CourseCardCollection from "../components/Dashboard/CourseCardCollection";

import {
  Blockquote,
  Box,
  Center,
  Grid,
  Input,
  Loader,
  Select,
  Stack,
  useMantineTheme,
} from "@mantine/core";
import { IconFilter, IconInfoCircle, IconSearch } from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formattedPageTitle } from "../constants/pageTitles.ts";
import { AuthContext } from "../context/AuthContextProvider.tsx";

// defining the Course type and create some dummy data
export interface Course {
  id: string;
  description: string;
  title: string;
  kitName: string;
  lessons: number;
  image: Parse.File;
  yearLevel: string;
  isCertificateAvailable: boolean;
}

/**
 * Page containing the content used to populate the dashboard, main functionality to display the user's courses
 */
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
      .filter((course) => {
        // applying search query filter
        const matchesSearchQuery =
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.kitName.toLowerCase().includes(searchQuery.toLowerCase());

        // apply completion status filter
        const isCompleted = completedCourseIds.includes(course.id);

        // filtering based on the selected filter type
        if (filter === "complete") {
          return matchesSearchQuery && isCompleted;
        } else if (filter === "incomplete") {
          return matchesSearchQuery && !isCompleted;
        }

        // default filter is the search query
        return matchesSearchQuery;
      })
      .sort((a, b) => {
        // sorting logic based on selected filter
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
  }, [courses, searchQuery, filter, completedCourseIds]);

  return (
    <Box w="100%" h="100%">
      {loading ? (
        <Center h="100vh">
          <Loader
            pt="1rem"
            size={40}
            color={theme.colors.primary[4]}
            style={{ display: "block" }}
          />
        </Center>
      ) : courses.length === 0 ? (
        <Box p={40}>
          <Blockquote
            color="blue"
            radius="xl"
            icon={<IconInfoCircle size={60} />}
            cite="&mdash; ByteEd Support"
          >
            You currently don&apos;t have access to any courses. Visit the <Link to={"/user/browse"}>Browse</Link> page to explore available courses and request access! &#128512;
          </Blockquote>
        </Box>
      ) : (
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
                value={filter}
                defaultValue={"recently-viewed"}
                onChange={(value) => setFilter(value)}
                data={[
                  { value: "all", label: "All" },
                  { value: "recently-viewed", label: "Recently Viewed" },
                  { value: "complete", label: "Complete" },
                  { value: "incomplete", label: "Incomplete" },
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
              unsubscribed={false}
              completedCourseIds={completedCourseIds}
              bookmarkedCourseIds={bookmarkedCourses}
            />
          </Box>
        </Stack>
      )}
    </Box>
  );
};

export default DashboardPage;
