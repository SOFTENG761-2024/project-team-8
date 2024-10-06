import { Dispatch, SetStateAction, useContext, useState } from "react";
import classes from "./CourseSummary.module.css";
import {
  IconAwardFilled,
  IconBulbFilled,
  IconChevronLeft,
  IconChevronRight,
  IconFileDescription,
  IconInfoSquareFilled,
  IconStarFilled,
  IconUserFilled,
} from "@tabler/icons-react";
import {
  Accordion,
  ActionIcon,
  Image,
  List,
  Text,
  Tooltip,
} from "@mantine/core";
import { CourseSummaryTopic } from "../../interfaces/componentInterfaces.ts";
import { CourseContext } from "../Course/CourseContext.tsx";

interface CourseSummaryProps {
  summaryExpanded: boolean;
  setSummaryExpanded: Dispatch<SetStateAction<boolean>>;
}

export const CourseSummary = ({
  summaryExpanded,
  setSummaryExpanded,
}: CourseSummaryProps) => {
  const toggleCourseSummary = () => {
    setSummaryExpanded(!summaryExpanded);
  };

  return (
    <div className={classes.courseSummaryContainer}>
      <CourseSummaryBase isExpanded={summaryExpanded} />
      <Tooltip
        multiline
        w={"130"}
        label={
          summaryExpanded ? "Collapse Course Summary" : "Expand Course Summary"
        }
        transitionProps={{ transition: "fade-right", duration: 250 }}
        position="right"
        color="neutral.5"
        offset={10}
      >
        <ActionIcon
          variant="filled"
          color="secondary.6"
          className={`${classes.collapseButton} ${summaryExpanded ? "" : classes.collapseButtonExpanded}`}
          onClick={toggleCourseSummary}
        >
          {summaryExpanded ? (
            <IconChevronLeft className={classes.icon} stroke={3} />
          ) : (
            <IconChevronRight className={classes.icon} stroke={3} />
          )}
        </ActionIcon>
      </Tooltip>
    </div>
  );
};

interface CourseSummaryBaseProps {
  isExpanded: boolean;
}

const CourseSummaryBase = ({ isExpanded }: CourseSummaryBaseProps) => {
  const { currentCourseData } = useContext(CourseContext);
  return (
    <div
      className={`${classes.courseSummaryWrapper} ${isExpanded ? "" : classes.collapsed}`}
    >
      <div className={classes.courseSummary}>
        <Image
          h={300}
          src={currentCourseData?.courseImage?._url}
          radius="10px"
        />
        <CourseAttributes />
        <SummaryAccordion topics={SummaryTopics()} isExpanded={isExpanded} />
      </div>
    </div>
  );
};

const CourseAttributes = () => {
  const { currentCourseData } = useContext(CourseContext);
  return (
    <div className={classes.courseHighlights}>
      <div className={classes.item}>
        <IconStarFilled />
        <Text size="textSm">{currentCourseData?.yearLevel}</Text>
      </div>
      <div className={classes.item}>
        <IconAwardFilled />
        <Text size="textSm">Certificate of Completion</Text>
      </div>
    </div>
  );
};

const SummaryTopics = () => {
  const { currentCourseData } = useContext(CourseContext);
  return [
    {
      value: "About Course",
      icon: <IconInfoSquareFilled />,
      information: currentCourseData?.description || "",
    },
    {
      value: "Learning Outcomes",
      icon: <IconBulbFilled />,
      informationList: currentCourseData?.outcomes || [],
    },
    {
      value: "Materials Include",
      icon: <IconFileDescription />,
      informationList: [
        "A full comprehensive guide for teachers",
        "Print-outs and activities",
        "Posters",
        "Cut-out resources",
      ],
    },
    {
      value: "Audience",
      icon: <IconUserFilled />,
      information: "Teachers or Tutors",
    },
  ];
};

interface SummaryAccordionProps {
  topics: CourseSummaryTopic[];
  isExpanded: boolean;
}

const SummaryAccordion = ({ topics, isExpanded }: SummaryAccordionProps) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const summaryItems = topics.map((topic) => (
    <Accordion.Item
      key={topic.value}
      value={topic.value}
      className={classes.item}
    >
      <Accordion.Control icon={topic.icon} c="neutral.5">
        {topic.value}
      </Accordion.Control>
      <Accordion.Panel c="neutral.5">
        {topic.information}
        {topic.informationList && (
          <List>
            {topic.informationList.map((listItem) => (
              <List.Item key={listItem}>{listItem}</List.Item>
            ))}
          </List>
        )}
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Accordion
      className={classes.accordionRoot}
      value={!isExpanded ? "" : expandedItem}
      onChange={setExpandedItem}
    >
      {summaryItems}
    </Accordion>
  );
};
