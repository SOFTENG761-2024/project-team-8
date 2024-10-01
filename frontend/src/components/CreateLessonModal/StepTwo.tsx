import {
  Divider,
  Group,
  Stack,
  Title,
  Text,
  Select,
  Button,
} from "@mantine/core";
import classes from "./CreateLessonModal.module.css";
import { Content } from "../../interfaces/kit";
import { FC, useState } from "react";
import { AddContentForm } from "./AddContentForm";

interface StepTwoProps {
  contents: Content[];
  setContents: (contents: Content[]) => void;
  error: string;
}
const StepTwo: FC<StepTwoProps> = ({ contents, setContents, error }) => {
  const [editContent, setEditContent] = useState<Content | null>(null);
  const handleSave = (newContent: Content) => {
    console.log(newContent);
    setContents([...contents, newContent]); // Update parent state
  };
  return (
    <>
      <Group w="100%">
        <Title size="h2" c="primary.4" w="100%">
          Create and add lesson content
        </Title>
      </Group>

      <Divider />
      <Stack h="75%">
        <Stack align="flex-start" gap="xs">
          <Text tt="uppercase" lts="0.08em">
            Content
          </Text>

          <Group w="100%" justify="space-between">
            <Select
              variant="filled"
              maw="30rem"
              w="60%"
              data={contents.map((content) => content.title)}
              placeholder="Select activity to edit"
              value={editContent ? editContent.title : null} // Use the id or unique identifier for value
              onChange={(value) => {
                const selectedContent = contents.find(
                  (content) => content.title === value
                );
                setEditContent(selectedContent || null); // Set the entire object or null if not found
              }}
            />
            <Button variant="outline" className={classes.addContentButton}>
              ADD NEW CONTENT
            </Button>
          </Group>
        </Stack>

        <AddContentForm oldContent={editContent} onSave={handleSave} />
        {error && (
          <Text size="sm" c="accentRed.3">
            {error}
          </Text>
        )}
      </Stack>
    </>
  );
};

export default StepTwo;
