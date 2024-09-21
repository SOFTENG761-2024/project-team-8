import {Dispatch, SetStateAction, useState} from "react";
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
import {Accordion, ActionIcon, Image, List, Text} from "@mantine/core";
import {CourseSummaryTopic} from "../../interfaces/componentInterfaces.ts";
import {CoursePage} from "../../pages/Course.page.tsx";

interface CourseSummaryProps {
    course: CoursePage | null
    summaryExpanded: boolean;
    setSummaryExpanded: Dispatch<SetStateAction<boolean>>;
}

export const CourseSummary = ({
                                  summaryExpanded,
                                  course,
                                  setSummaryExpanded,
                              }: CourseSummaryProps) => {
    const toggleCourseSummary = () => {
        setSummaryExpanded(!summaryExpanded);
    };

    return (
        <div className={classes.courseSummaryContainer}>
            <CourseSummaryBase course={course} isExpanded={summaryExpanded}/>
            <ActionIcon
                variant="filled"
                color="secondary.6"
                className={`${classes.collapseButton} ${summaryExpanded ? "" : classes.collapseButtonExpanded}`}
                onClick={toggleCourseSummary}
            >
                {summaryExpanded ? (
                    <IconChevronLeft className={classes.icon} stroke={3}/>
                ) : (
                    <IconChevronRight className={classes.icon} stroke={3}/>
                )}
            </ActionIcon>
        </div>
    );
};

interface CourseSummaryBaseProps {
    course: CoursePage | null;
    isExpanded: boolean;
}

const CourseSummaryBase = ({isExpanded, course}: CourseSummaryBaseProps) => {
    return (
        <div
            className={`${classes.courseSummaryWrapper} ${isExpanded ? "" : classes.collapsed}`}
        >
            <div className={classes.courseSummary}>
                <Image h={300} src={course?.courseImage._url} radius="10px"/>
                <CourseAttributes course={course}/>
                <SummaryAccordion topics={summaryTopics(course)} isExpanded={isExpanded}/>
            </div>
        </div>
    );
};

interface CourseAttributesProps {
    course?: CoursePage | null
}

const CourseAttributes = ({course}: CourseAttributesProps) => {
    return (
        <div className={classes.courseHighlights}>
            <div className={classes.item}>
                <IconStarFilled/>
                <Text size="textSm">{course?.yearLevel}</Text>
            </div>
            <div className={classes.item}>
                <IconAwardFilled/>
                <Text size="textSm">Certificate of Completion</Text>
            </div>
        </div>
    );
};

const summaryTopics = (course: CoursePage | null) => {
    return [
        {
            value: "About Course",
            icon: <IconInfoSquareFilled/>,
            information: course?.description || '',
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
            icon: <IconBulbFilled/>,
            informationList: course?.outcomes || [],
        },
        {
            value: "Materials Include",
            icon: <IconFileDescription/>,
            informationList: [
                "A full comprehensive guide for teachers",
                "Print-outs and activities",
                "Posters",
                "Cut-out resources",
            ],
        },
        {
            value: "Audience",
            icon: <IconUserFilled/>,
            information: "Teachers or Tutors",
        },
    ];
}

interface SummaryAccordionProps {
    topics: CourseSummaryTopic[];
    isExpanded: boolean;
}

const SummaryAccordion = ({topics, isExpanded}: SummaryAccordionProps) => {
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
