import {Image, Paper, SimpleGrid, Text} from '@mantine/core';
import {useRouter} from "next/router";

function Kid({kid}) {

    return (
        <>
            <p>{kid ? kid.firstname : ''}</p>
        </>
    )
}

export async function getStaticPaths() {
    const res = await fetch('http://localhost:8000/kids');
    const data = await res.json();

    const paths = data.map(
        kid => {
            return {
                params : {
                    id: kid.id.toString()
                }
            }
        }
    )
    return {
        paths,
        fallback: true,
    }
}

export async function getStaticProps({ params }) {
    const kid = await fetch(`http://localhost:8000/kid/${params.id}`).then(r => r.json())
    return {
        props: {
            kid
        }
    }
}

export default Kid

