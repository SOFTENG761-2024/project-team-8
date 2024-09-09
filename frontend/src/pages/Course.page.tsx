import { useParams } from "react-router-dom";

const CoursePage = () => {
  const { courseId } = useParams();

  return <h1>Course Page: {courseId}</h1>;
};

export default CoursePage;
