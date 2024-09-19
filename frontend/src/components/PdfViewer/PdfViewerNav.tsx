import { ActionIcon, Group, Text } from "@mantine/core";
import styles from "./PdfViewerNav.module.css";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

interface PdfViewerNavProps {
  changePage: (offset: number) => void;
  pageNumber: number;
  numPages: number;
  fullscreen?: boolean;
}

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
        c={fullscreen ? "neutral.0" : "primary.6"}
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
        c={fullscreen ? "neutral.0" : "primary.6"}
      >
        <IconArrowRight />
      </ActionIcon>
    </Group>
  );
};

export default PdfViewerNav;
