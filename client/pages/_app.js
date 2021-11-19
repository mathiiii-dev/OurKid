import '../styles/globals.css'
import {NotificationsProvider} from '@mantine/notifications';
import {AppShell, Burger, Container, Header, MediaQuery, Text} from '@mantine/core';
import {useState} from "react";

function App({Component, pageProps}) {
    const [opened, setOpened] = useState(false);
    return (
        <AppShell
            // navbarOffsetBreakpoint controls when navbar should no longer be offset with padding-left
            navbarOffsetBreakpoint="sm"
            // fixed prop on AppShell will be automatically added to Header and Navbar
            fixed
            header={
                <Header height={70} padding="md">
                    {/* You can handle other responsive styles with MediaQuery component or createStyles function */}
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                            <Burger
                                opened={opened}
                                onClick={() => setOpened((o) => !o)}
                                size="sm"
                                mr="xl"
                            />
                        </MediaQuery>
                        <Text>Application header</Text>
                    </div>
                </Header>
            }
        >
            <Container>
                <NotificationsProvider>
                    <Component {...pageProps}/>
                </NotificationsProvider>
            </Container>
        </AppShell>
    );
}

export default App
