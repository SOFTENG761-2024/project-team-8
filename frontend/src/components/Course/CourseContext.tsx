import { createContext, ReactNode, useState } from "react";
import { Course } from "../../interfaces/kit";

export interface CoursePage extends Course {
  num_lessons: number;
  kit: string;
}

/* CourseContext prop types */
interface CourseContextType {
  currentCourseData: CoursePage | null;
  setCurrentCourseData: (course: CoursePage | null) => void;
  clearCurrentCourseData: () => void;
}

/* CourseContext initial values */
export const CourseContext = createContext<CourseContextType>({
  currentCourseData: null,
  setCurrentCourseData: () => {},
  clearCurrentCourseData: () => {},
});

interface CourseContextProviderProps {
  children: ReactNode;
}

export function CourseContextProvider({
  children,
}: CourseContextProviderProps) {
  const [currentCourseData, setCurrentCourseData] = useState<CoursePage | null>(
    null
  );

  const clearCurrentCourseData = () => {
    setCurrentCourseData(null);
  };

  const context = {
    currentCourseData,
    setCurrentCourseData,
    clearCurrentCourseData,
  };

  return (
    <CourseContext.Provider value={context}>{children}</CourseContext.Provider>
  );
}
