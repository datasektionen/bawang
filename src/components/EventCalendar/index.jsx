import React, { useEffect, useState } from 'react';

import classNames from 'classnames/bind';

import { Translate, English, Swedish } from '../Translate';
import NewsItem from '../News/NewsItem';
import styles from './EventCalendar.module.css';

const cx = classNames.bind(styles);

const SWEDISH_MONTHS = [
  "Januari", "Februari", "Mars", "April", "Maj", "Juni",
  "Juli", "Augusti", "September", "Oktober", "November", "December",
];
const SWEDISH_WEEK_DAYS = ["Mån", "Tis", "Ons", "Tor", "Fre", "Lör", "Sön"];

const ENGLISH_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const ENGLISH_WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];


function addDays(date, days) {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + days);
  return newDate;
}

function getMondayOfWeek(date) {
  const monday = addDays(date, -((date.getDay() + 6) % 7));
  return monday;
}

/**
 * Given a Date object, return an array of the 7 Dates corresponding to the
 * same week, starting from Monday.
 *
 * @param {date} date
 * @returns {Date[]}
 */
function getDatesOfWeek(date) {
  const monday = getMondayOfWeek(date);
  const datesOfWeek = [monday];
  for (var i = 1; i < 7; i++) {
    datesOfWeek.push(addDays(monday, i));
  }
  return datesOfWeek;
}

/**
 * Get the start and end dates for a week.
 * 
 * @param {Date} date A date inside the week.
 */
export function getWeekTimeSpan(date) {
  const monday = getMondayOfWeek(date);
  monday.setHours(0, 0, 0, 0);
  const sunday = addDays(monday, 6);
  sunday.setHours(23, 59, 59, 999);
  return [monday, sunday];
}

/**
 * Given an array of event objects, return an array widgetWeekGroups
 * of WidgetWeekGroup objects.
 * Widgets are groups of blocks associated to each event.
 * Blocks are drawn on the calendar.
 *
 * @param {Event[]} events
 * @returns {WidgetWeekGroup[]}
 */
