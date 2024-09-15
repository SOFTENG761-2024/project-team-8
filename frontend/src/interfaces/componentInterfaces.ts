import { ReactNode } from "react";

export interface CourseSummaryTopic {
  value: string;
  icon: ReactNode;
  information?: string;
  informationList?: string[]; //  for bullet points
}
