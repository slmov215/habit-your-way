class Editor {
  constructor() {
    this.habitList = [];
    this.loadHabits();
    this.render();
  }

  loadHabits() {
    // You can load habits from a database or any other data source here
    // For simplicity, we'll use a static list of habits
    this.habitList = [
      { id: 1, name: 'Exercise', streak: 5 },
      { id: 2, name: 'Read', streak: 3 },
      // Add more habits as needed
    ];
  }

  render() {
    // Render the list of habits on the web page
    const habitListElement = document.querySelector('#habit-list');
    habitListElement.innerHTML = '';

    this.habitList.forEach((habit) => {
      const habitElement = document.createElement('div');
      habitElement.innerHTML = `
        <div>ID: ${habit.id}</div>
        <div>Name: ${habit.name}</div>
        <div>Streak: ${habit.streak}</div>
      `;
      habitListElement.appendChild(habitElement);
    });
  }
}

export default Editor;
