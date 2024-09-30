import { Group, Button, Stack, Title, Text, Divider } from "@mantine/core";
import { IconArrowsMaximize, IconDownload } from "@tabler/icons-react";

interface LessonContentSectionProps {
  title: string;
  description: string;
  fileUrl: string;
}

const LessonContentSection = ({
  title,
  description,
  fileUrl,
}: LessonContentSectionProps) => (
  <Stack py="0.5rem">
    <Divider />

    {/* Content title and description */}
    <Title size="h4" fw="700" c="primary.5" pt="1rem">
      {title}
    </Title>
    <Text ta="justify"> {description}</Text>
    {/* PDF button group */}
    <Group justify="center" gap="1rem" py="0.5rem">
      <Button variant="filled" leftSection={<IconDownload size="1.25rem" />}>
        Download File
      </Button>
      <Button
        variant="filled"
        leftSection={<IconArrowsMaximize size="1.25rem" />}
      >
        View Fullscreen
      </Button>
    </Group>
    <Text ta="center">(Add PDF viewer here using: {fileUrl})</Text>
  </Stack>
);

export default LessonContentSection;
