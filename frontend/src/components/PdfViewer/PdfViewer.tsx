import { Box, Center, Group, Text } from "@mantine/core";
import styles from "./PdfViewer.module.css";
import { IconSquareRoundedXFilled } from "@tabler/icons-react";

interface PdfViewerProps {
  url: string;
  fullscreen: boolean;
  setFullscreen: (fullscreen: boolean) => void;
}

const PdfViewer = ({ url, fullscreen, setFullscreen }: PdfViewerProps) => {
  const minimizePdf = () => {
    setFullscreen(false);
  };

  return (
    <Box className={fullscreen ? styles.fullscreenContainer : ""}>
      {fullscreen && (
        <Box className={styles.fullscreenTopMenu} bg="primary.5">
          <Group gap="1rem">
            <Text size="1.5rem" c="white">
              Exit Fullscreen
            </Text>
            <IconSquareRoundedXFilled
              size={50}
              className={styles.minimizeIcon}
              onClick={minimizePdf}
            />
          </Group>
        </Box>
      )}
      <Center>
        <object
          data={url + "#view=Fit"}
          type="text/html"
          className={
            fullscreen ? styles.fullscreenView : styles.nonFullscreenView
          }
        ></object>
      </Center>
    </Box>
  );
};

export default PdfViewer;