function getWidgetsFromEvents(events) {
  if (!(events && events.length > 0)) {
    return [];
  }

  // Transform time strings into Date objects
  events.forEach(event => {
    event.eventStartTime = new Date(event.eventStartTime);
    event.eventEndTime = new Date(event.eventEndTime);
  })
  events.sort((a, b) => a.eventStartTime.getTime() - b.eventStartTime.getTime());

  const widgetWeekGroups = [];
  var multiWeekEvents = [];

  const firstEventDate = new Date(events[0].eventStartTime)

  /**
   * Inner function.
   * Adds into a WidgetWeekGroup object a "week group": a group of Widget
   * objects in a same week.
   *
   * @returns {WidgetWeekGroup}
   */
  const addWeekGroup = () => {
    widgetWeekGroups.push({ week: currentWeek, widgets: [] });
  }

  /**
   * Inner function.
   * Creates a Widget for an Event, and adds it into the corresponding
   * WidgetWeekGroup based on the startTime date: useful for events
   * spanning multiple weeks, as a different startTime date is passed
   * for every spanned day.
   *
   * @param {Event} event
   * @param {number} eventIndex
   * @param {Date} startTime
   */
  const addWidget = (event, eventIndex, startTime) => {
    if (!startTime) return;

    const endTime = event.eventEndTime;
    // Starting weekday number for the event.
    // Will increment in a loop if the event spans multiple days.
    var currentDayOfTheWeek = (startTime.getDay() + 6) % 7; // 0: Monday, 1: Tuesday, ..., 6: Sunday

    // Because the events are sorted by week and widgets are created by event
    // order, getting the last WidgetWeekGroup will correspond to the event's
    // current week.
    const weekWidgets = widgetWeekGroups[widgetWeekGroups.length - 1].widgets;
    weekWidgets.push({
      eventIndex: eventIndex,
      colorID: event.id % 10,
      blocks: [{
        day: currentDayOfTheWeek,
        startMinute: startTime.getHours() * 60 + startTime.getMinutes(),
        endMinute: 1440,
        collisions: { numParts: 1, index: 0 },
      }],
    });
    const blocks = weekWidgets[weekWidgets.length - 1].blocks;
    // Some events have endTime === startTime. It's not that they span
    // 0 time: rather, they're intended to span the entire day.
    if (endTime.getTime() === startTime.getTime()) {
      blocks[blocks.length - 1].startMinute = 0;
      return;
    }

    // Iterate over the days between startTime and endTime
    var currentDayOfTheYear = new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate());
    currentDayOfTheYear = addDays(currentDayOfTheYear, 1);
    while (currentDayOfTheYear < endTime) {
      currentDayOfTheWeek++;
      // If the week is over, defer the event to the next week and end the loop
      if (currentDayOfTheWeek === 7) {
        multiWeekEvents.push([event, eventIndex]);
        break;
      }
      // The middle blocks (not start or end) always start at 0 and end at 1440
      // The end block will be set to the correct endMinute if necessary,
      // outside this loop
      blocks.push({
        day: currentDayOfTheWeek,
        startMinute: 0,
        endMinute: 1440,
        collisions: { numParts: 1, index: 0 },
      });
      currentDayOfTheYear = addDays(currentDayOfTheYear, 1);
    }
    blocks[blocks.length - 1].endMinute = (
      endTime.getHours() * 60 + endTime.getMinutes()
    );
  }

  // Iterate through the events and generate the WidgetWeekGroups
  const firstMonday = getMondayOfWeek(firstEventDate);
  var currentMonday = firstMonday;
  var currentWeek = -1;

  events.forEach((event, eventIndex) => {
    const startTime = event.eventStartTime;

    const timedelta = getMondayOfWeek(startTime) - firstMonday;
    var eventWeek = Math.round(timedelta / (1000 * 60 * 60 * 27 * 7));
    while (eventWeek > currentWeek && multiWeekEvents.length > 0) {
      const thisWeekEvents = [...multiWeekEvents];
      multiWeekEvents = [];
      currentMonday = addDays(currentMonday, 7);
      currentWeek++;
      addWeekGroup();
      for (var weekEventData of thisWeekEvents) {
        addWidget(...weekEventData, currentMonday);
      }
    }
    if (eventWeek > currentWeek) {
      currentMonday = getMondayOfWeek(startTime);
      currentWeek = eventWeek;
      addWeekGroup();
    }
    addWidget(event, eventIndex, startTime);
  });

  // Manage collisions between overlapping blocks
  widgetWeekGroups.forEach(weekGroup => {
    const weekWidgets = weekGroup.widgets;
    const blockIndices = weekWidgets.map(_ => 0);
    var dayBlocks = [];
    for (var weekDay = 0; weekDay < 7; weekDay++) {
      // Get all the blocks in the same day of the week
      for (var i = 0; i < weekWidgets.length; i++) {
        const widgetBlocks = weekWidgets[i].blocks;
        while (blockIndices[i] < widgetBlocks.length) {
          if (widgetBlocks[blockIndices[i]].day < weekDay) {
            blockIndices[i]++;
            continue;
          }
          if (widgetBlocks[blockIndices[i]].day === weekDay) {
            dayBlocks.push(widgetBlocks[blockIndices[i]]);
          }
          break;
        }
      }
      // Find collisions between the blocks of the day
      for (var curr = 1; curr < dayBlocks.length; curr++) {
        const currBlock = dayBlocks[curr];
        const currColls = currBlock.collisions;
        if (currBlock.endMinute <= 480) continue;
        for (var prev = 0; prev < curr; prev++) {
          const prevBlock = dayBlocks[prev];
          const prevColls = prevBlock.collisions;
          if (prevBlock.endMinute <= 480) continue;
          // No matter if current block collides with the following previous blocks:
          // as soon as we find a gap, we place the block there
          if (currBlock.startMinute >= prevBlock.endMinute) {
            break;
          }

          currColls.index++;
          currColls.numParts++;
          if (prevColls.numParts < currColls.numParts) {
            prevColls.numParts = currColls.numParts;
          }
        }
        const limit = prev;
        for (prev = 0; prev < limit; prev++) {
          const numParts = dayBlocks[limit].collisions.numParts;
          const prevColls = dayBlocks[prev].collisions;
          prevColls.numParts = numParts;
        }
      }

      // Reset for the next day
      dayBlocks = [];
    }
  });

  return widgetWeekGroups;
}


