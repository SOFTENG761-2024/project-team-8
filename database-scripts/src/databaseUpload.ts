const path = require("path");
const fs = require("fs");
import Parse from 'parse/node';

const dotenv = require('dotenv');

dotenv.config(); // Loads variables from the .env file
const APP_ID = process.env.VITE_BACK4APP_APP_ID ?? "";
const JS_KEY = process.env.VITE_BACK4APP_JS_KEY ?? "";
Parse.initialize(APP_ID, JS_KEY);
Parse.serverURL = "https://parseapi.back4app.com/";

interface Kit {
    id: string;
    title: string;
    courses: Course[];
}

interface Course {
    id: string;
    title: string
    yearLevel: string;
    description: string;
    outcomes: string[];
    modules: Module[]; 
    assessments: Assessment[];
    courseImage?: Parse.File;
}


interface Module {
    category: string;
    title: string;
    description: string;
    lessons: string[];
}

interface Assessment {
    category: string;
    title: string;
    printout: Parse.File[];
}

interface Lesson {
    id: string;
    title: string;
    overview: string;
    content: Content[];
}

interface Content {
    title: string;
    description?: string;
    printout: Parse.File;
}

async function uploadFile(filePath: string) {
    const fileData = fs.readFileSync(filePath);
    const fileName = path.basename(filePath);
    const parseFile = new Parse.File(fileName, [...fileData]);

    try {
        await parseFile.save();
        console.log(`File ${fileName} saved successfully`);
    } catch (error) {
        console.error(`Error saving file ${fileName}:`, error);
    }

    return parseFile;
}

async function createLesson(title: string, teacherHandoutPath: string, worksheetPath: string) {
    const teacherHandout = await uploadFile(teacherHandoutPath);
    const worksheet = await uploadFile(worksheetPath);

    const lessonObj = new Parse.Object("lesson");
    lessonObj.set('title', title as any);
    const content: Content[] = [
        {title: "Teacher handout", description: "description", printout: teacherHandout},
        {title: "Worksheet", description: "description", printout: worksheet}
    ];
    lessonObj.set('content', content as any);

    try {
        const savedLesson = await lessonObj.save();
        return savedLesson;
    } catch (error) {
        console.error(`Error saving lesson ${title}:`, error);
    }
}

async function uploadDinoSteps() {
    /* Upload lessons */
    const lessons = [
        {
            title: "DinoSteps - Lesson 1",
            handoutPath: path.join(__dirname, "../assets/dinoSteps/Demonstration copy - Dinosaur Steps Module - Lesson 01 - Teaching Slides.pdf"),
            worksheetPath: path.join(__dirname, "../assets/dinoSteps/Demonstration copy - Dinosaur Steps Module - Student handouts - Lesson 01.pdf")
        },
        {
            title: "DinoSteps - Lesson 2",
            handoutPath: path.join(__dirname, "../assets/dinoSteps/Demonstration copy -  Dinosaur Steps Module - Lesson 02 - Teaching Slides.pdf"),
            worksheetPath: path.join(__dirname, "../assets/dinoSteps/Demonstration copy -  Dinosaur Steps Module - Student handouts - Lesson 02.pdf")
        },
        {
            title: "DinoSteps - Lesson 3",
            handoutPath: path.join(__dirname, "../assets/dinoSteps/Demonstration copy - Dinosaur Steps Module - Lesson 03 - Teaching Slides.pdf"),
            worksheetPath: path.join(__dirname, "../assets/dinoSteps/Demonstration Copy - Dinosaur Steps Module - Student handouts - Lesson 03.pdf")
        }
    ];

    const savedLessons = await Promise.all(lessons.map(lesson =>
        createLesson(lesson.title, lesson.handoutPath, lesson.worksheetPath)
    ));

    /* Upload module */
    const module: Module[] = [{
        category: "Computational Thinking",
        title: "Module 1",
        lessons: savedLessons.map(lesson => lesson.id),
        description: 'This module dives into computational thinking, algorithms and debugging.'
    }];

    /* Upload assessment */
    const assessmentPath = path.join(__dirname, "../assets/dinoSteps/Demonstration copy - Dinosaur Steps formative assessment.pdf");
    const dinoStepsAssessment = await uploadFile(assessmentPath);

    const assessment: Assessment = {
        category: "Computer Science",
        title: "DinoSteps Assessment",
        printout: [dinoStepsAssessment]
    };

    /* Create course */
    const newCourse = new Parse.Object("course");
    newCourse.set("yearLevel", "Beginner" as any);
    newCourse.set("description", 'To create content in programming, students need to develop a sound understanding of ' +
    'computational thinking (CT). In this module students will develop skills and knowledge to ' +
    'support their understanding of CT through unplugged and digital activities.' as any);
    newCourse.set("outcomes", ["A", "B"] as any);
    newCourse.set("modules", module as any);
    newCourse.set("assessments", [assessment] as any);
    newCourse.set("title", "" as any);
    newCourse.set("courseImage", undefined as any);
    const savedCourse = await newCourse.save();

    /* Create kit */
    const newKit = new Parse.Object("kits");
    newKit.set("title", "Dinosaur Steps" as any);
    newKit.set('courses', [savedCourse.id] as any);

    try {
        const result = await newKit.save();
        console.log('Kit object created with objectId:', result.id);
    } catch (error) {
        console.error('Error while creating Kit object:', error);
    }
}

