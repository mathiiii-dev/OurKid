import {Anchor, Paper, Space, Spoiler, Text, Title} from '@mantine/core';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLongArrowAltLeft} from "@fortawesome/free-solid-svg-icons";

function Kid({kid, resume}) {

    return (
        <>
            <Anchor href={'/kid/list'}>
                <FontAwesomeIcon icon={faLongArrowAltLeft}/> Retour
            </Anchor>
            <p>{kid ? kid.firstname : ''}</p>
            {
                resume ?
                    resume.map(
                        r => {
                            return (
                                <>
                                    <Space h="md"/>
                                    <Paper padding="md" shadow="sm" withBorder>
                                        <Title order={4}>Résumé de la journée
                                            du {new Date(r.createdAt).getDate() + '/' + new Date(r.createdAt).getMonth()}</Title>
                                        <Spoiler maxHeight={120}
                                                 showLabel="Voir plus"
                                                 hideLabel="Hide">
                                            <Text>{r.resume}</Text>
                                        </Spoiler>
                                    </Paper>
                                </>
                            )
                        }
                    ) : ''
            }
        </>
    )
}

export async function getStaticPaths() {
    const res = await fetch('http://localhost:8000/kids');
    const data = await res.json();

    const paths = data.map(
        kid => {
            return {
                params: {
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

export async function getStaticProps({params}) {
    const kid = await fetch(`http://localhost:8000/kid/${params.id}`).then(r => r.json())
    const resume = await fetch(`http://localhost:8000/resume/kid/${params.id}`).then(r => r.json())
    return {
        props: {
            kid,
            resume
        }
    }
}

export default Kid

