import { Title } from "@mantine/core";

interface FormLabelProps {
  text: string;
  required?: boolean;
}

export const FormLabel: React.FC<FormLabelProps> = ({
  text,
  required = false,
}) => (
  <Title size="h4" c="neutral.5">
    {text} {required && <span style={{ color: "red" }}>*</span>}
  </Title>
);
