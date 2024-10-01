import { Box, Text } from '@mantine/core';
import { useContext, useEffect, useState } from 'react'
import CourseCardCollection from '../components/Dashboard/CourseCardCollection';
import { AuthContext } from '../context/AuthContextProvider';
import Parse from '../../parseconfig';
import { Course } from './Dashboard.page';

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
                    userId: currentUserData.id,
                });

                const mappedCourses: Course[] = results.map((course: any) => ({
                    id: course.id,
                    title: course.title,
                    kitName: course.kitName,
                    lessons: course.lessons,
                    image: course.image as Parse.File,
                }));

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
                <Text>No bookmarked courses found</Text>
            )
            }
        </Box >
    );
};

export default BookmarksPage;