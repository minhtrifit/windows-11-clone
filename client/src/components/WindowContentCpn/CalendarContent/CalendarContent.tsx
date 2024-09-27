import { useContext, useEffect, useRef, useState } from "react";
import { createEventId } from "@/lib/utils";
// import { INITIAL_EVENTS } from "@/lib/utils";s
import { EventAddArg, formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Calendar } from "@/components/ui/calendar";
import { AuthContext } from "@/components/Providers/AuthProvider/AuthProvider";
import "./styles.css";

const renderEventContent = (eventInfo: any) => {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
};

const renderSidebarEvent = (event: any) => {
  return (
    <p key={event.id}>
      <b>
        {formatDate(event.start, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
        :
      </b>
      <i className="ml-3">{event.title}</i>
    </p>
  );
};

const CalendarContent = () => {
  const { user }: any = useContext(AuthContext);

  const calendarRef = useRef<any>(null);

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [rendered, setRendered] = useState(false);
  const [weekendsVisible, setWeekendsVisible] = useState<boolean>(false);
  const [currentEvents, setCurrentEvents] = useState<any>([]);

  const handleSaveCalender = (username: string, data: any[]) => {
    const Calender = {
      username: username,
      events: data,
    };

    console.log(Calender);
    localStorage.setItem("calender", JSON.stringify(Calender));
  };

  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };

  const handleDateSelect = (selectInfo: any) => {
    const title = prompt("Enter a new title for your event:");
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleEventClick = (clickInfo: any) => {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      if (user?.email && clickInfo?.event?._def?.publicId) {
        const newEvents = currentEvents.filter((e: any) => {
          return e?._def?.publicId !== clickInfo?.event?._def?.publicId;
        });

        clickInfo.event.remove();
        setCurrentEvents(newEvents);

        const Calender = {
          username: user?.email,
          events: newEvents,
        };

        console.log("DELETE:", Calender);
        localStorage.setItem("calender", JSON.stringify(Calender));
      }
    }
  };

  const handleEvents = (events: any) => {
    setCurrentEvents(events);
  };

  const handleAddEvent = (e: EventAddArg) => {
    const newEvent = e.event;

    const data = currentEvents;
    data.push(newEvent);

    if (user?.email) handleSaveCalender(user?.email, data);
  };

  const handleChangeEvent = (changeEvent: any) => {
    const updateEvents: any = [];
    // console.log(changeEvent?.event);

    for (let i = 0; i < currentEvents?.length; ++i) {
      if (
        currentEvents[i]?._def?.publicId === changeEvent?.event?._def?.publicId
      ) {
        updateEvents.push(changeEvent?.event);
      } else updateEvents.push(currentEvents[i]);
    }

    setCurrentEvents(updateEvents);
    const Calender = {
      username: user?.email,
      events: updateEvents,
    };

    console.log("UPDATE:", Calender);
    localStorage.setItem("calender", JSON.stringify(Calender));
  };

  useEffect(() => {
    if (user?.email) {
      const calenderStr = localStorage.getItem("calender");

      if (calenderStr !== null) {
        const Calender = JSON.parse(calenderStr);

        console.log("CALENDAR:", Calender);

        setCurrentEvents(Calender.events);
      }
    }
  }, [user?.email]);

  useEffect(() => {
    // Delay the rendering to ensure the layout is ready
    setTimeout(() => {
      setRendered(true);
    }, 100); // Adjust delay based on your layout
  }, []);

  useEffect(() => {
    if (rendered && calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.updateSize(); // Ensure the grid columns fit the width
    }
  }, [rendered]);

  return (
    <div className="w-full h-full rounded-b-md text-black dark:text-white bg-[#efefef] dark:bg-[#252525]">
      <div className="w-full h-full flex">
        <div className="w-[25%] p-3 hidden xl:flex flex-col gap-5 rounded-bl-md bg-[#eaeaea] dark:bg-[#202327]">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={weekendsVisible}
              onChange={handleWeekendsToggle}
            />
            <p className="text-sm">Toggle Weekends</p>
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border bg-white dark:bg-black"
          />
          <div className="flex flex-col gap-3">
            <h1 className="text-md font-bold">All Events:</h1>
            {currentEvents.length === 0 && (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                No event scheduled
              </p>
            )}
            <div className="flex flex-col gap-5 max-h-[150px] overflow-y-auto">
              {currentEvents.map(renderSidebarEvent)}
            </div>
          </div>
        </div>
        <div className="w-[100%] xl:w-[75%] max-h-full overflow-y-auto rounded-br-md flex items-center justify-center">
          <div className="w-[100%] h-full bg-white dark:bg-[#252525] p-3">
            {rendered && (
              <FullCalendar
                height={"100%"}
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,dayGridWeek,dayGridDay",
                }}
                buttonText={{
                  today: "Today",
                  month: "Month",
                  week: "Week",
                  day: "Day",
                }}
                themeSystem="bootstrap"
                initialView="dayGridMonth"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={weekendsVisible}
                initialEvents={currentEvents} // alternatively, use the `events` setting to fetch from a feed
                select={handleDateSelect}
                eventContent={renderEventContent} // custom render function
                eventClick={handleEventClick}
                eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                eventAdd={function (e) {
                  handleAddEvent(e);
                }}
                eventChange={function (e) {
                  handleChangeEvent(e);
                }}
                //   eventRemove={function () {}}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarContent;
