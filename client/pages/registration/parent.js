import {Button, Form, FormLabel, FormGroup, FormControl} from 'react-bootstrap';
export default function Parent() {
    const registerUser = async event => {
        event.preventDefault()

         await fetch(
            'http://127.0.0.1:8000/registration/parent',
            {
                body: JSON.stringify({
                    firstname: event.target.firstname.value,
                    lastname: event.target.lastname.value,
                    email: event.target.email.value,
                    password: event.target.password.value
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }
        )
    }

    return (
        <Form onSubmit={registerUser}>
            <FormGroup className={"mb-3"} controlId={"firstname"}>
                <FormLabel>Nom d'utilisateur</FormLabel>
                <FormControl type={"text"} placeholder={"John Doe"}/>
            </FormGroup>
            <FormGroup className={"mb-3"} controlId={"lastname"}>
                <FormLabel>Nom d'utilisateur</FormLabel>
                <FormControl type={"text"} placeholder={"John Doe"}/>
            </FormGroup>
            <FormGroup className={"mb-3"} controlId={"email"}>
                <FormLabel>Adresse email</FormLabel>
                <FormControl type={"email"} placeholder={"mon-email@mail.com"}/>
            </FormGroup>
            <FormGroup className={"mb-3"} controlId={"password"}>
                <FormLabel>Mot de passe</FormLabel>
                <FormControl type={"password"} placeholder={"********"}/>
            </FormGroup>
            <Button type="submit">Inscription</Button>
        </Form>
    )
}

