import { Box, Grid, Group, Loader, Text, useMantineTheme } from "@mantine/core";
import { IconBooks } from "@tabler/icons-react";
import ModuleAccordion from "./ModuleAccordion";
import { useEffect, useState } from "react";
import Parse from "../../../parseconfig";

interface CourseContentProps {
    courseId: string | undefined;
    summaryExpanded?: boolean;
}

interface ModulesData {
    title: string;
    lessons: string[];
} 

const CourseContent = ({ courseId, summaryExpanded }: CourseContentProps) => {
    const theme = useMantineTheme();
    const [modulesData, setModulesData] = useState<ModulesData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    /**
     * Fetches course data from the Parse server
     */
    const fetchCourseData = async () => {
        const Course = Parse.Object.extend("course");
        const query = new Parse.Query(Course);

        try {
            const course = await query.get(courseId);

            const modules = [];

            for (const module of course.get("modules")) {
                const lessonTitles = [];

                for (const lesson of module.lessons) {
                    const Lesson = Parse.Object.extend("lesson");
                    const lessonQuery = new Parse.Query(Lesson);

                    try {
                        const lessonData = await lessonQuery.get(lesson);
                        lessonTitles.push(lessonData.get("title"));
                    } catch (error) {
                        console.error("Error fetching lesson: ", error);
                    }
                }

                modules.push({
                    title: module.title,
                    lessons: lessonTitles
                });
            }

            setModulesData(modules);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching course data: ", error);
        }
    }

    useEffect(() => {
        fetchCourseData();
    }, []);

    return (
        <Box w="50%">
            <Group gap="xs" pl="md" pr="md">
                <IconBooks size={24} color={theme.colors.primary[3]} />
                <Text size="textLg" fw={700} c="primary.5">Course Content</Text>
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
            </Grid>
        </Box>
    )
}

export default CourseContent;
