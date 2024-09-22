import Parse from "parse";

export interface Kit {
  id: string;
  title: string;
  courses: Course[];
}

export interface Course {
  id: string;
  title: string
  kitTitle: string;
  yearLevel: number; // string?
  description: string;
  outcomes: string[];
  modules: string[]; // references to those objects
  assessments: Assessment[];
  image: string;
}

export interface Module {
  category: string;
  title: string;
  description: string;
  lessons: string[];
}

export interface Assessment {
  category: string;
  title: string;
  printout: Parse.File[];
}

export interface Lesson {
  id: string;
  title: string;
  overview: string;
  content: Content[];
}

export interface Content {
  title: string;
  description: string;
  printout: Parse.File;
}
