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
            transition: "ease-in-out 0.3s",
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
            height: barMinimized ? "99vh" : "95vh",
            transition: "ease-in-out 0.3s",
          }}
        ></object>
      </Center>
    </Box>
  );
};

export default PdfViewer;
