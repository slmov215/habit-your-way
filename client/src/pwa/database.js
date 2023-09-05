const DATABASE_KEY = 'habit_data';

export const saveHabitsToDatabase = (habits) => {
  // Save habits to localStorage or your preferred data storage mechanism
  localStorage.setItem(DATABASE_KEY, JSON.stringify(habits));
};

export const loadHabitsFromDatabase = () => {
  // Load habits from localStorage or your preferred data storage mechanism
  const data = localStorage.getItem(DATABASE_KEY);
  return data ? JSON.parse(data) : [];
};
