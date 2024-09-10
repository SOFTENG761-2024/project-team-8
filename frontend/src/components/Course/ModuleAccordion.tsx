import { Accordion, Box, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import { IconBook2, IconFile } from "@tabler/icons-react";

interface ModuleAccordionProps {
    module: {
        title: string;
        content: string[];
    }
}

const ModuleAccordion = ({ module }: ModuleAccordionProps) => {
    const theme = useMantineTheme();
    return (
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
    )
}

export default ModuleAccordion;
