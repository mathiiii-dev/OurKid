import '../styles/globals.css'
import {NotificationsProvider} from '@mantine/notifications';
import {Container} from '@mantine/core';

function App({Component, pageProps}) {
    return (
        <Container>
            <NotificationsProvider>
                <Component {...pageProps}/>
            </NotificationsProvider>
        </Container>
    );
}

export default App
