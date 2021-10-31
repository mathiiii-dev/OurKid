import {Button, Form, FormLabel, FormGroup, FormControl} from 'react-bootstrap';

export default function Kid() {
    const registerKid = async event => {
        event.preventDefault()

        await fetch(
            'http://127.0.0.1:8000/registration/kid',
            {
                body: JSON.stringify({
                    firstname: event.target.firstname.value,
                    lastname: event.target.lastname.value,
                    birthday: event.target.birthday.value
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }
        )
    }

    return (
        <Form onSubmit={registerKid}>
            <FormGroup className={"mb-3"} controlId={"firstname"}>
                <FormLabel>Prénom</FormLabel>
                <FormControl type={"text"} placeholder={"Adele"}/>
            </FormGroup>
            <FormGroup className={"mb-3"} controlId={"lastname"}>
                <FormLabel>Nom</FormLabel>
                <FormControl type={"text"} placeholder={"Laurie "}/>
            </FormGroup>
            <FormGroup className={"mb-3"} controlId={"birthday"}>
                <FormLabel>Date d'anniversaire</FormLabel>
                <FormControl type={"date"}/>
            </FormGroup>
            <Button type="submit">Inscription</Button>
        </Form>
    )
}

