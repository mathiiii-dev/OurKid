import {Button, Select} from "@mantine/core";
import {useState} from "react";
import {Calendar, TimeInput} from "@mantine/dates";
import {faClock} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import 'dayjs/locale/fr';

function CreateCalendar({kids}) {
    const [kid, setKid] = useState();
    const [day, setDay] = useState();
    const [departure, setDeparture] = useState();
    const [arrival, setArrival] = useState();

    const createCalendar = event => {
        event.preventDefault()
        fetch(
            `http://127.0.0.1:8000/calendar/kid/${kid}`,
            {
                body: JSON.stringify({
                    day,
                    arrival,
                    departure
                }),
                method: 'POST'
            }
        )
    }

    return (
        <>
            <form onSubmit={createCalendar}>
                <Select
                    searchable
                    label="Enfant"
                    placeholder="Pick one"
                    data={kids}
                    value={kid} onChange={setKid}
                />
                <Calendar
                    label="Jour de présence"
                    withSelect
                    minDate={new Date(2020, 0, 1)}
                    maxDate={new Date(2025, 11, 31)}
                    yearsRange={{ from: 2020, to: 2025 }}
                    value={day} onChange={setDay}
                    locale={'fr'}
                />
                <TimeInput
                    label="Heure d'arrivé"
                    icon={<FontAwesomeIcon icon={faClock}/>}
                    value={arrival} onChange={setArrival}
                />
                <TimeInput
                    label="Heure de départ"
                    icon={<FontAwesomeIcon icon={faClock}/>}
                    value={departure} onChange={setDeparture}
                />
                <Button type="submit">Enregistrer</Button>
            </form>
        </>
    )
}

export async function getStaticProps() {
    const apiKids = await fetch(`http://localhost:8000/kids`).then(r => r.json())
    const kids = []
    apiKids.forEach(res => {
        kids.push({value: res.id, label: res.firstname + ' ' + res.lastname})
    })
    return {
        props: {
            kids
        }
    }
}

export default CreateCalendar
