import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
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
import { CourseContext } from "../Course/CourseContext.tsx";

/* CourseSummary prop types */
interface CourseSummaryProps {
  summaryExpanded: boolean;
  setSummaryExpanded: Dispatch<SetStateAction<boolean>>;
}

/**
 * This component contains the information components of the course and collapsing functionality of the component
 *
 * @param {boolean} summaryExpanded - True if the CourseSummary is in expanded form, false otherwise
 * @param {function} setSummaryExpanded - Function for setting the CourseSummary's expansion status
 */
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

/* CourseSummaryBase prop types */
interface CourseSummaryBaseProps {
  isExpanded: boolean;
}

/**
 * Displays the course image and contains the course's information components
 *
 * @param {boolean} isExpanded - True if the CourseSummary is in expanded form, false otherwise
 */
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
        <SummaryAccordion
          topics={formatSummaryTopics()}
          isExpanded={isExpanded}
        />
      </div>
    </div>
  );
};

/**
 * Displays the year level of the course and availability of the Certificate of Completion
 */
const CourseAttributes = () => {
  const { currentCourseData } = useContext(CourseContext);
  return (
    <div className={classes.courseHighlights}>
      <div className={classes.item}>
        <IconStarFilled />
        <Text size="textSm">{currentCourseData?.yearLevel}</Text>
      </div>
      {currentCourseData?.isCertificateAvailable && (
        <div className={classes.item}>
          <IconAwardFilled />
          <Text size="textSm">Certificate of Completion</Text>
        </div>
      )}
    </div>
  );
};

/**
 * Formatting course information into CourseSummaryTopic structure to display in the SummaryAccordion component
 */
const formatSummaryTopics = () => {
  const { currentCourseData } = useContext(CourseContext);
  return [
    {
      value: "About Course",
      icon: <IconInfoSquareFilled />,
      information: currentCourseData?.description,
    },
    {
      value: "Learning Outcomes",
      icon: <IconBulbFilled />,
      informationList: currentCourseData?.outcomes,
    },
    {
      value: "Materials Include",
      icon: <IconFileDescription />,
      informationList: currentCourseData?.materials,
    },
    {
      value: "Audience",
      icon: <IconUserFilled />,
      informationList: currentCourseData?.audience,
    },
  ];
};

/* CourseSummaryTopic prop types */
interface CourseSummaryTopic {
  value: string;
  icon: ReactNode;
  information?: string | null;
  informationList?: string[] | null; //  for bullet points
}

/* SummaryAccordion prop types */
interface SummaryAccordionProps {
  topics: CourseSummaryTopic[];
  isExpanded: boolean;
}

/**
 * Accordion used to display the course's description, learning outcomes, materials list, and audience
 *
 * @param {CourseSummaryTopic[]} topics - List of CourseSummaryTopics to display in each accordion item
 * @param {boolean} isExpanded - True if the CourseSummary is in expanded form, false otherwise
 */
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
        {topic.information || topic.informationList ? (
          <>
            {topic.information}
            {topic.informationList && (
              <List>
                {topic.informationList.map((listItem) => (
                  <List.Item key={listItem}>{listItem}</List.Item>
                ))}
              </List>
            )}
          </>
        ) : (
          "No information available"
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
