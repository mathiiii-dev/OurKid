import {Calendar as BigCalendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import 'moment/locale/fr';
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function Calendar({calendars}) {
    const dayFormat = (date, culture, localizer) => localizer.format(date, 'DD', culture);

    const calendarEvents = []

    calendars.forEach(
        c => {

            const day = new Date(c.day)
            const arrival = new Date(moment(`${c.day} ${c.arrival}`, 'YYYY-MM-DD HH:mm:ss').format())
            const departure = new Date(moment(`${c.day} ${c.departure}`, 'YYYY-MM-DD HH:mm:ss').format())
            calendarEvents.push({
                    title: c.firstname,
                    start: new Date(day.getFullYear(), day.getMonth(), day.getDate(), arrival.getHours(), arrival.getMinutes()),
                    end: new Date(day.getFullYear(), day.getMonth(), day.getDate(), departure.getHours(), departure.getMinutes()),
                    color: c.color
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

export async function getStaticPaths() {
    const res = await fetch('http://localhost:8000/parents');
    const data = await res.json();

    const paths = data.map(
        kid => {
            return {
                params: {
                    id: kid.id.toString()
                }
            }
        }
    )
    return {
        paths,
        fallback: true,
    }
}

export async function getStaticProps({params}) {
    const calendars = await fetch(`http://localhost:8000/calendar/${params.id}`).then(r => r.json())

    return {
        props: {
            calendars
        }
    }
}

export default Calendar;
