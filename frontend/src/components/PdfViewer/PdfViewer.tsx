import { Center } from "@mantine/core";
import styles from "./PdfViewer.module.css";

interface PdfViewerProps {
  url: string;
  fullscreen?: boolean;
}

const PdfViewer = ({ url, fullscreen = false }: PdfViewerProps) => {
  return (
    <Center>
      <object
        data={url}
        type="application/pdf"
        className={
          fullscreen ? styles.fullscreenView : styles.nonFullscreenView
        }
      ></object>
    </Center>
  );
};

export default PdfViewer;
