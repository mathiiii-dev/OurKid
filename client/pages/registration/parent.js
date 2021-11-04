import {Input, InputWrapper, Button, PasswordInput} from "@mantine/core";
import {useNotifications} from '@mantine/notifications';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes, faCheck} from '@fortawesome/free-solid-svg-icons'

function Parent() {
    const notifications = useNotifications();

    const registerUser = async event => {
        event.preventDefault()

        const res = await fetch(
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

        const result = await res.json()

        if (res.status !== 200) {
            notifications.showNotification({
                title: "Erreur lors de l'envoie du formaulaire",
                message: result.error_description,
                color: "red",
                icon: <FontAwesomeIcon icon={faTimes}/>
            })
        } else {
            notifications.showNotification({
                title: 'Bravo !',
                message: 'Vous avez été enregistré avec succes',
                color: "green",
                icon: <FontAwesomeIcon icon={faCheck}/>
            })
        }
    }

    return (
        <>
            <form onSubmit={registerUser}>
                <InputWrapper
                    id="firstname"
                    required
                    label="Prénom"
                >
                    <Input id="firstname" placeholder="Adele"/>
                </InputWrapper>
                <InputWrapper
                    id="lastname"
                    required
                    label="Nom"
                >
                    <Input id="lastname" placeholder="Laurie"/>
                </InputWrapper>
                <PasswordInput
                    id="password"
                    placeholder="********"
                    label="Mot de passe"
                    required
                />
                <InputWrapper
                    label="Email"
                    required>
                    <Input
                        id="email"
                        placeholder="my-email@mail.com"
                    />
                </InputWrapper>
                <Button type="submit">Inscription</Button>
            </form>
        </>

    )
}

export default Parent