async function uploadDinoLoops() {
    /* Upload lessons */
    const lessons = [
        {
            title: "DinoLoops - Lesson 1",
            handoutPath: path.join(__dirname, "../assets/dinoLoops/Demonstration copy - Dinosaur Loops Module - Lesson 01 - Teaching Slides.pdf"),
            worksheetPath: path.join(__dirname, "../assets/dinoLoops/Demonstration copy- Lesson 01 - Dinosaur Loops Module - Student handouts.pdf")
        },
        {
            title: "DinoLoops - Lesson 2",
            handoutPath: path.join(__dirname, "../assets/dinoLoops/Demonstration copy - Dinosaur Loops Module - Lesson 02 - Teaching Slides.pdf"),
            worksheetPath: path.join(__dirname, "../assets/dinoLoops/Demonstration copy - Lesson 02 - Dinosaur Loops Module - Student handouts.pdf")
        },
        {
            title: "DinoLoops - Lesson 3",
            handoutPath: path.join(__dirname, "../assets/dinoLoops/Demonstration copy -  Dinosaur Loops Module - Lesson 03 - Teaching Slides.pdf"),
            worksheetPath: path.join(__dirname, "../assets/dinoLoops/Demonstration copy - Lesson 03 -  Dinosaur Loops Module - Student handouts.pdf")
        }
    ];

    const savedLessons = await Promise.all(lessons.map(lesson =>
        createLesson(lesson.title, lesson.handoutPath, lesson.worksheetPath)
    ));

    /* Upload module */
    const module: Module[] = [{
        category: "Computational Thinking",
        title: "Module 1",
        lessons: savedLessons.map(lesson => lesson.id),
        description: 'This module dives into computational thinking, algorithms and debugging.'
    }];

    /* Upload assessment */
    const assessmentPath = path.join(__dirname, "../assets/dinoLoops/Demonstration copy - Dinosaur Loops formative assessment.pdf");
    const dinoStepsAssessment = await uploadFile(assessmentPath);

    const assessment: Assessment = {
        category: "Computer Science",
        title: "DinoLoops Assessment",
        printout: [dinoStepsAssessment]
    };

    /* Create course */
    const newCourse = new Parse.Object("course");
    newCourse.set("yearLevel", "Beginner" as any);
    newCourse.set("description", 'To create content in programming, students need to develop a sound understanding of computational thinking (CT). In this module students will develop skills and knowledge to support their understanding of CT through unplugged and digital activities.' as any);
    newCourse.set("outcomes", ["A", "B"] as any);
    newCourse.set("modules", module as any);
    newCourse.set("assessments", [assessment] as any);
    newCourse.set("title", "" as any);
    newCourse.set("courseImage", undefined as any);
    const savedCourse = await newCourse.save();

    /* Create kit */
    const newKit = new Parse.Object("kits");
    newKit.set("title", "Dinosaur Loops" as any);
    newKit.set('courses', [savedCourse.id] as any);

    try {
        const result = await newKit.save();
        console.log('Kit object created with objectId:', result.id);
    } catch (error) {
        console.error('Error while creating Kit object:', error);
    }
}

