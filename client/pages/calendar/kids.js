import {Calendar as BigCalendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import 'moment/locale/fr';

const localizer = momentLocalizer(moment);

import "react-big-calendar/lib/css/react-big-calendar.css";

function Calendar({calendars}) {
    const dayFormat = (date, culture, localizer) => localizer.format(date, 'DD', culture);

    const calendarEvents = []
    calendars.forEach(
        c => {
            const day = new Date(c.day)
            const arrival = new Date(c.arrival)
            const departure = new Date(c.departure)
            calendarEvents.push({
                    title: c.kid.firstname,
                    start: new Date(day.getFullYear(), day.getMonth(), day.getDate(), arrival.getHours(), arrival.getMinutes()),
                    end: new Date(day.getFullYear(), day.getMonth(), day.getDate(), departure.getHours(), departure.getMinutes()),
                    color: c.kid.color
                }
            )
        }
    )
    return (
        <>
            <BigCalendar
                selectable
                localizer={localizer}
                events={calendarEvents}
                defaultView="week"
                scrollToTime={new Date(1970, 1, 1, 6)}
                defaultDate={new Date()}
                resizeable
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
