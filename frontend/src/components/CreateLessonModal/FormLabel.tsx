import { Title } from "@mantine/core";

interface FormLabelProps {
  text: string;
}

export const FormLabel: React.FC<FormLabelProps> = ({ text }) => (
  <Title size="h4" c="neutral.5">
    {text}
  </Title>
);
