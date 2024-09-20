import { Dispatch, SetStateAction, useState } from "react";
import classes from "./CourseSummary.module.css";
import testImage from "../../assets/organic-crops-test.png";
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
import { Accordion, ActionIcon, Image, List, Text, Tooltip } from "@mantine/core";
import { CourseSummaryTopic } from "../../interfaces/componentInterfaces.ts";

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
      <Tooltip multiline w={"130"} label={summaryExpanded ? "Collapse Course Summary" : "Open Course Summary"} transitionProps={{ transition: 'fade-right', duration: 250 }} position="right" color="neutral.5" offset={10}>
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
      </Tooltip >
    </div >
  );
};

interface CourseSummaryBaseProps {
  isExpanded: boolean;
}

const CourseSummaryBase = ({ isExpanded }: CourseSummaryBaseProps) => {
  return (
    <div
      className={`${classes.courseSummaryWrapper} ${isExpanded ? "" : classes.collapsed}`}
    >
      <div className={classes.courseSummary}>
        <Image h={300} src={testImage} radius="10px" />
        <CourseAttributes />
        <SummaryAccordion topics={summaryTopicsTest} isExpanded={isExpanded} />
      </div>
    </div>
  );
};

const CourseAttributes = () => {
  return (
    <div className={classes.courseHighlights}>
      <div className={classes.item}>
        <IconStarFilled />
        <Text size="textSm">Beginner</Text>
      </div>
      <div className={classes.item}>
        <IconAwardFilled />
        <Text size="textSm">Certificate of Completion</Text>
      </div>
    </div>
  );
};

const summaryTopicsTest = [
  {
    value: "About Course",
    icon: <IconInfoSquareFilled />,
    information:
      "On this page you will find teaching and learning ideas and activities in the context of farming and agriculture. Continue to teach digital technologies with the kit (use the ideas from the PCL computational thinking page) and/or explore further ideas for integrating curriculum subjects.\n" +
      "\n" +
      "These activity ideas build on the suggestions from the Dinosaur Steps Farm Teaching resources.\n" +
      "\n" +
      "Many activities link to a range of subjects, including computer science. The icons denote links to computational concepts and ideas:",
    informationList: [
      "Use the ByteEd app to explore the theme",
      "Decomposition",
      "Algorithmic Thinking",
      "Logical Thinking",
      "Pattern Recognition",
      "Abstraction",
      "Debugging",
    ],
  },
  {
    value: "Learning Outcomes",
    icon: <IconBulbFilled />,
    informationList: [
      "Crops and Plant Products",
      "The different use cases of crops",
      "Biofuel produciton and uses",
      "Bees and Bee keeping",
      "Agriculture Technologies",
      "Animals in Agriculture",
      "Decomposition",
      "Algorithmic Thinking",
      "Logical Thinking",
      "Pattern recognition",
      "Abstraction",
      "Debugging",
    ],
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
