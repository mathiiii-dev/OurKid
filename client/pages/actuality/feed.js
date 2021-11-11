import {Image, Paper, SimpleGrid, Text} from '@mantine/core';

function Feed({posts}) {
    return (
        <>
            <SimpleGrid cols={1}>
                {posts ? posts.map(res =>
                    <Paper key={res.id} padding="md" shadow="md" withBorder>
                        <h2>{res.title + ' ' + new Date(res.createdAt).getDate() + '/' + new Date(res.createdAt).getUTCMonth()}</h2>
                        <Text dangerouslySetInnerHTML={{__html: res.description}}/>
                        {res.photos ? res.photos.map(photo => {
                            return <Image key={photo.id} src={process.env.BASE_URL+photo.url}/>
                        }) : ''
                        }
                    </Paper>
                ) : ''}
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

export default Feed

