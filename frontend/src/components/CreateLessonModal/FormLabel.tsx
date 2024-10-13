import { Title } from "@mantine/core";

interface FormLabelProps {
  text: string;
  required?: boolean;
}


/**
 * @component
 * FormLabel
 *
 * This component is for the form label in the create lesson modal
 * 
 * @param {string} text - The text to display in the label
 * @param {boolean} required - True if the field is required, false otherwise
 * @returns {JSX.Element}
 */
export const FormLabel: React.FC<FormLabelProps> = ({
  text,
  required = false,
}) => (
  <Title size="h4" c="neutral.5">
    {text} {required && <span style={{ color: "red" }}>*</span>}
  </Title>
);
