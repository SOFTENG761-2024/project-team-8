import { Center, Loader } from '@mantine/core'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContextProvider';
import WelcomeContainer from '../components/WelcomeContainer';
import NotFoundContent from '../components/NotFoundContent/NotFoundContent';

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

    // once login once loading is complete conditionally render the corresponding 404 page layout
    const isLoggedIn = Boolean(currentUserData);

    return isLoggedIn ? (
        <Center h="100%">
            <NotFoundContent
                buttonText="Back to Dashboard"
                buttonLink="/user/dashboard"
            />
        </Center>
    ) : (
        <WelcomeContainer>
            <Center>
                <NotFoundContent
                    buttonText="Back to Login"
                    buttonLink="/login"
                />
            </Center>
        </WelcomeContainer>
    );
};

export default NotFoundPage;