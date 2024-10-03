import React, { useState } from "react";
import { Box, Button, Card, Grid, Image, Modal, Stack, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Course } from "../../pages/Dashboard.page";
import { IconEye } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import styles from "./CourseCard.module.css";

interface CourseCardProps {
  course: Course;
  unsubscribed: Boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, unsubscribed }) => {
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const [isHovered, setIsHovered] = useState(false);
  const [opened, setOpened] = useState(false);

  return (
    <Box>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <Stack>
          <Image
              src={course.image._url}
              alt="Course Image"
              height={150}
              width={150}
              radius="md"
              style={{ objectFit: "cover" }}
            />
          <Text size="xl" fw={700} c="primary.5">
            {course.title}
          </Text>
          <Text c="primary.4" fw={500} size="md">
            {course.kitName}
          </Text>
          <Text size="sm" c="gray" style={{ paddingTop: "1.5rem" }}>
            Description:
          </Text>
          <Text size="sm" c="gray">
            {course?.description || "No description available"}
          </Text>
        </Stack>
      </Modal>

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
              {unsubscribed && 
                <Text size="sm" c="red">
                  Contact us to subscribe to this content!
                </Text>
              }
            </Box>
          </Grid.Col>
        </Grid>
        {/* View Button positioned at the bottom-right */}
        {unsubscribed ? (
          <Button
            variant="filled"
            bg="var(--mantine-color-primary-5)"
            style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
            }}
            onClick={() => setOpened(true)}
          >
            <IconEye style={{ marginRight: "8px" }} /> Preview
          </Button>
        ) : (
          <Link
            to={`/user/courses/${course.id}`}
            style={{ textDecoration: "none" }}
            // state={{ course }} // if we want to pass the course data to the next page
          >
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
          </Link>
        )}
      </Card>
    </Box>
  );
};

export default CourseCard;
