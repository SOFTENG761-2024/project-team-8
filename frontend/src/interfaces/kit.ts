import Parse from 'parse';

export interface Lesson {
    title: string;
    overview: Parse.File;
    printable: Parse.File;
    content:Parse.File;
}

 export interface Module {
    category: string;
    name: string;
    description: string;
    lessons: Lesson[];
}

export interface Assessment {
    category: string;
    title: string;
    printout: Parse.File[];
}

export interface Kit {
    id: string;
    yearLevel: number;
    modules: Module[];
    assessments: Assessment[];
}