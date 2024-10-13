import { Button, Image, Stack, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import ExplorerGIF from '../../assets/explorer_404.gif';

interface NotFoundContentProps {
    buttonText: string;
    buttonLink: string;
}

/**
 * @component
 * NotFoundContent
 *
 * This component is for the 404 page content,
 * displaying a robot image and a message
 * 
 * @param {string} buttonText - The text for the button
 * @param {string} buttonLink - The link for the button
 * @returns {JSX.Element}
 */
const NotFoundContent: React.FC<NotFoundContentProps> = ({ buttonText, buttonLink }) => (
    <Stack align="center" p="xl" w="30rem">
        <Image
            src={ExplorerGIF}
            alt="404 Robot"
            radius="50%"
            style={{
                maxWidth: '200px',
                borderRadius: '50%',
                border: '2px solid #e0e0e0',
                padding: '5px',
            }}
        />
        <Text size="xl" fw={700} c="primary.5" ta={'center'}>
            Oops!
        </Text>
        <Text c="primary.4" fw={500} size="md" ta={'center'}>
            Sorry, the page you are looking for doesn't exist!
        </Text>
        <Button component={Link} to={buttonLink} size="md" color="primary" ta={'center'}>
            {buttonText}
        </Button>
    </Stack>
);


export default NotFoundContent;