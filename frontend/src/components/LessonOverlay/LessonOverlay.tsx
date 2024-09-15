import { useEffect, useState } from "react";
import Parse from "../../../parseconfig";
import { Box } from "@mantine/core";
import PdfViewer from "../PdfViewer/PdfViewer";

interface LessonOverlayProps {
  lessonId: string;
}

interface LessonPdfUrls {
  teacherHandout: string;
  studentWorksheet: string;
}

const LessonOverlay = ({ lessonId }: LessonOverlayProps) => {
  const [lessonPdfUrls, setLessonPdfUrls] = useState<LessonPdfUrls | null>(
    null
  );

  const fetchLessonPdfUrls = async () => {
    const Lesson = Parse.Object.extend("lesson");
    const query = new Parse.Query(Lesson);

    try {
      const lesson = await query.get(lessonId);

      const pdfUrls: LessonPdfUrls = {
        teacherHandout: "",
        studentWorksheet: "",
      };

      for (const file of lesson.get("content")) {
        if (file.text === "Teacher_handout") {
          pdfUrls.teacherHandout = file.printout.url();
        } else if (file.text === "Worksheet") {
          pdfUrls.studentWorksheet = file.printout.url();
        }
      }

      setLessonPdfUrls(pdfUrls);
    } catch {
      // TODO: Replace with a Mantine Alert component to display the error message to the user in a more user-friendly way
      console.error(
        "There was a problem loading the lesson data, please try again."
      );
    }
  };

  useEffect(() => {
    fetchLessonPdfUrls();
  }, []);

  return (
    <Box>
      {lessonPdfUrls && lessonPdfUrls.teacherHandout && (
        <PdfViewer url={lessonPdfUrls.teacherHandout} />
      )}
    </Box>
  );
};

export default LessonOverlay;
