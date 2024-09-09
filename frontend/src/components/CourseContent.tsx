import { Accordion, Box, Grid, Group, Stack, Text } from "@mantine/core";

interface CourseContentProps {
    summaryExpanded: boolean;
}

const CourseContent = ({ summaryExpanded }: CourseContentProps) => {
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
            <Group>
                <Box>Icon</Box>
                <Text size="lg" fw={700} c="primary.6">Course Content</Text>
            </Group>
            <Grid>
                {modules.map((module) => (
                    <Grid.Col span={summaryExpanded ? 12 : 6}>
                        <Accordion>
                            <Accordion.Item key={module.title} value={module.title}>
                                <Accordion.Control icon={<Box>icon</Box>}>{module.title}</Accordion.Control>
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
                                                        <Box>Icon</Box>
                                                        <Text>{lesson}</Text>
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