async function uploadDinoCommands() {
    /* Upload lessons */
    const lessons = [
        {
            title: "DinoCommands - Lesson 1",
            handoutPath: path.join(__dirname, "../assets/dinoCommands/Demonstration Copy - Dinosaur Commands Module - Lesson 01 - Teaching Slides.pdf"),
            worksheetPath: path.join(__dirname, "../assets/dinoCommands/Demonstration Copy - Lesson 01 - Dinosaur Commands Module - Student handouts.pdf")
        },
        {
            title: "DinoCommands - Lesson 2",
            handoutPath: path.join(__dirname, "../assets/dinoCommands/Demonstration Copy - Dinosaur Commands Module - Lesson 02 - Teaching Slides.pdf"),
            worksheetPath: path.join(__dirname, "../assets/dinoCommands/Demonstration Copy - Lesson 02 - Dinosaur Commands Module - Student handouts.pdf")
        },
        {
            title: "DinoCommands - Lesson 3",
            handoutPath: path.join(__dirname, "../assets/dinoCommands/Demonstration Copy -  Dinosaur Commands Module - Lesson 03 - Teaching Slides.pdf"),
            worksheetPath: path.join(__dirname, "../assets/dinoCommands/Demonstration copy - Lesson 03 - Dinosaur Commands Module - Student handouts.pdf")
        }
    ];

    const savedLessons = await Promise.all(lessons.map(lesson =>
        createLesson(lesson.title, lesson.handoutPath, lesson.worksheetPath)
    ));

    /* Upload module */
    const module: Module[] = [{
        category: "Computational Thinking",
        title: "Module 1",
        lessons: savedLessons.map(lesson => lesson.id),
        description: 'This module dives into computational thinking, algorithms and debugging.'
    }];

    /* Upload assessment */
    const assessmentPath = path.join(__dirname, "../assets/dinoCommands/Demonstration Copy - Dinosaur Commands formative assessment.pdf");
    const dinoStepsAssessment = await uploadFile(assessmentPath);

    const assessment: Assessment = {
        category: "Computer Science",
        title: "DinoCommands Assessment",
        printout: [dinoStepsAssessment]
    };

    /* Create course */
    const newCourse = new Parse.Object("course");
    newCourse.set("yearLevel", "Intermediate" as any);
    newCourse.set("description", "To create content in programming, students need to develop a good understanding of computational thinking (CT). In this module, students will develop skills and knowledge to support their understanding of CT through a gamified approach using unplugged and digital activities." as any);
    newCourse.set("outcomes", ["A", "B"] as any);
    newCourse.set("modules", module as any);
    newCourse.set("assessments", [assessment] as any);
    newCourse.set("title", "" as any);
    newCourse.set("courseImage", undefined as any);
    const savedCourse = await newCourse.save();

    /* Create kit */
    const newKit = new Parse.Object("kits");
    newKit.set("title", "Dinosaur Commands" as any);
    newKit.set('courses', [savedCourse.id] as any);

    try {
        const result = await newKit.save();
        console.log('Kit object created with objectId:', result.id);
    } catch (error) {
        console.error('Error while creating Kit object:', error);
    }
}

uploadDinoSteps()
uploadDinoLoops()
uploadDinoCommands()