import {Calendar as BigCalendar, momentLocalizer} from "react-big-calendar";
import {Button, Modal, Title} from '@mantine/core'
import moment from "moment";
import 'moment/locale/fr';

const localizer = momentLocalizer(moment);

import "react-big-calendar/lib/css/react-big-calendar.css";
import {useState} from "react";
import {TimeInput, Calendar as MantineCalendar} from "@mantine/dates";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-solid-svg-icons";

function Calendar({calendars}) {
    const dayFormat = (date, culture, localizer) => localizer.format(date, 'DD', culture);
    const [opened, setOpened] = useState(false);
    const [kidDay, setKidDay] = useState();

    const calendarEvents = []
    if(calendars) {
        calendars.forEach(
            c => {
                const day = new Date(c.day)
                const arrival = new Date(c.arrival)
                const departure = new Date(c.departure)
                calendarEvents.push({
                        id: c.id,
                        kidId: c.kid.id,
                        title: c.kid.firstname,
                        day: c.day,
                        start: new Date(day.getFullYear(), day.getMonth(), day.getDate(), arrival.getHours(), arrival.getMinutes()),
                        end: new Date(day.getFullYear(), day.getMonth(), day.getDate(), departure.getHours(), departure.getMinutes()),
                        color: c.kid.color
                    }
                )
            }
        )
    }
    const [day, setDay] = useState();
    const [departure, setDeparture] = useState();
    const [arrival, setArrival] = useState();

    const updateDay = () => {
        fetch(
            `http://127.0.0.1:8000/calendar/${kidDay.id}`,
            {
                body: JSON.stringify({
                    day,
                    arrival,
                    departure,
                    kidId: kidDay.kidId
                }),
                method: 'PATCH'
            }
        ).then(r => r.json())
    }

    return (
        <>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Modification du jour de présence :"
            >{
                kidDay ?
                        <form onSubmit={updateDay}>
                            <Title  order={4}>{kidDay.title}</Title>
                            <MantineCalendar
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
                            value={arrival}
                            onChange={setArrival}
                        />
                    <TimeInput
                    label="Heure de départ"
                    icon={<FontAwesomeIcon icon={faClock}/>}
                    value={departure}
                    onChange={setDeparture}
                    />
                    <Button type="submit">Enregistrer</Button>
                    <Button color="red">Supprimer</Button>
                    </form>
                    : ''
            }
            </Modal>
            <BigCalendar
                selectable
                localizer={localizer}
                events={calendarEvents}
                defaultView="week"
                scrollToTime={new Date(1970, 1, 1, 6)}
                defaultDate={new Date()}
                resizeable
                onSelectEvent={(e) => {
                    setOpened(true)
                    setKidDay(e)
                    setDay(e.day)
                    setArrival(e.start)
                    setDeparture(e.end)

                }}
                formats={{
                    dayFormat
                }}
                style={{height: "100vh"}}
                eventPropGetter={calendarEvents => ({
                    style: {
                        backgroundColor: '#'+calendarEvents.color,
                    },
                })}
                messages={{
                    next: "Suivant",
                    previous: "Precédent",
                    today: "Aujourd'hui",
                    month: "Mois",
                    week: "Semaine",
                    day: "Jour"
                }}
            />
        </>
    );
}


export async function getStaticProps() {
    const calendars = await fetch(`http://localhost:8000/calendars`).then(r => r.json())

    return {
        props: {
            calendars
        }
    }
}

export default Calendar;
