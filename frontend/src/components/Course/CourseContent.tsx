import {
  Alert,
  Box,
  Grid,
  Group,
  Loader,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconBooks, IconExclamationCircle } from "@tabler/icons-react";
import ModuleAccordion from "./ModuleAccordion";
import { useContext, useEffect, useState } from "react";
import Parse from "../../../parseconfig";
import { CourseContext } from "./CourseContext.tsx";
import { Lesson } from "../../interfaces/kit.ts";

interface CourseContentProps {
  summaryExpanded: boolean;
}

interface ModulesData {
  title: string;
  lessons: Lesson[];
}

const CourseContent = ({ summaryExpanded }: CourseContentProps) => {
  const theme = useMantineTheme();
  const [modulesData, setModulesData] = useState<ModulesData[]>([]);
  const { currentCourseData } = useContext(CourseContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches course data from the Parse server
   */
  const fetchCourseData = async () => {
    if (currentCourseData) {
      try {
        const modules: ModulesData[] = []; // Initialize an empty array for modules
        const courseModules = currentCourseData.modules;

        // Iterate over each module
        for (const module of courseModules) {
          const lessonDetails: Lesson[] = []; // Array to hold lessons with title & id

          // Fetch data for each lesson in the module
          for (const lesson of module.lessons) {
            try {
              const lessonData = await Parse.Cloud.run("getLesson", {
                lessonId: lesson, // Using lesson ID to fetch lesson data
              });
              // Store both lesson ID and title in the array
              lessonDetails.push({
                id: lessonData.id, // Store lesson ID
                title: lessonData.title, // Store lesson title
                overview: lessonData.overview, // Store lesson overview
                content: lessonData.content, // Store full lesson content
              });
            } catch (error) {
              console.log(error);
              setError(
                "There was a problem loading the course data, please try again."
              );
              setLoading(false);
              return; // Exit if there's an error
            }
          }

          // Push the module data with lessons into modules array
          modules.push({
            title: module.title, // Module title
            lessons: lessonDetails, // Array of lesson details (ID & title)
          });
        }

        // Update state with the fetched modules and lessons
        setModulesData(modules);
        setLoading(false); // Stop loading
      } catch (error) {
        console.log(error);
        setError(
          "There was a problem loading the course data, please try again."
        );
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, [currentCourseData]);

  return (
    <Box flex={1}>
      <Group gap="xs" pl="md" pr="md">
        <IconBooks size={24} color={theme.colors.primary[3]} />
        <Text size="textLg" fw={700} c="primary.5">
          Course Content
        </Text>
      </Group>
      <Grid pl="md" pr="md" pt="xs">
        {loading && (
          <Loader
            pt="1rem"
            m="0 auto"
            size={40}
            color={theme.colors.primary[4]}
          />
        )}
        {modulesData.map((module) => (
          <Grid.Col key={module.title} span={summaryExpanded ? 12 : 6}>
            <ModuleAccordion module={module} />
          </Grid.Col>
        ))}
        {error && (
          <Alert
            variant="light"
            color="red"
            title="Something went wrong"
            mt="1rem"
            w="100%"
            icon={<IconExclamationCircle />}
          >
            {error}
          </Alert>
        )}
      </Grid>
    </Box>
  );
};

export default CourseContent;
