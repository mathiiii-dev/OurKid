import {Card, Image, Text, Badge, Button, Group, useMantineTheme, SimpleGrid} from '@mantine/core';
import Link from 'next/link'

function KidList({kids}) {
    const theme = useMantineTheme();
    const secondaryColor = theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[7];

    return (
        <>
            <SimpleGrid cols={1} spacing="xl">
                {
                    kids ?
                        kids.map(
                            k => {
                                return (
                                    <Card shadow="md" padding="lg">
                                        <Group position="apart" style={{marginBottom: 5, marginTop: theme.spacing.sm}}>
                                            <Text weight={500}>{k.firstname + ' ' + k.lastname}</Text>
                                        </Group>
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
