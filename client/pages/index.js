import {Center, SimpleGrid, Space, Title, Button} from "@mantine/core";

export default function Home() {
    return (
        <>
            <Center>
                <Title order={1}>OurKid</Title>
            </Center>
            <Space h="xl"/>
            <Center>
                <Title order={2}>Le site de gestion parfait pour vos enfants</Title>
            </Center>
            <Space h="xl"/>
            <Center>
                <SimpleGrid cols={2}>
                    <div>
                        <Button>Nourrice</Button>
                    </div>
                    <div>
                        <Button>Parent</Button>
                    </div>
                </SimpleGrid>
            </Center>
        </>
    )
}

