import { Center, Paper, Title } from "@mantine/core";
import { FC, ReactNode } from "react";

interface WelcomeContainerProps {
  title: string;
  children: ReactNode;
}
const WelcomeContainer: FC<WelcomeContainerProps> = ({ title, children }) => (
  <Center bg="primary.3" h="100vh" w="100vw">
    <Paper bg="neutral.0" shadow="lg" w="37.5rem" p={50} radius="md">
      <Title ta="center" size="h1" c="primary.4">
        {title}
      </Title>
      {children}
    </Paper>
  </Center>
);

export default WelcomeContainer;
