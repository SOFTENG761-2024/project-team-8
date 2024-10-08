import { Flex, Image, Modal, ModalProps, Stack, Text } from "@mantine/core";
import { FC } from "react";
import { Course } from "../../pages/Dashboard.page";
import CourseAttributes from "../CourseSummary/CourseAttributes";
import styles from "./CourseSummaryModal.module.css";
import { useMediaQuery } from "@mantine/hooks";

interface CourseSummaryModalProps extends ModalProps {
  course: Course;
  opened: boolean;
  onClose: () => void;
}

/**
 * @component
 * CourseSummaryModal
 *
 * @description
 * This component is conditionally rendered within the {@link CourseCard} component if the card
 * is used for course preview (in the browse courses page)
 *
 * @param props The component accepts {@link CourseSummaryModalProps}
 * @param props.course - {@link Course} object data
 * @param props.opened - boolean indicating open or closed state of the modal
 * @param props.onClose - function controlling the closed behaviour of the modal
 * @returns {JSX.Element}
 */
const CourseSummaryModal: FC<CourseSummaryModalProps> = ({
  course,
  opened,
  onClose,
}): JSX.Element => {
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Text size="1.7rem" fw={800} c="primary.4" py="0.25rem" pl="1rem">
          Course Preview
        </Text>
      }
      centered
      radius="1rem"
      size={isSmallScreen ? "md" : "xl"}
      classNames={{
        header: styles.styledHeader,
        body: styles.styledBody,
      }}
      closeButtonProps={{ size: "xl" }}
    >
      <Flex
        direction={isSmallScreen ? "column" : "row"}
        justify="space-between"
        align="flex-start"
        gap="1.5rem"
      >
        <Image
          src={course.image._url}
          alt="Course Image"
          radius="lg"
          h={isSmallScreen ? "auto" : "18rem"}
          w={isSmallScreen ? "100%" : "50%"}
        />
        <Stack gap="0.1rem" h="17rem">
          <Text size="1.4rem" fw={800} c="primary.5" mb="0.5rem">
            {course.title}
          </Text>
          <Text size="1rem" fw={400} c="neutral.5" mb="0.5rem">
            {course.kitName}
          </Text>
          <Text size="sm" fw={400} c="neutral.4" mb="0.5rem">
            {course.lessons} Lessons
          </Text>
          <CourseAttributes yearLevel={course.yearLevel} />
          <Text size="sm" fw={500} c="primary.3" mt="0.6rem">
            Description
          </Text>
          <Text size="sm" c="neutral.5" mt="0.2rem">
            {course?.description || "No description available"}
          </Text>
        </Stack>
      </Flex>
    </Modal>
  );
};

export default CourseSummaryModal;
