import { Box, Stack } from "@mantine/core";
import styles from "./PdfViewer.module.css";
// import {
//   IconChevronDown,
//   IconChevronUp,
//   IconMinimize,
// } from "@tabler/icons-react";
import { useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

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
  // const [barMinimized, setBarMinimized] = useState<boolean>(false);
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  // const minimizePdf = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.stopPropagation();
  //   setFullscreen(false);
  // };

  // const toggleBar = () => {
  //   setBarMinimized(!barMinimized);
  // };

  console.log(setFullscreen);

  function onDocumentLoadSuccess({ numPages: nextNumPages }): void {
    setNumPages(nextNumPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <Box className={fullscreen ? styles.fullscreenContainer : ""}>
      <Stack>
        <div>
          <p>
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </p>
          <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
            Previous
          </button>
          <button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
          >
            Next
          </button>
        </div>
        <Box style={{ display: "flex", justifyContent: "center" }}>
          {/* TODO: Add navbar type element here to display page number, navigation buttons and fullscreen button then won't need stack */}
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
      </Stack>
    </Box>
    // <Box className={fullscreen ? styles.fullscreenContainer : ""}>
    //   {fullscreen && (
    //     <Box
    //       className={styles.fullscreenTopMenu}
    //       bg="primary.5"
    //       onClick={toggleBar}
    //       style={{
    //         height: barMinimized ? "1vh" : "5vh",
    //         transition: "height ease-out 0.2s",
    //       }}
    //     >
    //       {barMinimized ? (
    //         <Tooltip label="Expand">
    //           <IconChevronDown color="white" style={{ marginLeft: "50vw" }} />
    //         </Tooltip>
    //       ) : (
    //         <>
    //           <Tooltip label="Hide">
    //             <IconChevronUp color="white" style={{ marginLeft: "50vw" }} />
    //           </Tooltip>
    //           <Tooltip label="Exit Fullscreen">
    //             <ActionIcon onClick={minimizePdf} size={30}>
    //               <IconMinimize size={40} className={styles.minimizeIcon} />
    //             </ActionIcon>
    //           </Tooltip>
    //         </>
    //       )}
    //     </Box>
    //   )}
    //   <Center>
    //     <object
    //       data={url + "#view=Fit"}
    //       type="text/html"
    //       className={
    //         fullscreen ? styles.fullscreenView : styles.nonFullscreenView
    //       }
    //       style={{
    //         height: fullscreen ? (barMinimized ? "99vh" : "95vh") : "50vh",
    //         transition: "height ease-out 0.2s",
    //       }}
    //     ></object>
    //   </Center>
    // </Box>
  );
};

export default PdfViewer;
