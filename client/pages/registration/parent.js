import {Input, InputWrapper, Button, PasswordInput} from "@mantine/core";
import {useNotifications} from '@mantine/notifications';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck} from '@fortawesome/free-solid-svg-icons'
import {useForm} from "@mantine/hooks";

function Parent() {
    const notifications = useNotifications();
    const form = useForm({
        initialValues: {
            firstname: '',
            lastname: '',
            password: '',
            email: ''
        },

        validationRules: {
            firstname: (firstname) => firstname.trim().length >= 2,
            lastname: (lastname) => lastname.trim().length >= 2,
            password: (password) => password.trim().length >= 2,
            email: (email) => email.trim().length >= 2
        },
    });
    const registerUser = event => {
        event.preventDefault()
        form.validate()
        fetch(
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
        ).then(r => {
            if (r.status === 200) {
                form.reset()
                notifications.showNotification({
                    title: 'Bravo !',
                    message: 'Vous avez été enregistré avec succes',
                    color: "green",
                    icon: <FontAwesomeIcon icon={faCheck}/>
                })
            }
        })
    }

    return (
        <>
            <form onSubmit={registerUser}>
                <InputWrapper
                    id="firstname"
                    required
                    label="Prénom"
                    error={form.errors.firstname && 'Veuillez saisir un prénom'}
                >
                    <Input id="firstname" placeholder="Adele"
                           value={form.values.firstname}
                           onChange={(event) => form.setFieldValue('firstname', event.currentTarget.value)}/>
                </InputWrapper>
                <InputWrapper
                    id="lastname"
                    required
                    label="Nom"
                    error={form.errors.firstname && 'Veuillez saisir un nom'}
                >
                    <Input id="lastname" placeholder="Laurie"
                           value={form.values.lastname}
                           onChange={(event) => form.setFieldValue('lastname', event.currentTarget.value)}/>
                </InputWrapper>
                <PasswordInput
                    id="password"
                    placeholder="********"
                    label="Mot de passe"
                    required
                    error={form.errors.password && 'Veuillez saisir un titre'}
                    value={form.values.password}
                    onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                />
                <InputWrapper
                    label="Email"
                    required
                    error={form.errors.email && 'Veuillez saisir un email'}
                >
                    <Input
                        id="email"
                        placeholder="my-email@mail.com"
                        value={form.values.email}
                        onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                    />
                </InputWrapper>
                <Button type="submit">Inscription</Button>
            </form>
        </>

    )
}

export default Parent
