import Parse from "../../parseconfig";

export async function fetchLessonPdfUrls(lessonId: string) {
  const Lesson = Parse.Object.extend("lesson");
  const query = new Parse.Query(Lesson);

  try {
    const lesson = await query.get(lessonId);

    const pdfUrls = {
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

    return pdfUrls;
  } catch {
    return null;
  }
}
