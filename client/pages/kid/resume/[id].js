import {Textarea, Button, Title, Breadcrumbs, Anchor} from '@mantine/core';
import {useForm} from "@mantine/hooks";
import {faLongArrowAltLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function Resume({kid}) {

    const form = useForm({
        initialValues: {
            resume: '',
        },
        validationRules: {
            resume: (resume) => resume.trim().length >= 2,
        },
    });

    const createResume = event => {
        form.validate()
        event.preventDefault()
        fetch(
            `http://localhost:8000/resume/kid/${kid.id}`,
            {
                body: event.target.resume.value,
                method: 'POST'
            }
        ).then(r => r.json())
    }

    return (
        <>
            <Anchor href={'/kid/list'}>
                <FontAwesomeIcon icon={faLongArrowAltLeft}/> Retour
            </Anchor>
            <Title order={2}>Le résumé de la journée de {kid.firstname}</Title>
            <form onSubmit={createResume}>
                <Textarea
                    placeholder="Le résumé de la journée"
                    label="Resumé"
                    required
                    id='resume'
                    error={form.errors.resume && 'Veuillez saisir un résumé'}
                    value={form.values.resume}
                    onChange={(event) => form.setFieldValue('resume', event.currentTarget.value)}
                />
                <Button type='submit'>Enregistrer</Button>
            </form>
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

export default Resume

