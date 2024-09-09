import React from "react";
import { Card, Button, Text, Image, Grid, Flex } from "@mantine/core"; // Import necessary Mantine components
import { useMediaQuery } from "@mantine/hooks"; // Import the useMediaQuery hook
import { Course } from "../../pages/DemoDashboard.page";
import { IconEye } from "@tabler/icons-react";
import { IconAward } from "@tabler/icons-react";

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
              <Text c="dark" size="md">
                {course.course}
              </Text>
              <Text size="sm">{course.lessons} Lessons</Text>

              {/* Status ONLY show if course is completed */}
              <Text
                size="xs"
                color={
                  course.status === "Completed" ? "seagreen" : "transparent"
                }
                m={2}
                style={
                  course.status === "Completed"
                    ? {
                        backgroundColor: "aquamarine",
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "0.2rem 0.4rem",
                        borderRadius: "30px",
                      }
                    : { display: "inline" }
                }
              >
                {course.status === "Completed" ? (
                  <span
                    style={{ display: "inline-flex", alignItems: "center" }}
                  >
                    <IconAward style={{ marginRight: "4px" }} />{" "}
                    {/* Adjust margin if needed */}
                    {course.status}
                  </span>
                ) : (
                  "."
                )}
              </Text>
            </div>

            {/* View Button positioned at the bottom-right */}
            <Button mt="md" variant="outline">
              <IconEye /> View
            </Button>
          </Flex>
        </Grid.Col>
      </Grid>
    </Card>
  );
};

export default CourseCard;
