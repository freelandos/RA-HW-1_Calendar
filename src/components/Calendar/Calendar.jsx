import moment from 'moment/min/moment-with-locales';
import styles from './calendar.module.css';

let now;

export const Calendar = ({ date }) => {
  now = date;
  const weeks = getWeeks(now);

  return (
    <div className={styles["ui-datepicker"]}>
      <div className={styles["ui-datepicker-material-header"]}>
        <div className={styles["ui-datepicker-material-day"]}>{ moment(date).format('dddd') }</div>
        <div className={styles["ui-datepicker-material-date"]}>
          <div className={styles["ui-datepicker-material-day-num"]}>{ moment(date).format('D') }</div>
          <div className={styles["ui-datepicker-material-month"]}>{ moment(date).format('LL').split(' ')[1] }</div>
          <div className={styles["ui-datepicker-material-year"]}>{ moment(date).format('YYYY') }</div>
        </div>
      </div>
      <div className={styles["ui-datepicker-header"]}>
        <div className={styles["ui-datepicker-title"]}>
          <span className={styles["ui-datepicker-month"]}>{ moment(date).format('MMMM') }</span>&nbsp;<span className={styles["ui-datepicker-year"]}>{ moment(date).format('YYYY') }</span>
        </div>
      </div>
      <table className={styles["ui-datepicker-calendar"]}>
        <colgroup>
          <col/>
          <col/>
          <col/>
          <col/>
          <col/>
          <col className={styles["ui-datepicker-week-end"]}/>
          <col className={styles["ui-datepicker-week-end"]}/>
        </colgroup>
        <thead>
          <tr>
            <th scope="col" title="Понедельник">Пн</th>
            <th scope="col" title="Вторник">Вт</th>
            <th scope="col" title="Среда">Ср</th>
            <th scope="col" title="Четверг">Чт</th>
            <th scope="col" title="Пятница">Пт</th>
            <th scope="col" title="Суббота">Сб</th>
            <th scope="col" title="Воскресенье">Вс</th>
          </tr>
        </thead>
        <tbody>
          {
            weeks.map((week, index) => (
              <TableRow key={index} week={week}/>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

const getWeeks = (now) => {
  moment.locale('ru');

  // Первый день первой недели месяца
  const firstDay = moment(now).startOf('month').startOf('week');
  // Последний день последней недели месяца
  const lastDay = moment(now).endOf('month').endOf('week');

  let day = firstDay.clone();
  const weeks = [];

  while (day.isBefore(lastDay)) {
    let week = [];

    for (let i = 0; i < 7; i++) {
      week.push(day.clone());
      day.add(1, 'day');
    }
    
    weeks.push(week);
  }

  return weeks;
}

const TableRow = ({ week }) => {
  return (
    <tr>
      {
        week.map((day, index) => (
          <DayCell key={index} day={day}/>
        ))
      }
    </tr>
  );
};

const DayCell = ({ day }) => {
  const isToday = day.isSame(now, 'day');
  const isOtherMonth = !day.isSame(now, 'month');

  if (isOtherMonth) {
    return <td className={styles["ui-datepicker-other-month"]}>{ day.format('D') }</td>;
  } else if (isToday) {
    return <td className={styles["ui-datepicker-today"]}>{ day.format('D') }</td>;
  } else {
    return <td>{ day.format('D') }</td>;
  }
};
