import { Box, Button, Divider, Group, Stack, Text, Title } from "@mantine/core";
import { IconArrowsMaximize, IconDownload } from "@tabler/icons-react";
import { useContext, useState } from "react";
import { FullscreenContext } from "../../context/FullscreenContextProvider";
import PdfViewer from "../PdfViewer/PdfViewer";

interface LessonContentSectionProps {
  title: string;
  description: string;
  fileUrl: string;
}

const LessonContentSection = ({
  title,
  description,
  fileUrl,
}: LessonContentSectionProps) => {
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  const { setIsAnyPdfFullscreen } = useContext(FullscreenContext);

  const handlePdfFullscreen = () => {
    setFullscreen(true);
    setIsAnyPdfFullscreen(true);
  };

  return (
    <Stack py="0.5rem">
      <Divider />

      {/* Content title and description */}
      <Title size="h4" fw="700" c="primary.5" pt="1rem">
        {title}
      </Title>
      <Text ta="justify"> {description}</Text>
      {/* PDF button group */}
      {fileUrl && (
        <Box>
          <Group justify="center" gap="1rem" py="0.5rem">
            <a target="_blank" href={fileUrl}>
              <Button
                variant="filled"
                leftSection={<IconDownload size="1.25rem" />}
              >
                Download File
              </Button>
            </a>
            <Button
              variant="filled"
              leftSection={<IconArrowsMaximize size="1.25rem" />}
              onClick={handlePdfFullscreen}
            >
              View Fullscreen
            </Button>
          </Group>
          <PdfViewer
            url={fileUrl}
            fullscreen={fullscreen}
            setFullscreen={setFullscreen}
          />
        </Box>
      )}
    </Stack>
  );
};

export default LessonContentSection;
