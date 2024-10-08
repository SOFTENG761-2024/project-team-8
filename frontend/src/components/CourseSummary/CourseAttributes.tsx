import { IconAwardFilled, IconStarFilled } from "@tabler/icons-react";
import styles from "./CourseAttributes.module.css";
import { Box, Text } from "@mantine/core";
import { FC } from "react";

interface CourseAttributesProps {
  yearLevel?: string;
  isCertificateAvailable?: boolean;
  variant?: "small" | "medium";
}
/**
 * @component
 * CourseAttributes
 *
 * This component is rendered within the CourseSummary and CoursePreviewModal components displaying
 * relevant attributes of courses for users.
 *
 * @param props The component accepts {@link CourseAttributesProps}
 * @param props.yearlevel - optional string stating the course's year level.
 * @param props.isCertificateAvailable - optional boolean indicating if the course has a certficate for completion.
 * @param props.variant - optional prop defining the size of the component. medium by default.
 * @returns {JSX.Element}
 */
const CourseAttributes: FC<CourseAttributesProps> = ({
  yearLevel,
  isCertificateAvailable,
  variant = "medium",
}): JSX.Element => {
  return (
    <>
      {/* only render the component if at least one attribute can be displayed */}
      {(yearLevel || isCertificateAvailable) && (
        <Box
          className={`${styles.courseHighlights} ${variant === "small" ? styles.small : ""}`}
        >
          <Box className={styles.item}>
            <IconStarFilled size="1.3rem" />
            <Text size="textSm">{yearLevel}</Text>
          </Box>
          {isCertificateAvailable && (
            <Box className={styles.item}>
              <IconAwardFilled size="1.4rem" />
              <Text size="textSm">Certificate of Completion</Text>
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default CourseAttributes;
