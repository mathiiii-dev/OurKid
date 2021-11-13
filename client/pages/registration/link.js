import {useState} from "react";
import {Select, Button} from "@mantine/core";

function Link({kids, parents}) {

    const [kid, setKid] = useState();
    const [parent, setParent] = useState();

    const link = async event => {
        event.preventDefault()
        await fetch(
            `http://127.0.0.1:8000/registration/link?kidId=${kid}&parentId=${parent}`,
            {
                method: 'POST'
            }
        )
    }

    return (
        <form onSubmit={link}>
            <Select
                searchable
                label="Parent"
                placeholder="Pick one"
                data={parents}
                value={parent} onChange={setParent}
            />
            <Select
                searchable
                label="Enfant"
                placeholder="Pick one"
                data={kids}
                value={kid} onChange={setKid}
            />

            <Button type="submit">Associer</Button>
        </form>
    )
}

export async function getStaticProps() {
    const apiKids = await fetch('http://localhost:8000/kids').then(r => r.json())
    const kids = []
    apiKids.forEach(res => {
        kids.push({value: res.id, label: res.firstname + ' ' + res.lastname})
    })
    const apiParents = await fetch('http://localhost:8000/parents').then(r => r.json())
    const parents = []
    apiParents.forEach(res => {
        parents.push({value: res.id, label: res.firstname + ' ' + res.lastname})
    })

    return {
        props: {
            kids,
            parents
        }
    }
}

export default Link
