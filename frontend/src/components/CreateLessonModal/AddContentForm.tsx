import {
  Button,
  FileInput,
  Group,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import Parse from "parse";
import { FC, useEffect, useState } from "react";
import { Content } from "../../interfaces/kit";
import classes from "./CreateLessonModal.module.css";
import { FormLabel } from "./FormLabel";

interface AddContentFormProps {
  oldContent: Content | null;
  onSave: (content: Content) => void;
  onDelete: () => void;
  resetForm: boolean;
}

/**
 * @component
 * AddContentForm
 *
 * This component is for the course content section of the course page,
 * offering a form to add or edit content for a lesson
 * 
 * @param {Content} oldContent - The content object to be edited
 * @param {function} onSave - Function to save the content
 * @param {function} onDelete - Function to delete the content
 * @param {boolean} resetForm - Boolean to reset the form
 * @returns {JSX.Element}
 */
export const AddContentForm: FC<AddContentFormProps> = ({
  oldContent,
  onSave,
  onDelete,
  resetForm,
}) => {
  // Local state to manage form inputs
  const [title, setTitle] = useState(oldContent ? oldContent.title : "");
  const [description, setDescription] = useState(
    oldContent ? oldContent.description : ""
  );
  const [file, setFile] = useState<File | null>(null);
  console.log(oldContent, title, description, file);

  // Update local state when oldContent changes
  useEffect(() => {
    if (oldContent) {
      setTitle(oldContent.title);
      setDescription(oldContent.description);
      setFile(null); // Reset the file if needed
    } else {
      // Reset to empty if oldContent is null
      setTitle("");
      setDescription("");
      setFile(null);
    }
  }, [oldContent]); // Dependency array with oldContent

  // Clear form when resetForm changes
  useEffect(() => {
    handleCleanContent(); // Clear form
  }, [resetForm]);

  // Handle new content submission
  const handleNewContent = () => {
    if (title && file) {
      const parseFile = new Parse.File(file.name, file);

      const newContent: Content = {
        title,
        description,
        printout: parseFile,
      };
      onSave(newContent);
      handleCleanContent();
    }
  };

  const handleDeleteContent = () => {
    onDelete();
    handleCleanContent();
  };

  const handleCleanContent = () => {
    setTitle("");
    setDescription("");
    setFile(null);
  };

  return (
    <Stack>
      <Stack className={classes.container}>
        <TextInput
          label={<FormLabel text="Title" required />}
          placeholder="Insert title of this section..."
          classNames={{ input: classes.whiteInput }}
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
        />
        <Textarea
          label={<FormLabel text="Description" />}
          placeholder=" Insert description for the attached content..."
          autosize
          minRows={3}
          maxRows={6}
          classNames={{ input: classes.whiteInput }}
          value={description}
          onChange={(event) => setDescription(event.currentTarget.value)}
        />
        {/* Display existing file name if oldContent has a file */}
        {oldContent && oldContent.printout && (
          <Text>
            Existing file: {oldContent.printout.name()}
            {/* Assuming .name exists */}
            {/* Alternatively, if using a method, use: {oldContent.printout.getName()} */}
          </Text>
        )}
        <FileInput
          classNames={{
            input: classes.fileText,
          }}
          label={<FormLabel text="Resource upload" required />}
          value={file}
          onChange={(file) => setFile(file)}
          placeholder={
            oldContent && oldContent.printout ? (
              <Text c="primary.5" size="sm" td="underline">
                {oldContent.printout.name()}
              </Text>
            ) : (
              <Group justify="center" gap={0}>
                <Text c="primary.5" size="sm" td="underline">
                  Upload new file
                </Text>
                <IconUpload className={classes.icon} />
              </Group>
            )
          }
        />
      </Stack>
      <Group className={classes.buttonContainer}>
        <Button
          variant="outline"
          className={`${classes.formButton} ${classes.saveButton}`}
          c="accentGreen.5"
          onClick={handleNewContent}
        >
          SAVE CHANGES
        </Button>
        <Button
          variant="outline"
          className={`${classes.formButton} ${classes.deleteButton}`}
          c="accentRed.5"
          onClick={handleDeleteContent}
        >
          DELETE CONTENT
        </Button>
      </Group>
    </Stack>
  );
};
