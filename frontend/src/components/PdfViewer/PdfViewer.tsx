import { Box, Paper, Stack, Text } from "@mantine/core";
import styles from "./PdfViewer.module.css";
import { useCallback, useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import PdfViewerNav from "./PdfViewerNav";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface PdfViewerProps {
  url: string;
  fullscreen: boolean;
  setFullscreen: (fullscreen: boolean) => void;
}

interface OnLoadSuccessProps {
  numPages: number;
}

/**
 * This component handles the logic for displaying a PDF file on the page, using the react-pdf library.
 * It also provides a fullscreen mode to view the PDF file.
 *
 * @param {string} url - The URL of the PDF file to display.
 * @param {boolean} fullscreen - Indicates whether the viewer is in fullscreen mode.
 * @param {function} setFullscreen - A function to set the fullscreen mode of the viewer.
 */
const PdfViewer = ({ url, fullscreen, setFullscreen }: PdfViewerProps) => {
  const [numPages, setNumPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [displayAlert, setDisplayAlert] = useState<boolean>(false);

  const onDocumentLoadSuccess = ({ numPages }: OnLoadSuccessProps): void => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const changePage = useCallback(
    (offset: number) => {
      const newPageNumber = pageNumber + offset;

      if (newPageNumber >= 1 && newPageNumber <= numPages) {
        setPageNumber((prevPageNumber) => prevPageNumber + offset);
      }
    },
    [pageNumber, numPages]
  );

  useEffect(() => {
    if (fullscreen) {
      const handleKeyDown = (event: KeyboardEvent) => {
        switch (event.key) {
          case "ArrowLeft":
          case "ArrowUp":
            changePage(-1);
            break;
          case "ArrowRight":
          case "ArrowDown":
            changePage(1);
            break;
          case "Escape":
            setFullscreen(false);
            break;
          default:
            break;
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [fullscreen, changePage]);

  useEffect(() => {
    setDisplayAlert(true);
    setTimeout(() => {
      setDisplayAlert(false);
    }, 1000);
  }, [fullscreen]);

  return (
    <Box
      className={
        fullscreen ? styles.fullscreenContainer : styles.nonFullscreenContainer
      }
    >
      <Stack className={styles.viewerBackground}>
        <Box>
          <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            className={
              fullscreen ? styles.fullscreenView : styles.nonFullscreenView
            }
          >
            <Page
              pageNumber={pageNumber}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              className={
                fullscreen ? styles.fullscreenView : styles.nonFullscreenView
              }
            />
          </Document>
        </Box>
        <PdfViewerNav
          changePage={changePage}
          pageNumber={pageNumber}
          numPages={numPages}
          fullscreen={fullscreen}
        />

        {fullscreen && displayAlert && (
          <Box className={styles.alertContainer}>
            <Paper className={styles.alertPopUp}>
              <Text size="1.5rem">Press ESC to exit present mode</Text>
            </Paper>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default PdfViewer;
