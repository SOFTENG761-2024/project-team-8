import { Box, Flex, Loader, Paper, Stack, Text } from "@mantine/core";
import styles from "./PdfViewer.module.css";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
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
 * @component
 *
 * @param {string} url - The URL of the PDF file to display.
 * @param {boolean} fullscreen - Indicates whether the viewer is in fullscreen mode.
 * @param {function} setFullscreen - A function to set the fullscreen mode of the viewer.
 */
const PdfViewer = ({ url, fullscreen, setFullscreen }: PdfViewerProps) => {
  const [numPages, setNumPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [displayAlerts, setDisplayAlerts] = useState<boolean>(false);
  const { setIsAnyPdfFullscreen, lessonChanged, setLessonChanged } =
    useContext(FullscreenContext);
  const [documentLoading, setDocumentLoading] = useState<boolean>(true);
  const [pdfSize, setPdfSize] = useState({ width: 0, height: 0 });
  const pdfCanvasRef = useRef(null);

  const onDocumentLoadSuccess = ({ numPages }: OnLoadSuccessTypes): void => {
    setNumPages(numPages);
    setDocumentLoading(false);
  };

  const onDocumentLoading = () => {
    if (lessonChanged) {
      // reset page number when on new lesson overlay screen
      setPageNumber(1);
    }
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
            setDocumentLoading(true);
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

  const handlePageRenderSuccess = () => {
    // Ensure  canvas is rendered before accessing its dimensions for rendering loading spinner
    if (pdfCanvasRef.current) {
      const { clientWidth, clientHeight } = pdfCanvasRef.current;
      setPdfSize({ width: clientWidth, height: clientHeight });
    }
  };

  useEffect(() => {
    setDisplayAlerts(true);
    setTimeout(() => {
      setDisplayAlerts(false);
    }, 3000);
  }, [fullscreen]);

  useEffect(() => {
    if (lessonChanged) {
      setLessonChanged(false);
    }
    setDocumentLoading(true);
  }, [lessonChanged]);

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
        <>
          {documentLoading && <Loader color="primary.5" />}
          <Flex
            direction="row"
            wrap="nowrap"
            align="center"
            className={
              documentLoading ? styles.hidden : styles.viewerBackground
            } // only render pdf viewer once document is fully loaded
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
                onLoadProgress={onDocumentLoading}
                onLoadSuccess={onDocumentLoadSuccess}
                className={styles.nonFullscreenView}
              >
                <Page
                  canvasRef={pdfCanvasRef}
                  canvasBackground="transparent"
                  pageNumber={pageNumber}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  className={styles.nonFullscreenView}
                  onRenderSuccess={handlePageRenderSuccess}
                  loading={
                    <Flex
                      w={pdfSize.width}
                      h={pdfSize.height}
                      justify="center"
                      align="center"
                      pt="2rem"
                    >
                      <Loader color="primary.2" />
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
        </>
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
