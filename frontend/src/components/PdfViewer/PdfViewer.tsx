import { Box, Flex, Loader, Paper, Stack, Text } from "@mantine/core";
import styles from "./PdfViewer.module.css";
import { useCallback, useContext, useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import PdfViewerNav from "./PdfViewerNav";
import { FullscreenContext } from "../../context/FullscreenContextProvider";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface PdfViewerProps {
  url: string;
  fullscreen: boolean;
  setFullscreen: (fullscreen: boolean) => void;
}

interface OnLoadSuccessTypes {
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
  const [displayAlerts, setDisplayAlerts] = useState<boolean>(false);

  const { setIsAnyPdfFullscreen } = useContext(FullscreenContext);

  const onDocumentLoadSuccess = ({ numPages }: OnLoadSuccessTypes): void => {
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
            setIsAnyPdfFullscreen(false);
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
    setDisplayAlerts(true);
    setTimeout(() => {
      setDisplayAlerts(false);
    }, 3000);
  }, [fullscreen]);

  return (
    <Box
      className={
        fullscreen ? styles.fullscreenContainer : styles.nonFullscreenContainer
      }
    >
      {fullscreen ? (
        <Stack className={styles.viewerBackground}>
          <Box>
            <Document
              file={url}
              onLoadSuccess={onDocumentLoadSuccess}
              className={styles.fullscreenView}
              loading={<Loader color="primary.5" />}
            >
              <Page
                pageNumber={pageNumber}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                className={styles.fullscreenView}
                loading={<Loader color="primary.5" pt="2rem" />}
              />
            </Document>
          </Box>
          <PdfViewerNav
            changePage={changePage}
            pageNumber={pageNumber}
            numPages={numPages}
            fullscreen={fullscreen}
            className={displayAlerts ? styles.showNav : ""}
          />
        </Stack>
      ) : (
        <Flex
          direction="row"
          wrap="nowrap"
          align="center"
          className={styles.viewerBackground}
        >
          <Stack gap="0">
            <Text
              size="1.1rem"
              c="neutral.2"
              ta="center"
              py="0.7rem"
              tt="uppercase"
            >
              Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
            </Text>
            <Document
              file={url}
              onLoadSuccess={onDocumentLoadSuccess}
              className={styles.nonFullscreenView}
              loading={
                <Flex
                  w="34vw"
                  h="100%"
                  justify="center"
                  align="center"
                  pt="2rem"
                >
                  <Loader color="primary.2" />
                </Flex>
              }
            >
              <Page
                pageNumber={pageNumber}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                className={styles.nonFullscreenView}
                loading={
                  <Flex w="34.5vw" justify="center" align="center" pt="2rem">
                    <Loader color="primary.5" />
                  </Flex>
                }
              />
            </Document>
          </Stack>
          <PdfViewerNav
            changePage={changePage}
            pageNumber={pageNumber}
            numPages={numPages}
            fullscreen={fullscreen}
          />
        </Flex>
      )}
      {fullscreen && (
        <Box className={styles.alertContainer}>
          <Paper
            className={
              displayAlerts ? styles.alertPopUp : styles.alertPopUpHidden
            }
          >
            <Text size="1.3rem">Press ESC to exit present mode</Text>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default PdfViewer;
