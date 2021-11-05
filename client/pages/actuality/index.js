import {SimpleGrid} from '@mantine/core';
import {Button, Paper, Text} from "@mantine/core";
import {useState} from "react";
import dynamic from 'next/dynamic';

const RichTextEditor = dynamic(() => import('@mantine/rte'), {
    ssr: false,
    loading: () => null
});

function Actuality({posts}) {
    const [post, setPost] = useState();
    const addActuality = async event => {
        await fetch(
            'http://127.0.0.1:8000/actuality',
            {
                body: JSON.stringify({
                    post
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }
        )
    }

    const handleImageUpload = (file) =>
    new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('image', file);

        console.log(formData)
    });

    return (
        <>
            <form onSubmit={addActuality}>
                <RichTextEditor sticky={false} value={post} onChange={setPost}/>
                <Button type="submit">Envoyer</Button>
            </form>
            <SimpleGrid cols={1}>
                {posts.map(res =>
                    <Paper key={res.id} padding="md" shadow="md" withBorder>
                        <h2>Nouvelle actualité du {new Date(res.createdAt).getDay() + '/' + new Date(res.createdAt).getMonth()}</h2>
                        <Text dangerouslySetInnerHTML={{__html: res.post}}/>
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

