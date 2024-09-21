import { ActionIcon, Group, Text } from "@mantine/core";
import styles from "./PdfViewerNav.module.css";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

interface PdfViewerNavProps {
  changePage: (offset: number) => void;
  pageNumber: number;
  numPages: number;
  fullscreen?: boolean;
}

/**
 * This component provides navigation controls for the PDF viewer.
 *
 * @param {function} changePage - This function changes the current page of the PDF viewer. It takes an offset as an argument, which determines the direction and number of pages to move.
 * @param {number} pageNumber - The current page number of the PDF viewer.
 * @param {number} numPages - The total number of pages in the PDF document being viewed.
 * @param {boolean} fullscreen - Indicates whether the viewer is in fullscreen mode. Defaults to false if not provided.
 */
const PdfViewerNav = ({
  changePage,
  pageNumber,
  numPages,
  fullscreen = false,
}: PdfViewerNavProps) => {
  return (
    <Group
      gap="2rem"
      m="0 auto"
      className={fullscreen ? styles.fullscrenNav : styles.nonFullscreenNav}
    >
      <ActionIcon
        variant="transparent"
        onClick={() => changePage(-1)}
        disabled={pageNumber <= 1}
        size="md"
        className={styles.arrowButtons}
        c={fullscreen ? "neutral.0" : "neutral.0"}
      >
        <IconArrowLeft />
      </ActionIcon>
      <Text size="1.3rem">
        Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
      </Text>
      <ActionIcon
        variant="transparent"
        onClick={() => changePage(1)}
        disabled={pageNumber >= numPages}
        size="md"
        className={styles.arrowButtons}
        c={fullscreen ? "neutral.0" : "neutral.0"}
      >
        <IconArrowRight />
      </ActionIcon>
    </Group>
  );
};

export default PdfViewerNav;
