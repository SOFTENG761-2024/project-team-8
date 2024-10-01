import { Button, Group, Stack, Textarea, TextInput } from "@mantine/core";
import classes from "./CreateLessonModal.module.css";
import { FormLabel } from "./FormLabel";
import { IconUpload } from "@tabler/icons-react";

export const AddContentForm = () => {
  return (
    <Stack>
      <Stack className={classes.container}>
        <TextInput
          label={<FormLabel text="Title" />}
          placeholder="Insert title of this activity here..."
          classNames={{ input: classes.whiteInput }}
        />
        <Textarea
          label={<FormLabel text="Description" />}
          placeholder="Insert text about what this activity entails here..."
          autosize
          minRows={3}
          maxRows={6}
          classNames={{ input: classes.whiteInput }}
        />
        <Stack gap={6}>
          <FormLabel text="Resource upload" />
          <Button
            variant="white"
            fullWidth
            rightSection={<IconUpload className={classes.icon} />}
          >
            Upload new file
          </Button>
        </Stack>
      </Stack>
      <Group className={classes.buttonContainer}>
        <Button
          variant="outline"
          className={`${classes.formButton} ${classes.saveButton}`}
          c="accentGreen.5"
        >
          SAVE CHANGES
        </Button>
        <Button
          variant="outline"
          className={`${classes.formButton} ${classes.deleteButton}`}
        >
          DELETE ACTIVITY
        </Button>
      </Group>
    </Stack>
  );
};
