import { Box, Grid, Group, Text, useMantineTheme } from "@mantine/core";
import { IconBooks } from "@tabler/icons-react";
import ModuleAccordion from "./ModuleAccordion";

interface CourseContentProps {
    summaryExpanded?: boolean;
}

const CourseContent = ({ summaryExpanded }: CourseContentProps) => {
    const theme = useMantineTheme();

    // Mock data
    const modules = [
        {
            title: "Module 1",
            content: [
                "Lesson 1",
                "Lesson 2",
                "Lesson 3"
            ]
        },
        {
            title: "Module 2",
            content: [
                "Lesson 1",
                "Lesson 2",
                "Lesson 3"
            ]
        },
        {
            title: "Module 3",
            content: [
                "Lesson 1",
                "Lesson 2"
            ]
        },
        {
            title: "Module 4",
            content: [
                "Lesson 1",
                "Lesson 2",
                "Lesson 3",
                "Lesson 4"
            ]
        }
    ]
    return (
        <Box>
            <Group gap="xs">
                <IconBooks size={24} color={theme.colors.primary[3]} />
                <Text size="lg" fw={700} c="primary.5">Course Content</Text>
            </Group>
            <Grid>
                {modules.map((module) => (
                    <Grid.Col span={summaryExpanded ? 12 : 6}>
                        <ModuleAccordion module={module} />
                    </Grid.Col>
                ))}
            </Grid>
        </Box>
    )
}

export default CourseContent;
