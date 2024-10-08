import { Button, Center, Image, Loader, Stack, Text } from '@mantine/core'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContextProvider';
import { Link } from 'react-router-dom';
import ExplorerGIF from '../assets/explorer_404.gif';
import WelcomeContainer from '../components/WelcomeContainer';

const NotFoundPage = () => {
    const { currentUserData, loadingData } = useContext(AuthContext);

    useEffect(() => {
        document.title = "Not found | ByteEd";
    }, []);

    if (loadingData) {
        return (
            <Center h="100vh">
                <Loader color="primary.5" size="xl" />
            </Center>
        );
    }

    // once login once loading is complete and render the corresponding 404 page layout
    const isLoggedIn = Boolean(currentUserData);

    if (isLoggedIn) {
        // Render within the user layout (with sidebar, etc.)
        return (
            <Center h="100%">
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
                    <Text size="xl" fw={700} c="primary.5">
                        Oops!
                    </Text>
                    <Text c="primary.4" fw={500} size="md">
                        Sorry, the page you are looking for doesn't exist!
                    </Text>
                    <Button component={Link} to="/user/dashboard" size="md" color="primary">
                        Back to Dashboard
                    </Button>
                </Stack>
            </Center>
        );
    }

    // Render as a standalone page (for non-logged-in users)
    return (
        <WelcomeContainer>
            <Center>
                <Stack align="center">
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
                    <Text c="primary.4" fw={500} size="md">
                        Sorry, the page you are looking for doesn't exist!
                    </Text>
                    <Button component={Link} to="/login" size="md" color="primary">
                        Back to Login
                    </Button>
                </Stack>
            </Center>
        </WelcomeContainer>
    );
};

export default NotFoundPage;