/**
 * Event calendar in the calendar section.
 *
 * @param {{events: Event[]; location: any; lang: any; onUpdateTimeSpan: ([Date, Date]) => void}} props
 * @returns {JSX.Element}
 */
export default function EventCalendar({ events, location, lang, onUpdateTimeSpan }) {
  const [columnWidth, setColumnWidth] = useState(56);
  var widthUpdateTimer = null;

  function getColumnWidth() {
    if (widthUpdateTimer === null) {
      widthUpdateTimer = setTimeout(() => {
        const W = (typeof window === "undefined") ? 480 : window.innerWidth;
        const newColumnWidth = (W < 480) ? 44 : (W < 768) ? 56 : (W < 1024) ? 80 : (W < 1280) ? 72 : 90;
        setColumnWidth(newColumnWidth);
        clearInterval(widthUpdateTimer);
        widthUpdateTimer = null;
      }, 100);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", getColumnWidth);
    getColumnWidth();
    return () => window.removeEventListener("resize", getColumnWidth);
  }, []);

  const today = new Date();
  const [weekState, setWeekState] = useState({
    week: 0,
    dates: getDatesOfWeek(today),
    widgetIndex: 0,
  });
  const [hasCalculatedWeek, setHasCalculatedWeek] = useState(false);
  const [selectedEventIndex, setSelectedEventIndex] = useState(-1);

  const [widgetWeekGroups, setWidgetWeekGroups] = useState(() => getWidgetsFromEvents(events));
  const monthsOfDates = weekState.dates.map(date => date.getMonth());

  // When the calendar is first loaded, calculate the week to display.
  useEffect(() => {
    const newWidgetWeekGroups = getWidgetsFromEvents(events);
    setWidgetWeekGroups(newWidgetWeekGroups);
    
    setSelectedEventIndex(-1);
    if (events.length === 0) return;
    if (!Array.isArray(events)) return;
    // Do not re-calculate the week if the user manually changes the viewed week.
    if (hasCalculatedWeek) return;

    const timedelta = getMondayOfWeek(today) - getMondayOfWeek(events[0].eventStartTime);
    const currentWeek = Math.round(timedelta / (1000 * 60 * 60 * 27 * 7));
    var widgetIndex = -1;
    for (var i = 0; i < newWidgetWeekGroups.length; i++) {
      if (newWidgetWeekGroups[i].week > currentWeek) {
        break;
      }
      widgetIndex = i;
    }
    setHasCalculatedWeek(true);
    setWeekState({
      week: currentWeek,
      dates: getDatesOfWeek(today),
      widgetIndex: widgetIndex,
    });
  }, [events]);

  function getTimeRow(time) {
    return [
      <td key={`hourKey-${time}`} className={cx("hour")}>
        {String(time).padStart(2, '0')}:00
      </td>,
      ...monthsOfDates.map((monthIndex, dayIndex) => (
        <td key={`cellKey-${time}-${dayIndex}`} className={cx(`month-${monthIndex}`)} />
      )),
    ];
  }

  function updateTimeSpan(date) {
    if (!onUpdateTimeSpan) return;
    const span = getWeekTimeSpan(date);
    onUpdateTimeSpan(span);
  }

  function goBack() {
    const week = weekState.week;
    const wi = weekState.widgetIndex;
    const dates = weekState.dates.map(date => addDays(date, -7));
    setWeekState({
      week: week - 1,
      dates,
      widgetIndex: (wi > 0 && widgetWeekGroups[wi - 1].week === week - 1) ? wi - 1 : wi,
    });
    updateTimeSpan(dates[0]);
  }

  function goForward() {
    const week = weekState.week;
    const wi = weekState.widgetIndex;
    const end = widgetWeekGroups.length - 1;
    const dates = weekState.dates.map(date => addDays(date, 7));
    setWeekState({
      week: weekState.week + 1,
      dates,
      widgetIndex: (wi < end && widgetWeekGroups[wi + 1].week === week + 1) ? wi + 1 : wi,
    });
    updateTimeSpan(dates[0]);
  }

  const yearHeader = [];
  const monthHeader = [];
  const dateHeader = [];
  var currentColSpan = 1;
  weekState.dates.forEach((date, i) => {
    const monthIndex = monthsOfDates[i];
    const monthClass = `month-${monthIndex}`;
    const monthSV = SWEDISH_MONTHS[monthIndex];
    const monthEN = ENGLISH_MONTHS[monthIndex];
    if (i < 6 && monthIndex === weekState.dates[i+1].getMonth()) {
      currentColSpan++;
    } else {
      yearHeader.push(
        <th key={`yearKey-${i}`} className={cx(monthClass)} colSpan={currentColSpan}>
          {date.getFullYear()}
        </th>
      );
      monthHeader.push(
        <th key={`monthKey-${i}`} className={cx(monthClass)} colSpan={currentColSpan}>
          <Translate>
            <Swedish>{currentColSpan > 1 ? monthSV : monthSV.substring(0, 3) + "."}</Swedish>
            <English>{currentColSpan > 1 ? monthEN : monthEN.substring(0, 3) + "."}</English>
          </Translate>
        </th>
      );
      currentColSpan = 1;
    }
    dateHeader.push(
      <th key={date.toUTCString()} className={cx(monthClass)}>
        <Translate>
          <Swedish>{SWEDISH_WEEK_DAYS[i]}<br/>{date.getDate()}</Swedish>
          <English>{ENGLISH_WEEK_DAYS[i]}<br/>{date.getDate()}</English>
        </Translate>
      </th>
    );
  });

  const hours = [];
  for (var hour = 8; hour < 24; hour++) {
    hours.push(hour);
  }

  return (
    <div className={cx('calendar')}>
      <table>
        <thead>
          <tr className={cx("yearHeader")}>
            <td rowSpan='3' className={cx("buttonZone")}>
              <button onClick={goBack}>{"<"}</button>
              <button onClick={goForward}>{">"}</button>
            </td>
            {yearHeader}
          </tr>
          <tr className={cx("monthHeader")}>{monthHeader}</tr>
          <tr className={cx("dateHeader")}>{dateHeader}</tr>
        </thead>
        <tbody>
          {hours.map(hour => (
            <tr className={cx(hour % 2 ? "lightTimeRow" : "darkTimeRow")} key={hour}>
              {getTimeRow(hour)}
            </tr>)
          )}
        </tbody>
      </table>
      <div className={cx("eventDisplay")}>
      {
        selectedEventIndex !== -1 && events[selectedEventIndex]
        ? <NewsItem item={events[selectedEventIndex]} location={location} lang={lang}/>
        : <div style={{ height: "100%", width: "100%", padding: "10%", display: "flex", alignItems: "center", backgroundColor: "#eeeeee" }}>
            <p style={{ fontSize: "24px", textAlign: "center" }}>
              <Translate>
                <Swedish>Klicka på en händelse för att visa mer information</Swedish>
                <English>Click on an event to display more information</English>
              </Translate></p>
          </div>
      }
      </div>
      {weekState.widgetIndex >= 0
      && widgetWeekGroups
      && widgetWeekGroups.length > 0
      && widgetWeekGroups[weekState.widgetIndex].widgets.map((eventWidget, ei) => (
        <div
          key={`event-${ei}`}
          className={cx("widget")}
          style={{
            position: "absolute",
            top: "90px",
            left: `${columnWidth}px`,
          }}
          onClick={() => setSelectedEventIndex(eventWidget.eventIndex)}
        >
          {eventWidget.blocks.map((block, bi) => {
            const H = 60;
            if (block.endMinute <= 8*H) {
              return null;
            }
            if (!events[eventWidget.eventIndex]) {
              return null;
            }

            const blockStartMinute = Math.max(8*H, block.startMinute);
            const blockDuration = block.endMinute - blockStartMinute;
            const top = Math.floor((blockStartMinute - 8*H) / 2);
            const height = Math.max(30, Math.floor(blockDuration / 2)); // some events might be "too short"
            const left = columnWidth * (block.day + block.collisions.index / block.collisions.numParts) + 2;
            const width = columnWidth / block.collisions.numParts - 4;
            return (
              <div
                key={`block-${ei}-${bi}`}
                className={cx(`event-${eventWidget.colorID}`)}
                style={{
                  position: "absolute",
                  top: `${top}px`,
                  height: `${height}px`,
                  left: `${left}px`,
                  width: `${width}px`,
                }}
              >
                {events[eventWidget.eventIndex].titleSwedish}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
