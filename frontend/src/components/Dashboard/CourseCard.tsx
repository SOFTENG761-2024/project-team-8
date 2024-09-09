import React from "react";
import { Card, Button, Text, Image, Grid, Flex } from "@mantine/core"; // Import necessary Mantine components
import { useMediaQuery } from "@mantine/hooks"; // Import the useMediaQuery hook
import { Course } from "../../pages/DemoDashboard.page";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const isSmallScreen = useMediaQuery("(max-width: 768px)"); // using hook to check if the screen is small

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Grid>
        {/* conditional image rendering (hide on small screens) */}
        {!isSmallScreen && (
          <Grid.Col span={3}>
            <Image
              src={course.image}
              alt="Course Image"
              height={150}
              width={150}
              radius="md"
              style={{ objectFit: "cover" }}
            />
          </Grid.Col>
        )}

        {/* course details and viewbutton on the right side */}
        <Grid.Col span={isSmallScreen ? 12 : 9}>
          <Flex
            direction="column"
            justify="space-between"
            style={{ height: "100%" }}
          >
            <div>
              <Text size="xl">{course.title}</Text>
              <Text color="dark" size="md">
                {course.course}
              </Text>
              <Text size="sm">{course.lessons} Lessons</Text>

              {/* Status ONLY show if course is completed */}
              <Text
                size="xs"
                color={
                  course.status === "Completed" ? "seagreen" : "transparent"
                }
                style={
                  course.status === "Completed"
                    ? {
                        backgroundColor: "aquamarine",
                        display: "inline-block",
                        padding: "6px",
                        borderRadius: "30px",
                      }
                    : { display: "inline" }
                }
              >
                {course.status === "Completed" ? course.status : "."}
              </Text>
            </div>

            {/* View Button positioned at the bottom-right */}
            <Button mt="md" variant="outline">
              View
            </Button>
          </Flex>
        </Grid.Col>
      </Grid>
    </Card>
  );
};

export default CourseCard;
