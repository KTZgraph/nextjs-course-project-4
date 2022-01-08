// export async function getAllEvents() {
//   //zwraca promisa
//   const response = await fetch(
//     "https://nextjs-course-28060-default-rtdb.firebaseio.com/events.json"
//   );
//   const data = await response.json();

//   const events = [];
//   for (const key in data) {
//     // spread operator ...data[key] żeby nie przepisywać wszystkich kluczy z bazy recznie
//     events.push({ id: key, ...data[key] });
//   }

//   return events;
// }

// export async function getFeaturedEvents() {
//   const allEvents = await getAllEvents();
//   return allEvents.filter((event) => event.isFeatured);
// }

// export async function getEventById(id) {
//   const allEvents = await getAllEvents();
//   return allEvents.filter((event) => event.id === id);
// }


// export async function getFilteredEvents(dateFilter) {
//   const { year, month } = dateFilter;

//   const allEvents = await getAllEvents();

//   let filteredEvents = allEvents.filter((event) => {
//     const eventDate = new Date(event.date);
//     return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
//   });

//   return filteredEvents;
// }

// bo baza coś muli

const DUMMY_EVENTS = [
  {
    id: 'e1',
    title: 'Programming for everyone',
    description:
      'Everyone can learn to code! Yes, everyone! In this live event, we are going to go through all the key basics and get you started with programming as well.',
    location: 'Somestreet 25, 12345 San Somewhereo',
    date: '2021-05-12',
    image: 'images/coding-event.jpg',
    isFeatured: false,
  },
  {
    id: 'e2',
    title: 'Networking for introverts',
    description:
      "We know: Networking is no fun if you are an introvert person. That's why we came up with this event - it'll be so much easier. Promised!",
    location: 'New Wall Street 5, 98765 New Work',
    date: '2021-05-30',
    image: 'images/introvert-event.jpg',
    isFeatured: true,
  },
  {
    id: 'e3',
    title: 'Networking for extroverts',
    description:
      'You probably need no help with networking in general. But focusing your energy correctly - that is something where most people can improve.',
    location: 'My Street 12, 10115 Broke City',
    date: '2022-04-10',
    image: 'images/extrovert-event.jpg',
    isFeatured: true,
  },
];

export function getFeaturedEvents() {
  return DUMMY_EVENTS.filter((event) => event.isFeatured);
}

export function getAllEvents() {
  return DUMMY_EVENTS;
}

export function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  let filteredEvents = DUMMY_EVENTS.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  return filteredEvents;
}

export function getEventById(id) {
  return DUMMY_EVENTS.find((event) => event.id === id);
}