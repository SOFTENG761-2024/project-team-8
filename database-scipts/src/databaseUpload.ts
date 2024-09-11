
const path = require("path");
const fs = require( "fs");
const Parse = require('parse/node');
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
    yearLevel: number;
    description:string;
    outcomes:string[];
    modules: string[]; // references to those objects
    assessments: Assessment[];
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
    content: Content[];
}

 interface Content{
    text: string;
    printout: Parse.File;
}

export async function uploadDinoSteps() {
    /*----------------------------------- Lesson 1 Upload -----------------------------------*/
    const Lesson1pdf = "/Users/manavlal/Documents/GitHub/project-team-8/frontend/assets/dinoSteps/Demonstration copy - Dinosaur Steps Module - Lesson 01 - Teaching Slides.pdf";
    const fileData_L1 = fs.readFileSync(Lesson1pdf);
    const fileName_L1 = path.basename(Lesson1pdf);

    const Lesson1pdf_worksheet = "/Users/manavlal/Documents/GitHub/project-team-8/frontend/assets/dinoSteps/Demonstration copy - Dinosaur Steps Module - Student handouts - Lesson 01.pdf";
    const fileData_worksheet_L1 = fs.readFileSync(Lesson1pdf_worksheet);
    const fileName_worksheet_L1 = path.basename(Lesson1pdf_worksheet);

    const Lesson1 = new Parse.File(fileName_L1, [...fileData_L1]);
    const Lesson1_worksheet = new Parse.File(fileName_worksheet_L1, [...fileData_worksheet_L1]);

    try {
        await Lesson1.save();
        await Lesson1_worksheet.save();
        console.log('File saved successfully');
    } catch (error) {
        console.error('Error saving file:', error);
    }

    const Lesson1Obj = new Parse.Object("lesson");
    Lesson1Obj.set('title', "Lesson1" as any);
    const contentL1: Content[] = [
        { text: "Teacher_handout", printout: Lesson1 },
        { text: "Worksheet", printout: Lesson1_worksheet }
    ];
    Lesson1Obj.set('content', contentL1 as any);
    const savedLesson1 = await Lesson1Obj.save();

    /*----------------------------------- Lesson 2 Upload -----------------------------------*/
    const Lesson2pdf = "/Users/manavlal/Documents/GitHub/project-team-8/frontend/assets/dinoSteps/Demonstration copy -  Dinosaur Steps Module - Lesson 02 - Teaching Slides.pdf";
    const fileData_L2 = fs.readFileSync(Lesson2pdf);
    const fileName_L2 = path.basename(Lesson2pdf);

    const Lesson2pdf_worksheet = "/Users/manavlal/Documents/GitHub/project-team-8/frontend/assets/dinoSteps/Demonstration copy -  Dinosaur Steps Module - Student handouts - Lesson 02.pdf";
    const fileData_worksheet_L2 = fs.readFileSync(Lesson2pdf_worksheet);
    const fileName_worksheet_L2 = path.basename(Lesson2pdf_worksheet);

    const Lesson2 = new Parse.File(fileName_L2, [...fileData_L2]);
    const Lesson2_worksheet = new Parse.File(fileName_worksheet_L2, [...fileData_worksheet_L2]);

    try {
        await Lesson2.save();
        await Lesson2_worksheet.save();
        console.log('File saved successfully');
    } catch (error) {
        console.error('Error saving file:', error);
    }

    const Lesson2Obj = new Parse.Object("lesson");
    Lesson2Obj.set('title', "Lesson2" as any); // Fixed title to "Lesson2"
    const contentL2: Content[] = [
        { text: "Teacher_handout", printout: Lesson2 },
        { text: "Worksheet", printout: Lesson2_worksheet }
    ];
    Lesson2Obj.set('content', contentL2 as any);
    const savedLesson2 = await Lesson2Obj.save();

    /*----------------------------------- Lesson 3 Upload -----------------------------------*/
    const Lesson3pdf = "/Users/manavlal/Documents/GitHub/project-team-8/frontend/assets/dinoSteps/Demonstration copy - Dinosaur Steps Module - Lesson 03 - Teaching Slides.pdf";
    const fileData_L3 = fs.readFileSync(Lesson3pdf);
    const fileName_L3 = path.basename(Lesson3pdf);

    const Lesson3pdf_worksheet = "/Users/manavlal/Documents/GitHub/project-team-8/frontend/assets/dinoSteps/Demonstration Copy - Dinosaur Steps Module - Student handouts - Lesson 03.pdf";
    const fileData_worksheet_L3 = fs.readFileSync(Lesson3pdf_worksheet);
    const fileName_worksheet_L3 = path.basename(Lesson3pdf_worksheet);

    const Lesson3 = new Parse.File(fileName_L3, [...fileData_L3]);
    const Lesson3_worksheet = new Parse.File(fileName_worksheet_L3, [...fileData_worksheet_L3]);

    try {
        await Lesson3.save();
        await Lesson3_worksheet.save();
        console.log('File saved successfully');
    } catch (error) {
        console.error('Error saving file:', error);
    }

    const Lesson3Obj = new Parse.Object("lesson");
    Lesson3Obj.set('title', "Lesson3" as any); // Fixed title to "Lesson3"
    const contentL3: Content[] = [
        { text: "Teacher_handout", printout: Lesson3 },
        { text: "Worksheet", printout: Lesson3_worksheet }
    ];
    Lesson3Obj.set('content', contentL3 as any);
    const savedLesson3 = await Lesson3Obj.save();

    /*----------------------------------- Modules -----------------------------------*/
    const module: Module[] = [
        {
            category: "Computational Thinking",
            title: "Module 1",
            lessons: [savedLesson1.id, savedLesson2.id, savedLesson3.id],
            description: 'This module dives into computational thinking, algorithms and debugging.'
        }
    ];

    /*----------------------------------- Assessment -----------------------------------*/
    const dinosaurStepAssessment = "/Users/manavlal/Documents/GitHub/project-team-8/frontend/assets/dinoSteps/Demonstration copy - Dinosaur Steps formative assessment (NZC).pdf";
    const dinosaurStepAssessmentData = fs.readFileSync(dinosaurStepAssessment);
    const dinosaurStepAssessmentName = path.basename(dinosaurStepAssessment);

    const dinostepassessment = new Parse.File("dinoSteps assessment", [...dinosaurStepAssessmentData]);
    try {
        await dinostepassessment.save();
    } catch (error) {
        console.error('Error saving file:', error);
    }

    const assessment: Assessment = {
        category: "Computer Science",
        title: "DinoSteps Assessment",
        printout: [dinostepassessment]
    };

    /*----------------------------------- Course -----------------------------------*/
    const newCourse = new Parse.Object("course");
    newCourse.set("yearLevel", 2 as any);
    newCourse.set("description", 'To create content in programming, students need to develop a sound understanding of ' +
        'computational thinking (CT). In this module students will develop skills and knowledge to ' +
        'support their understanding of CT through unplugged and digital activities.' as any);
    newCourse.set("outcomes", ["A", "B"] as any);
    newCourse.set("modules", module as any);
    newCourse.set("assessments", [assessment] as any);
    const savedCourse = await newCourse.save();

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
uploadDinoSteps()