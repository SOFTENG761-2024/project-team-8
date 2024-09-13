import {FC} from "react";
import classes from "./CourseSummary.module.css";
import testImage from "../../assets/organic-crops-test.png"
import {
  IconStarFilled,
  IconAwardFilled
} from "@tabler/icons-react";
import {Text} from "@mantine/core";

interface CourseSummaryProps {

}

export const CourseSummary: FC<CourseSummaryProps> = () => {
  return (
    <div className={classes.courseSummary}>
      <img className={classes.courseImage} src={testImage}/>
      <div className={classes.courseHighlights}>
        <div className={classes.item}>
          <IconStarFilled/>
          <Text>Easy</Text>
        </div>
        <div className={classes.item}>
          <IconAwardFilled/>
          <Text>Certificate of Completion</Text>
        </div>
      </div>

    </div>
  )

}