import React, { useEffect, useState } from 'react';
import { add, sub } from 'date-fns';

import classNames from 'classnames/bind';

import { Translate, English, Swedish } from '../Translate';
import NewsItem from '../News/NewsItem';
import styles from './Frontpage.module.css';

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

function getMondayOfWeek(date) {
  const monday = sub(date, { days: date.getDay() - 1 })
  return monday;
}

function getDatesOfWeek(date) {
  const monday = getMondayOfWeek(date);
  const datesOfWeek = [monday];
  for (var i = 1; i < 7; i++) {
    datesOfWeek.push(add(monday, { days: i }));
  }
  return datesOfWeek;
}

function getWidgetsFromEvents(events) {
  if (!(events && events.length > 0)) {
    return [];
  }

  events.forEach(event => {
    event.eventStartTime = new Date(event.eventStartTime);
    event.eventEndTime = new Date(event.eventEndTime);
  })
  events.sort((a, b) => a.eventStartTime.getTime() - b.eventStartTime.getTime());

  const widgetWeekGroups = [];
  var multiWeekEvents = [];
  
  const firstEventDate = new Date(events[0].eventStartTime)

  // Inner function
  const addWeekGroup = () => {
    widgetWeekGroups.push({ week: currentWeek, widgets: [] });
  }
  // Inner function
  const addWidget = (event, eventIndex, startTime) => {
    if (!startTime) return;

    const endTime = event.eventEndTime;
    var currentDayOfTheWeek = (startTime.getDay() + 6) % 7; // 0: Monday, 1: Tuesday, ..., 6: Sunday

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

    var currentDayOfTheYear = new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate());
    currentDayOfTheYear = add(currentDayOfTheYear, { days: 1 });
    while (currentDayOfTheYear < endTime) {
      currentDayOfTheWeek++;
      if (currentDayOfTheWeek === 7) {
        multiWeekEvents.push([event, eventIndex]);
        break;
      }
      blocks.push({
        day: currentDayOfTheWeek,
        startMinute: 0,
        endMinute: 1440,
        collisions: { numParts: 1, index: 0 },
      });
      currentDayOfTheYear = add(currentDayOfTheYear, { days: 1 });
    }
    blocks[blocks.length - 1].endMinute = (
      endTime.getHours() * 60 + endTime.getMinutes()
    );
  }

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
      currentMonday = add(currentMonday, {weeks: 1});
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

export default function EventCalendar({ events, location, lang }) {
  const today = new Date();
  const [weekState, setWeekState] = useState({
    week: 0,
    dates: getDatesOfWeek(today),
    widgetIndex: 0,
  });
  const [selectedEventIndex, setSelectedEventIndex] = useState(-1);

  var widgetWeekGroups = getWidgetsFromEvents(events);

  useEffect(() => {
    widgetWeekGroups = getWidgetsFromEvents(events);
    const timedelta = getMondayOfWeek(today) - getMondayOfWeek(events[0].eventStartTime);
    const currentWeek = Math.round(timedelta / (1000 * 60 * 60 * 27 * 7));
    var widgetIndex = -1;
    for (var i = 0; i < widgetWeekGroups.length; i++) {
      if (widgetWeekGroups[i].week > currentWeek) {
        break;
      }
      widgetIndex = i;
    }
    setWeekState({
      week: currentWeek,
      dates: getDatesOfWeek(today),
      widgetIndex: widgetIndex,
    });
  }, [events]);

  const monthsOfDates = weekState.dates.map(date => date.getMonth());
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
          <Swedish>{`${SWEDISH_WEEK_DAYS[i]} ${date.getDate()}`}</Swedish>
          <English>{`${ENGLISH_WEEK_DAYS[i]} ${date.getDate()}`}</English>
        </Translate>
      </th>
    );
  });

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

  const hours = [];
  for (var hour = 8; hour < 24; hour++) {
    hours.push(hour);
  }

  function goBack() {
    const week = weekState.week;
    const wi = weekState.widgetIndex;
    setWeekState({
      week: week - 1,
      dates: weekState.dates.map(date => sub(date, { weeks: 1 })),
      widgetIndex: (wi > 0 && widgetWeekGroups[wi - 1].week === week - 1) ? wi - 1 : wi,
    });
  }

  function goForward() {
    const week = weekState.week;
    const wi = weekState.widgetIndex;
    const end = widgetWeekGroups.length - 1;
    setWeekState({
      week: weekState.week + 1,
      dates: weekState.dates.map(date => add(date, { weeks: 1 })),
      widgetIndex: (wi < end && widgetWeekGroups[wi + 1].week === week + 1) ? wi + 1 : wi,
    });
  }

  return (
    <div style={{position: "relative"}} className={cx('calendar', 'flex')}>
      <table>
        <thead>
          <tr className={cx("yearHeader")}>
            <td rowSpan='3'>
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
      <div style={{width: "336px", height: "570px", overflow: "scroll"}}>
      {
        selectedEventIndex !== -1 && <NewsItem item={events[selectedEventIndex]} location={location} lang={lang}/>
      }
      </div>
      {(widgetWeekGroups
      && widgetWeekGroups.length > 0
      && widgetWeekGroups[weekState.widgetIndex].week === weekState.week
      && widgetWeekGroups[weekState.widgetIndex].widgets.map((eventWidget, ei) => (
        <div 
          key={`event-${ei}`}
          className={cx("widget")}
          style={{
            position: "absolute",
            top: `${3 * 30}px`,
            left: "100px",
          }}
          onClick={() => setSelectedEventIndex(ei)}
        >
          {eventWidget.blocks.map((block, bi) => {
            const H = 60;
            if (block.endMinute <= 8*H) {
              return null;
            }

            const blockStartMinute = Math.max(8*H, block.startMinute);
            const blockDuration = block.endMinute - blockStartMinute;
            const top = Math.floor((blockStartMinute - 8*H) / 2);
            const height = Math.floor(blockDuration / 2);
            const left = 100 * (block.day + block.collisions.index / block.collisions.numParts) + 2;
            const width = 100 / block.collisions.numParts - 4;
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
        )))}
    </div>
  );
}