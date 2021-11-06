import {SimpleGrid, Textarea, TextInput, Input, InputWrapper, Group} from '@mantine/core';
import {Button, Paper, Text} from "@mantine/core";
import {useState} from "react";
import {Dropzone} from "@mantine/dropzone";


function Actuality({posts}) {

    const addActuality = async event => {
        await fetch(
            'http://127.0.0.1:8000/actuality',
            {
                body: JSON.stringify({
                    title: event.target.title.value,
                    description: event.target.description.value,
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }
        )
    }

    const handleImageUpload = (file) => new Promise((resolve, reject) => {
            fetch('https://content.dropboxapi.com/2/files/upload', {
                headers: {
                    'Dropbox-API-Arg': JSON.stringify({
                        "path": "/test.png",
                        "mode": "add",
                        "autorename": true,
                        "mute": false,
                        "strict_conflict": false
                    }),
                    'Content-Type': 'application/octet-stream',
                    'Authorization': `Bearer ${process.env.DROPBOX_API_KEY}`
                },
                method: 'POST',
                body: file,
            })
                .then((response) => response.json())
                .then((result) => console.log(result))
                .catch(() => reject(new Error('Upload failed')));
        }
    );

    const [photo, setPhoto] = useState(0);

    return (
        <>
            <form onSubmit={addActuality}>
                <TextInput label="Titre" required id={"title"}/>
                <Textarea label="Description" id={"description"} required/>
                <InputWrapper id="photo" label="Photo">
                    {[...Array(photo)].map((photo, index) => {
                        return <Dropzone key={index} onDrop={console.log} maxSize={3 * 720 ** 2}>
                            {(status) => (
                                <Group position="center" spacing="xl" style={{minHeight: 220, pointerEvents: 'none'}}>
                                    <div>
                                        <Text size="xl" inline>
                                            Drag images here or click to select files
                                        </Text>
                                        <Text size="sm" color="dimmed" inline mt={7}>
                                            Attach as many files as you like, each file should not exceed 5mb
                                        </Text>
                                    </div>
                                </Group>
                            )}
                        </Dropzone>
                    })}
                </InputWrapper>
                <Button onClick={() => setPhoto(photo + 1)}>Ajouter une image</Button>
                {photo !== 0 ?
                    <Button onClick={() => setPhoto(photo - 1)}>Supprimer une image</Button>
                    : ''
                }
                <Button type="submit">Envoyer</Button>
            </form>
            <SimpleGrid cols={1}>
                {posts.map(res =>
                    <Paper key={res.id} padding="md" shadow="md" withBorder>
                        <h2>{res.title + ' ' + new Date(res.createdAt).getDay() + '/' + new Date(res.createdAt).getMonth()}</h2>
                        <Text dangerouslySetInnerHTML={{__html: res.description}}/>
                    </Paper>
                )}
            </SimpleGrid>
        </>
    )
}

export async function getStaticProps() {
    const posts = await fetch('http://localhost:8000/actuality').then(r => r.json())

    return {
        props: {
            posts
        }
    }
}

export default Actuality

