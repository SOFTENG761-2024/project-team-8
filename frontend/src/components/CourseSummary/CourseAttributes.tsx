import { IconAwardFilled, IconStarFilled } from "@tabler/icons-react";
import classes from "./CourseAttributes.module.css";
import { Text } from "@mantine/core";
import { FC } from "react";

interface CourseAttributesProps {
  yearLevel: string | undefined;
}
const CourseAttributes: FC<CourseAttributesProps> = ({ yearLevel }) => {
  return (
    <div className={classes.courseHighlights}>
      <div className={classes.item}>
        <IconStarFilled />
        <Text size="textSm">{yearLevel}</Text>
      </div>
      <div className={classes.item}>
        <IconAwardFilled />
        <Text size="textSm">Certificate of Completion</Text>
      </div>
    </div>
  );
};

export default CourseAttributes;
