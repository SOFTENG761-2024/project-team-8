import {
  Button,
  FileInput,
  Group,
  Stack,
  Textarea,
  TextInput,
  Text,
} from "@mantine/core";
import classes from "./CreateLessonModal.module.css";
import { FormLabel } from "./FormLabel";
import { IconUpload } from "@tabler/icons-react";
import { Content } from "../../interfaces/kit";
import { FC, useEffect, useState } from "react";
import Parse from "parse";

interface AddContentFormProps {
  oldContent: Content | null;
  onSave: (content: Content) => void;
  onDelete: () => void;
}

export const AddContentForm: FC<AddContentFormProps> = ({
  oldContent,
  onSave,
  onDelete,
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
          label={<FormLabel text="Title" />}
          placeholder="Insert title of this activity here..."
          classNames={{ input: classes.whiteInput }}
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
        />
        <Textarea
          label={<FormLabel text="Description" />}
          placeholder="Insert text about what this activity entails here..."
          autosize
          minRows={3}
          maxRows={6}
          classNames={{ input: classes.whiteInput }}
          value={description}
          onChange={(event) => setDescription(event.currentTarget.value)}
        />
        <FileInput
          classNames={{
            input: classes.fileText,
          }}
          label={<FormLabel text="Resource upload" />}
          value={file}
          onChange={(file) => setFile(file)}
          placeholder={
            <Group justify="center" gap={0}>
              <Text c="primary.5" size="sm" td="underline">
                Upload new file
              </Text>
              <IconUpload className={classes.icon} />
            </Group>
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
          onClick={handleDeleteContent}
        >
          DELETE CONTENT
        </Button>
      </Group>
    </Stack>
  );
};
