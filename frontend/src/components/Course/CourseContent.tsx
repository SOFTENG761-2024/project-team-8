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

interface CourseContentProps {
  summaryExpanded: boolean;
}

interface ModulesData {
  title: string;
  lessons: string[];
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
        const modules = [];
        const courseModules = currentCourseData.modules;
        for (const module of courseModules) {
          const lessonTitles = [];

          for (const lesson of module.lessons) {
            try {
              const lessonData = await Parse.Cloud.run("getLesson", {
                lessonId: lesson,
              });
              lessonTitles.push(lessonData.title);
            } catch {
              setError(
                "There was a problem loading the course data, please try again."
              );
              setLoading(false);
            }
          }

          modules.push({
            title: module.title,
            lessons: lessonTitles,
          });
        }
        if (error === null) {
          setModulesData(modules);
        }

        setLoading(false);
      } catch {
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
