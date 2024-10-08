import { Image, Modal, ModalProps, Stack, Text } from "@mantine/core";
import { FC } from "react";
import { Course } from "../../pages/Dashboard.page";

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
  return (
    <Modal opened={opened} onClose={onClose}>
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
  );
};

export default CourseSummaryModal;
