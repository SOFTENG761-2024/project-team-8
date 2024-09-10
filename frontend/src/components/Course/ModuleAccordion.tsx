import { Accordion, Box, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import { IconBook2, IconSquareRoundedChevronDownFilled, IconFile } from "@tabler/icons-react";
import styles from "./ModuleAccordion.module.css";

interface ModuleAccordionProps {
    module: {
        title: string;
        content: string[];
    }
}

const ModuleAccordion = ({ module }: ModuleAccordionProps) => {
    const theme = useMantineTheme();
    return (
        <Accordion variant="separated" className={styles.accordionContainer} chevron={<IconSquareRoundedChevronDownFilled stroke={2.5} color={theme.colors.neutral[5]} />} chevronSize={20}>
            <Accordion.Item key={module.title} value={module.title} className={styles.accordionItem}>
                <Accordion.Control icon={<IconBook2 color={theme.colors.neutral[4]} />} c="neutral.5">
                    <Group justify="space-between" pr="sm">
                        <Text fw={700}>{module.title}</Text>
                        <Text>{module.content.length} Lessons</Text>
                    </Group>
                </Accordion.Control>
                <Accordion.Panel>
                    <Stack>
                        {module.content.map((lesson) => (
                            <Box
                                key={lesson}
                                className={styles.lessonCard}
                                p="1rem"
                                >
                                    <Group>
                                        <IconFile />
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
