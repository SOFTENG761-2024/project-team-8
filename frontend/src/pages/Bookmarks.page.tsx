import { Box } from '@mantine/core';
import { useContext, useEffect, useState } from 'react'
import CourseCardCollection from '../components/Dashboard/CourseCardCollection';
import { AuthContext } from '../context/AuthContextProvider';
import Parse from '../../parseconfig';

// defininng the Course type and create some dummy data (same as Dashboard.page.tsx)
export interface Course {
    id: string | number;
    title: string;
    kitName: string;
    lessons: number;
    status: string;
    image: Parse.File;
}

const BookmarksPage = () => {
    const [bookmarkedCourses, setBookmarkedCourses] = useState<Course[]>([]);
    const { currentUserData } = useContext(AuthContext);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchBookmarkedCourses = async () => {
            if (!currentUserData) {
                console.log("User not logged in");
                return;
            }

            try {
                const results = await Parse.Cloud.run("getBookmarkedCourses", {
                    userId: currentUserData.id, // Pass userId from current user data
                });

                // Map the results and handle Parse.File for the image field
                const mappedCourses: Course[] = results.map((course: any) => ({
                    id: course.id,
                    title: course.title,
                    kitName: course.kitName,
                    lessons: course.lessons,
                    status: course.status,
                    image: course.image ? new Parse.File(course.image.name, { uri: course.image._url }) : null,
                }));
                console.log("Mapped courses:", mappedCourses);
                setBookmarkedCourses(mappedCourses);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching bookmarked courses:", error);
                setLoading(false);
            }
        };

        fetchBookmarkedCourses();
    }, [currentUserData]);

    if (loading) {
        return <Box>Loading...</Box>;
    }

    return (
        <Box>
            {bookmarkedCourses.length > 0 ? (
                <CourseCardCollection courses={bookmarkedCourses} />
            ) : (
                <Box>No bookmarked courses found</Box>
            )}
        </Box>
    );
};

export default BookmarksPage;