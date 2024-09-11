import { Title, Text, Anchor } from "@mantine/core";
import classes from "./Welcome.module.css";
import CreateLessonModal from "../CreateLessonModal/CreateLessonModal";

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Welcome to{" "}
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: "pink", to: "yellow" }}
        >
          Mantine
        </Text>
      </Title>

      {/* example using the text size theme */}
      <Text c="dimmed" ta="center" size="textReg" maw={580} mx="auto" mt="xl">
        This starter Vite project includes a minimal setup, if you want to learn
        more on Mantine + Vite integration follow{" "}
        <Anchor href="https://mantine.dev/guides/vite/" size="lg">
          this guide
        </Anchor>
        . To get started edit pages/Home.page.tsx file.
      </Text>

      {/* example using the color theme. This is also achievable using module.css. 
      Check out Welcome.module.css with usage of var(--mantine-color-....) */}
      <Text c="primary.4">Hello</Text>
      <Text c="secondary.3">Hello</Text>
      <Text c="neutral.1">Hello</Text>

      <Title size="h1" c="primary.4">
        Heading 1
      </Title>
      <Title size="h2" c="primary.4">
        Heading 2
      </Title>
      <Title size="h3" c="primary.4">
        Heading 3
      </Title>
      <Title size="h4" c="primary.4">
        Heading 4
      </Title>
      <Title size="h5" c="neutral.5" tt={"uppercase"} lts="0.08em">
        SubHeading
      </Title>
      <Title size="h6" c="neutral.5">
        Sub Title
      </Title>
      <CreateLessonModal />
    </>
  );
}
