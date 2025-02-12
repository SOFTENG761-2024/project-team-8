import { Box, Button, Card, Flex, Grid, Image, Text } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconEye } from "@tabler/icons-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Course } from "../../pages/Dashboard.page";
import styles from "./CourseCard.module.css";
import CoursePreviewModal from "./CoursePreviewModal";
import CourseTag from "./CourseTag";

interface CourseCardProps {
  course: Course;
  isBookmarked?: boolean;
  isComplete?: boolean;
  unsubscribed: boolean;
}

/**
 * @component
 * CourseCard
 *
 * This component is for the course card section of the dashboard page,
 * displaying course details and a view button
 * 
 * @param {object} course - Course object containing course details
 * @param {boolean} isBookmarked - True if the course is bookmarked, false otherwise
 * @param {boolean} isComplete - True if the course is complete, false otherwise
 * @param {boolean} unsubscribed - True if the user is unsubscribed, false otherwise
 * @returns {JSX.Element}
 */
const CourseCard: React.FC<CourseCardProps> = ({
  course,
  unsubscribed,
  isBookmarked = false,
  isComplete = false,
}) => {
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const [isHovered, setIsHovered] = useState(false);
  const [opened, { open, close }] = useDisclosure(false); 
  const navigate = useNavigate();

  return (
    <>
      <CoursePreviewModal course={course} opened={opened} onClose={close} />
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
              <Text
                size="xl"
                fw={700}
                c="primary.5"
                truncate={isSmallScreen && "end"}
              >
                {course.title}
              </Text>
              <Text
                c="primary.4"
                fw={500}
                size="md"
                truncate={isSmallScreen && "end"}
              >
                {course.kitName}
              </Text>
              <Text size="sm" c="gray">
                {course.lessons} Lessons
              </Text>
              {/* COURSE TAGS */}
              <Flex
                gap="0.25rem"
                mt="0.25rem"
                direction={isSmallScreen ? "column" : "row"}
              >
                {isComplete && <CourseTag variant="complete" />}
                {isBookmarked && <CourseTag variant="bookmark" />}
              </Flex>
            </Box>
          </Grid.Col>
        </Grid>
        {/* View Button positioned at the bottom-right */}
        <Button
          variant="filled"
          tt="capitalize"
          bg="var(--mantine-color-primary-5)"
          style={{
            position: !isSmallScreen ? "absolute" : "static",
            bottom: "1rem",
            right: "1rem",
          }}
          onClick={() =>
            unsubscribed ? open() : navigate(`/user/courses/${course.id}`)
          }
          leftSection={<IconEye />}
        >
          {unsubscribed ? "Preview" : "View"}
        </Button>
      </Card>
    </>
  );
};

export default CourseCard;
