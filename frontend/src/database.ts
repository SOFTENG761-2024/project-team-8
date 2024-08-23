import {Assessment, Content, Module} from './interfaces/kit.ts';
import Parse from "../parseconfig.ts"
export async function startup(fileContent: Uint8Array) {
    const file1 = new Parse.File("file1.pdf", Array.from(fileContent));  // Assuming `fileInput` is an input element
    //const file2 = new Parse.File("file2.pdf", Array.from(fileContent));
    console.log("file content: " + fileContent)
    console.log(Array.from(fileContent))
    console.log("File1: " + file1)

    try {
        await file1.save();
        console.log('File saved successfully');
    } catch (error) {
        console.error('Error saving file:', error);
    }

    // new lesson
    const newLesson = new Parse.Object("lesson");
    newLesson.set('title', "Test Lesson");
    const content: Content[] = [
        {
            text: "Content",
            printout: file1
        }
    ];
    newLesson.set('content', content)
    const savedLesson = await newLesson.save()

    //modules
    const module: Module[]=[{
        category: "test",
        title: "awesome module",
        lessons: [savedLesson.id],
        description: 'module moment'
    }]

    //assessment
    const assessment: Assessment = {
        category: "test assessment",
        title: "Asessed moment",
        printout: [file1]
    }

    // new course
    const newCourse = new Parse.Object("course");
    newCourse.set("yearLevel", 2)
    newCourse.set("description", "blah blah")
    newCourse.set("outcomes", ["test"])
    newCourse.set("modules",module )
    newCourse.set("assessments",[assessment])
    const savedCourse = await newCourse.save()

    const newKit = new Parse.Object("kits");
    newKit.set("title", "Test Kit");
    newKit.set('courses', [savedCourse.id]);
    newKit.save()
        .then((result) => {
            console.log('Kit object created with objectId:', result.id);
        })
        .catch((error) => {
            console.error('Error while creating Kit object:', error);
        });
}

export async function grabstuff(){

   // const query = new Parse.Query('YourClassName');

}