// src/App.tsx

import React, { useEffect, useState } from "react";
import "./App.css";
import ReminderList from "./components/ReminderList";
import Reminder from "./models/Reminder";
import reminderService from "./services/reminders";
import NewReminder from "./components/NewReminder";

function App() {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    const reminders = await reminderService.getReminders();
    setReminders(reminders);
  };

  const removeReminder = (id: number) => {
    console.log(`remove reminder n° ${id}`);
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };
  const addReminder = async (title: string) => {
    console.log(`add reminder in App.tsx ${title}`);
    const newReminder = await reminderService.addReminder(title);
    setReminders([newReminder, ...reminders]);
  };

  return (
    <div className="App">
      <NewReminder onAddReminder={addReminder} />
      <ReminderList onRemoveReminder={removeReminder} items={reminders} />
    </div>
  );
}

export default App;
