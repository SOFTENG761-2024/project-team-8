import React, { useState } from "react";
import { Box, Button, Card, Chip, Grid, Image, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Course } from "../../pages/Dashboard.page";
import { IconBookmarkFilled, IconEye } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import styles from "./CourseCard.module.css";

interface CourseCardProps {
  course: Course;
  isBookmarked: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, isBookmarked }) => {
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
        padding="sm"
        radius="lg"
        withBorder
        className={`${styles.card} ${isHovered ? styles.cardHovered : styles.cardDefault}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Grid align="start" style={{ height: "100%" }}>
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
                src={course.image._url}
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
            <Box className={styles.courseDetails}>
              <Text size="xl" fw={700} c="primary.5">
                {course.title}
              </Text>
              <Text c="primary.4" fw={500} size="md">
                {course.kitName}
              </Text>
              <Text size="sm" c="gray">
                {course.lessons} Lessons
              </Text>
              {isBookmarked && (<Chip mt={5} icon={< IconBookmarkFilled size={14} />} defaultChecked color="pink" variant="light" size="xs"><Text size="xs" fw={700}>Bookmarked</Text></Chip>)}
            </Box>
          </Grid.Col>
        </Grid>
        {/* View Button positioned at the bottom-right */}
        <Button
          variant="filled"
          bg="var(--mantine-color-primary-5)"
          style={{
            position: !isSmallScreen ? "absolute" : "static",
            bottom: "20px",
            right: "20px",
          }}
        >
          <IconEye style={{ marginRight: "8px" }} /> View
        </Button>
      </Card>
    </Link >
  );
};

export default CourseCard;
