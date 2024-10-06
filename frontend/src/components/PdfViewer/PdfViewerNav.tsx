import { ActionIcon, Group, Stack, Text, Tooltip } from "@mantine/core";
import styles from "./PdfViewerNav.module.css";
import {
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
} from "@tabler/icons-react";
import { FC } from "react";

interface PdfViewerNavProps {
  changePage: (offset: number) => void;
  pageNumber: number;
  numPages: number;
  fullscreen?: boolean;
  className?: string;
}

/**
 * This component provides navigation controls for the PDF viewer.
 *
 * @param {function} changePage - This function changes the current page of the PDF viewer. It takes an offset as an argument, which determines the direction and number of pages to move.
 * @param {number} pageNumber - The current page number of the PDF viewer.
 * @param {number} numPages - The total number of pages in the PDF document being viewed.
 * @param {boolean} fullscreen - Indicates whether the viewer is in fullscreen mode. Defaults to false if not provided.
 */
const PdfViewerNav: FC<PdfViewerNavProps> = ({
  changePage,
  pageNumber,
  numPages,
  fullscreen = false,
  className,
}) => {
  return fullscreen ? (
    <Group
      gap="2rem"
      m="0 auto"
      className={`${styles.fullscreenNav} ${className}`}
    >
      <ActionIcon
        variant="transparent"
        onClick={() => changePage(-1)}
        disabled={pageNumber <= 1}
        size="md"
        className={styles.arrowButtons}
        c="neutral.0"
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
        c="neutral.0"
      >
        <IconArrowRight />
      </ActionIcon>
    </Group>
  ) : (
    <Stack gap="3rem" className={styles.nonFullscreenNav}>
      <Tooltip label="Previous Page">
        <ActionIcon
          variant="transparent"
          onClick={() => changePage(-1)}
          disabled={pageNumber <= 1}
          size="lg"
          className={styles.arrowButtons}
          c="neutral.0"
          mx="0.2rem"
        >
          <IconArrowUp size={50} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Next Page">
        <ActionIcon
          variant="transparent"
          onClick={() => changePage(1)}
          disabled={pageNumber >= numPages}
          size="lg"
          className={styles.arrowButtons}
          c="neutral.0"
          mx="0.2rem"
        >
          <IconArrowDown size={50} />
        </ActionIcon>
      </Tooltip>
    </Stack>
  );
};

export default PdfViewerNav;
