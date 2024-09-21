import {useParams} from "react-router-dom";
import {Box, Group, Text, Title} from "@mantine/core";
import CourseContent from "../components/Course/CourseContent";
import {CourseSummary} from "../components/CourseSummary/CourseSummary.tsx";
import {useEffect, useState} from "react";
import Parse from "../../parseconfig.ts";
import {Course} from "../interfaces/kit.ts";

export interface CoursePage extends Course {
    num_lessons: number,
    kit: string,
}

const CoursePage = () => {
    const {courseId} = useParams();
    const [course, setCourse] = useState<CoursePage | null>(null);
    const [summaryExpanded, setSummaryExpanded] = useState<boolean>(true);
    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const results = await Parse.Cloud.run("getCourse", {
                    courseId: courseId
                });
                setCourse(results);
            } catch (error) {
                console.log(error)
            }
        }
        fetchCourseData()
    }, [])
    return (
        <Box h="100%" w="100%">
            <Title order={3} c="primary.5">
                {course?.title + " "}
                <Text inherit span c="primary.3">
                    - {course?.kit}
                </Text>
            </Title>
            <Group justify="space-between" align="top" h="100%" mt="1rem">
                <Box h="100%">
                    <CourseSummary
                        course={course}
                        summaryExpanded={summaryExpanded}
                        setSummaryExpanded={setSummaryExpanded}
                    />
                </Box>
                <CourseContent course={course} summaryExpanded={summaryExpanded}/>
            </Group>
        </Box>
    );
};

export default CoursePage;
