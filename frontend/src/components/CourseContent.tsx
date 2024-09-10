import { Accordion, Box, Grid, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import { IconBooks, IconBook2, IconFile } from "@tabler/icons-react";

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
                        <Accordion>
                            <Accordion.Item key={module.title} value={module.title}>
                                <Accordion.Control icon={<IconBook2 color={theme.colors.neutral[4]} />} c="neutral.5">
                                    <Text fw={700}>{module.title}</Text>
                                </Accordion.Control>
                                <Accordion.Panel>
                                    <Stack>
                                        {module.content.map((lesson) => (
                                            <Box
                                                key={lesson}
                                                style={{
                                                    cursor: "pointer",
                                                    borderRadius: "1rem",
                                                }}
                                                p="1rem"
                                                bg="neutral.1"
                                                >
                                                    <Group>
                                                        <IconFile color={theme.colors.neutral[4]} />
                                                        <Text c="neutral.5">{lesson}</Text>
                                                    </Group>
                                            </Box>
                                        ))}
                                    </Stack>
                                </Accordion.Panel>
                            </Accordion.Item>
                        </Accordion>
                    </Grid.Col>
                ))}
            </Grid>
        </Box>
    )
}

export default CourseContent;
