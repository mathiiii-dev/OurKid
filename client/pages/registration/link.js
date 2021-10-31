import {Button, Form, FormSelect} from "react-bootstrap";
import {useState} from "react";

function Link({kids, parents}) {

    const [kid, setKid] = useState(1);
    const [parent, setParent] = useState(2);

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
        <div>
            <Form onSubmit={link}>
                <FormSelect value={parent}
                            onChange={
                                (e) => {
                                    setParent(e.target.value);
                                }
                            }>
                    {parents.map((parent) => (
                        <option value={parent.id} key={parent.id}>{parent.lastname}</option>
                    ))}
                </FormSelect>
                <FormSelect value={kid}
                            onChange={
                                (a) => {
                                    setKid(a.target.value);
                                }
                            }>
                    {kids.map((kid) => (
                        <option value={kid.id} key={kid.id}>{kid.lastname}</option>
                    ))}
                </FormSelect>
                <Button type="submit">Associer</Button>
            </Form>
        </div>
    )
}

export async function getStaticProps() {
    const kids = await fetch('http://localhost:8000/kids').then(r => r.json())
    const parents = await fetch('http://localhost:8000/parents').then(r => r.json())
    return {
        props: {
            kids,
            parents
        }
    }
}

export default Link
