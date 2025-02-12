import {
  Button,
  Divider,
  Group,
  Select,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { FC, useState } from "react";
import { Content } from "../../interfaces/kit";
import { AddContentForm } from "./AddContentForm";
import classes from "./CreateLessonModal.module.css";

interface StepTwoProps {
  contents: Content[];
  setContents: (contents: Content[]) => void;
  error: string;
}

/**
 * @component
 * StepTwo
 *
 * This component is for the second step of the create lesson modal,
 * offering a form to create a new lesson
 * 
 * @param {Content[]} contents - Array of content objects
 * @param {function} setContents - Function to set the contents
 * @param {string} error - Error message
 * @returns {JSX.Element}
 */
const StepTwo: FC<StepTwoProps> = ({ contents, setContents, error }) => {
  const [editContent, setEditContent] = useState<Content | null>(null);
  const [resetForm, setResetForm] = useState(false);

  const handleSave = (newContent: Content) => {
    setContents([...contents, newContent]); // Update parent state
  };

  const handleDelete = () => {
    if (editContent) {
      setContents(
        contents.filter((content) => content.title != editContent.title)
      );
      handleClearForm();
    }
  };

  const handleClearForm = () => {
    setEditContent(null);
    setResetForm((prev) => !prev); // Toggle the reset state to trigger form reset
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
            Content <span style={{ color: "red" }}>*</span>
          </Text>

          <Group w="100%" justify="space-between">
            <Select
              variant="filled"
              maw="30rem"
              w="60%"
              data={contents.map((content) => content.title)}
              placeholder="Select content to edit"
              value={editContent ? editContent.title : null} // Use the id or unique identifier for value
              onChange={(value) => {
                const selectedContent = contents.find(
                  (content) => content.title === value
                );
                setEditContent(selectedContent || null); // Set the entire object or null if not found
              }}
            />
            <Button
              variant="outline"
              className={classes.addContentButton}
              onClick={handleClearForm}
            >
              ADD CONTENT
            </Button>
          </Group>
        </Stack>

        <AddContentForm
          oldContent={editContent}
          onSave={handleSave}
          onDelete={handleDelete}
          resetForm={resetForm}
        />
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
