import { ActionIcon, Box, Center, Tooltip } from "@mantine/core";
import styles from "./PdfViewer.module.css";
import {
  IconChevronDown,
  IconChevronUp,
  IconMinimize,
} from "@tabler/icons-react";
import { useState } from "react";

interface PdfViewerProps {
  url: string;
  fullscreen: boolean;
  setFullscreen: (fullscreen: boolean) => void;
}

/**
 * This component handles the logic for displaying a PDF file on the page, using the default browser PDF viewer.
 * It also provides a fullscreen mode to view the PDF file.
 *
 * @param {string} url - The URL of the PDF file to display.
 * @param {boolean} fullscreen - Indicates whether the viewer is in fullscreen mode.
 * @param {function} setFullscreen - A function to set the fullscreen mode of the viewer.
 */
const PdfViewer = ({ url, fullscreen, setFullscreen }: PdfViewerProps) => {
  const [barMinimized, setBarMinimized] = useState<boolean>(false);

  const minimizePdf = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setFullscreen(false);
  };

  const toggleBar = () => {
    setBarMinimized(!barMinimized);
  };

  return (
    <Box className={fullscreen ? styles.fullscreenContainer : ""}>
      {fullscreen && (
        <Box
          className={styles.fullscreenTopMenu}
          bg="primary.5"
          onClick={toggleBar}
          style={{
            height: barMinimized ? "1vh" : "5vh",
            transition: "height ease-out 0.2s",
          }}
        >
          {barMinimized ? (
            <Tooltip label="Expand">
              <IconChevronDown color="white" style={{ marginLeft: "50vw" }} />
            </Tooltip>
          ) : (
            <>
              <Tooltip label="Hide">
                <IconChevronUp color="white" style={{ marginLeft: "50vw" }} />
              </Tooltip>
              <Tooltip label="Exit Fullscreen">
                <ActionIcon onClick={minimizePdf} size={30}>
                  <IconMinimize size={40} className={styles.minimizeIcon} />
                </ActionIcon>
              </Tooltip>
            </>
          )}
        </Box>
      )}
      <Center>
        <object
          data={url + "#view=Fit"}
          type="text/html"
          className={
            fullscreen ? styles.fullscreenView : styles.nonFullscreenView
          }
          style={{
            height: fullscreen ? (barMinimized ? "99vh" : "95vh") : "50vh",
            transition: "height ease-out 0.2s",
          }}
        ></object>
      </Center>
    </Box>
  );
};

export default PdfViewer;
