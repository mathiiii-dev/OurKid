import {InputWrapper, Button, Input} from "@mantine/core";
import {DatePicker} from "@mantine/dates";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {useNotifications} from '@mantine/notifications';
import 'dayjs/locale/fr';
import {useForm} from "@mantine/hooks";

export default function Kid() {

    const [birthday, setBirthday] = useState(new Date());

    const notifications = useNotifications();

    const form = useForm({
        initialValues: {
            firstname: '',
            lastname: '',
        },

        validationRules: {
            firstname: (firstname) => firstname.trim().length >= 2,
            lastname: (lastname) => lastname.trim().length >= 2
        },
    });

    const registerKid = event => {
        event.preventDefault()
        form.validate()
        fetch(
            'http://127.0.0.1:8000/registration/kid',
            {
                body: JSON.stringify({
                    firstname: event.target.firstname.value,
                    lastname: event.target.lastname.value,
                    birthday
                }),
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
        <form onSubmit={registerKid}>
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
                error={form.errors.lastname && 'Veuillez saisir un nom'}
            >
                <Input id="lastname" placeholder="Laurie"
                       value={form.values.lastname}
                       onChange={(event) => form.setFieldValue('lastname', event.currentTarget.value)}/>
            </InputWrapper>
            <DatePicker
                placeholder="Choisir une date"
                label="Date d'anniversaire"
                required
                id="birthday"
                value={birthday} onChange={setBirthday}
                locale={'fr'}
                inputFormat="DD/MM/YYYY"
            />
            <Button type="submit">Inscription</Button>
        </form>
    )
}

