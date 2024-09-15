import { Box } from "@mantine/core";

interface PdfViewerProps {
  url: string;
}

const PdfViewer = ({ url }: PdfViewerProps) => {
  return (
    <Box style={{ height: "50vh", display: "flex", justifyContent: "center" }}>
      <object data={url} type="application/pdf" width="50%"></object>
    </Box>
  );
};

export default PdfViewer;
