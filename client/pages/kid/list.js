import {Card, Text, Button, Group, useMantineTheme, SimpleGrid, Avatar} from '@mantine/core';

function KidList({kids}) {
    const theme = useMantineTheme();

    return (
        <>
            <SimpleGrid cols={1} spacing="xl">
                {
                    kids ?
                        kids.map(
                            k => {
                                return (
                                    <Card key={k.id} shadow="md" padding="lg">
                                        <Group position="apart" style={{marginBottom: 5, marginTop: theme.spacing.sm}}>
                                            <Text weight={500}>{k.firstname + ' ' + k.lastname}</Text>
                                            <Avatar radius="xl"/>
                                        </Group>
                                        <Text>Date d'anniversaire
                                            : {new Date(k.birthday).getDate() + '/' + new Date(k.birthday).getMonth() + '/' + new Date(k.birthday).getFullYear()}</Text>
                                        <SimpleGrid cols={2} spacing="md">
                                            <Button href={`/kid/resume/${k.id}`} component="a" variant="light"
                                                    color="blue" style={{marginTop: 14}}>
                                                Résumé du jour
                                            </Button>
                                            <Button href={`/kid/${k.id}`} component="a" variant="light"
                                                    color="blue" style={{marginTop: 14}}>
                                                Profil
                                            </Button>
                                        </SimpleGrid>
                                    </Card>
                                )
                            }
                        ) : ''
                }
            </SimpleGrid>

        </>
    );
}

export async function getStaticProps() {
    const res = await fetch(`http://localhost:8000/kids`)
    const kids = await res.json()
    return {
        props: {
            kids
        }
    }
}

export default KidList
