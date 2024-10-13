import { Center, Paper, Title } from "@mantine/core";
import { FC, ReactNode } from "react";

interface WelcomeContainerProps {
  title?: string;
  children: ReactNode;
}

/**
 * @component
 * WelcomeContainer
 *
 * This component is for the welcome container section of a page,
 * displaying the welcome message
 * 
 * @param {string} title - The title of the welcome message
 * @param {ReactNode} children - The content of the welcome message
 * @returns {JSX.Element}
 */
const WelcomeContainer: FC<WelcomeContainerProps> = ({ title, children }) => (
  <Center bg="primary.3" h="100vh" w="100vw">
    <Paper bg="neutral.0" shadow="lg" w="37.5rem" p={50} radius="md">
      <Title ta="center" size="h1" c="primary.4" tt="capitalize">
        {title}
      </Title>
      {children}
    </Paper>
  </Center>
);

export default WelcomeContainer;
