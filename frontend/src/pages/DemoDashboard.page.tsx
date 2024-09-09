import CourseCardCollection from "../components/Dashboard/CourseCardCollection";
import DummyCourseImage from "../assets/dummy_course.png";

// Define the Course type and create some dummy data
export interface Course {
  id: number;
  title: string;
  course: string;
  lessons: number;
  status: string;
  image: string;
}

// Dummy course data
const dummyCourses: Course[] = [
  {
    id: 1,
    title: "Farming & Agriculture",
    course: "Dinosaur Steps",
    lessons: 17,
    status: "Completed",
    image: DummyCourseImage,
  },
  {
    id: 2,
    title: "Science & Nature",
    course: "Dinosaur Steps",
    lessons: 12,
    status: "In Progress",
    image: DummyCourseImage,
  },
  {
    id: 3,
    title: "Math & Logic",
    course: "Dinosaur Steps",
    lessons: 20,
    status: "Not Started",
    image: DummyCourseImage,
  },
  {
    id: 4,
    title: "History & Culture",
    course: "Dinosaur Steps",
    lessons: 8,
    status: "Completed",
    image: DummyCourseImage,
  },
  {
    id: 1,
    title: "TEAMATE",
    course: "Dinosaur Steps",
    lessons: 17,
    status: "Completed",
    image: DummyCourseImage,
  },
  {
    id: 2,
    title: "Helooo",
    course: "Dinosaur Steps",
    lessons: 12,
    status: "In Progress",
    image: DummyCourseImage,
  },
  {
    id: 3,
    title: "Test",
    course: "Dinosaur Steps",
    lessons: 20,
    status: "Not Started",
    image: DummyCourseImage,
  },
  {
    id: 4,
    title: "Bob",
    course: "Dinosaur Steps",
    lessons: 8,
    status: "Completed",
    image: DummyCourseImage,
  },
];

const DemoDashboardPage = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>This is a dummy page for the Course Lists</p>
      <CourseCardCollection courses={dummyCourses} />
    </div>
  );
};

export default DemoDashboardPage;
