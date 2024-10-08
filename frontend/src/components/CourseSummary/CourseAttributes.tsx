import { IconAwardFilled, IconStarFilled } from "@tabler/icons-react";
import styles from "./CourseAttributes.module.css";
import { Text } from "@mantine/core";
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
 * @param props.variant - optional prop, defunction controlling the closed behaviour of the modal.
 * @returns {JSX.Element}
 */
const CourseAttributes: FC<CourseAttributesProps> = ({
  yearLevel,
  isCertificateAvailable,
  variant = "medium",
}): JSX.Element => {
  return (
    <>
      {/* only render this component if at least one attribute can be displayed */}
      {(yearLevel || isCertificateAvailable) && (
        <div
          className={`${styles.courseHighlights} ${variant === "small" ? styles.small : styles.medium}`}
        >
          <div className={styles.item}>
            <IconStarFilled />
            <Text size="textSm">{yearLevel}</Text>
          </div>
          {isCertificateAvailable && (
            <div className={styles.item}>
              <IconAwardFilled />
              <Text size="textSm">Certificate of Completion</Text>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CourseAttributes;
