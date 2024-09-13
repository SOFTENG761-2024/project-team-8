import React, { useState } from "react";
import { Card, Button, Text, Image, Grid, Flex } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Course } from "../../pages/Dashboard.page";
import { IconEye, IconAward } from "@tabler/icons-react";
import { Link } from "react-router-dom";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={`/user/courses/${course.id}`}
      style={{ textDecoration: "none" }}
      // state={{ course }} // if we want to pass the course data to the next page
    >
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          cursor: "pointer",
          position: "relative",
          boxShadow: isHovered
            ? "0 8px 24px rgba(0, 0, 0, 0.18)"
            : "0 4px 12px rgba(0, 0, 0, 0.1)",
          transition: "box-shadow 0.25s ease-in-out",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Grid align="center" style={{ height: "100%" }}>
          {/* Conditional image rendering (bigger size and centered) */}
          {!isSmallScreen && (
            <Grid.Col
              span={3}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
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
          {/* Course details */}
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
                {/* Status Badge (only for completed courses) */}
                {course.status === "Completed" && !isSmallScreen && (
                  <Text
                    size="xs"
                    color="seagreen"
                    mt={20}
                    style={{
                      backgroundColor: "aquamarine",
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "30px",
                    }}
                  >
                    <IconAward style={{ marginRight: "4px" }} />
                    {course.status}
                  </Text>
                )}
              </div>
            </Flex>
          </Grid.Col>
        </Grid>
        {/* View Button positioned at the bottom-right */}
        <Button
          variant="filled"
          bg="blue"
          style={{
            position: "absolute",
            bottom: "16px",
            right: "16px",
          }}
        >
          <IconEye style={{ marginRight: "8px" }} /> View
        </Button>
      </Card>
    </Link>
  );
};

export default CourseCard;
