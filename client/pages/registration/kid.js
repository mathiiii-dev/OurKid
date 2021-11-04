import {InputWrapper, Button, Input} from "@mantine/core";
import {DatePicker} from "@mantine/dates";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import {useNotifications} from '@mantine/notifications';
import 'dayjs/locale/fr';

export default function Kid() {

    const [birthday, setBirthday] = useState(new Date());

    const notifications = useNotifications();

    const registerKid = async event => {
        event.preventDefault()
        console.log(event)
        const res = await fetch(
            'http://127.0.0.1:8000/registration/kid',
            {
                body: JSON.stringify({
                    firstname: event.target.firstname.value,
                    lastname: event.target.lastname.value,
                    birthday: birthday
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
        <form onSubmit={registerKid}>
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

