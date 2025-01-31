<template>
  <header>
    <div class="board-container">
      <!-- Board Header Section (Board Name + Add Column + Board Members) -->
      <div class="board-header">
        <div class="board-info">
          <h3 class="board-name" @click="renameBoard">
            <span class="board-title">{{ boardName }}</span>
            <button class="rename-board-btn">✏️</button>
          </h3>
          <button class="add-column-btn" @click="addColumn">+ Add Column</button>
        </div>
        <div class="board-users">
          <p><strong>Board members:</strong> {{ boardUsers.join(", ") }}</p>
          <button class="add-user-btn" @click="addUser">➕ Add User</button>
        </div>
      </div>

      <!-- Kanban Columns -->
      <div class="columns">
        <div v-for="(column, colIndex) in columns" :key="colIndex" class="column">
          <div class="column-header">
            <h3>{{ column.name }}</h3>
            <div class="column-actions">
              <button class="rename-column-btn" @click="renameColumn(colIndex)">✏️</button>
              <button class="delete-column-btn" @click="deleteColumn(colIndex)">❌</button>
            </div>
          </div>

          <!-- Task List -->
          <ul class="task-list">
            <li v-for="(task, taskIndex) in column.tasks" :key="taskIndex" class="task">
              <div class="task-header">
                <span>{{ task.name }}</span>
                <div class="task-actions">
                  <button class="rename-task-btn" @click="renameTask(colIndex, taskIndex)">✏️</button>
                  <button class="delete-task-btn" @click="deleteTask(colIndex, taskIndex)">❌</button>
                  <button class="move-task-btn" @click="moveTask(colIndex, taskIndex)">➡️</button>
                </div>
              </div>

              <!-- Tags Section -->
              <div class="task-tags">
                <span v-for="(tag, tagIndex) in task.tags" :key="tagIndex" class="tag">
                  {{ tag }}
                  <button class="remove-tag-btn" @click="removeTag(colIndex, taskIndex, tagIndex)">❌</button>
                </span>
              </div>
              <button class="add-tag-btn" @click="addTag(colIndex, taskIndex)">➕ Add Tag</button>
            </li>
          </ul>

          <!-- Add Task Button -->
          <button class="add-task-btn" @click="addTask(colIndex)">➕ Add Task</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      boardName: "Board Name", // Default board name
      columns: [
        { name: "To-Do", tasks: [] },
        { name: "In Progress", tasks: [] },
        { name: "Done", tasks: [] }
      ],
      boardUsers: ["User1", "User2"]
    };
  },
  methods: {
    renameBoard() {
      const newBoardName = prompt("Enter new board name:", this.boardName);
      if (newBoardName) {
        this.boardName = newBoardName;
      }
    },
    addColumn() {
      const newColumnName = prompt("Enter column name:");
      if (newColumnName) {
        this.columns.push({ name: newColumnName, tasks: [] });
      }
    },
    renameColumn(index) {
      const newColumnName = prompt(`Rename column "${this.columns[index].name}" to:`);
      if (newColumnName) {
        this.columns[index].name = newColumnName;
      }
    },
    deleteColumn(index) {
      if (confirm(`Are you sure you want to delete "${this.columns[index].name}"?`)) {
        this.columns.splice(index, 1);
      }
    },
    addUser() {
      const newUser = prompt("Enter new user name:");
      if (newUser) {
        this.boardUsers.push(newUser);
      }
    },
    addTask(columnIndex) {
      const newTaskName = prompt(`Enter task for "${this.columns[columnIndex].name}":`);
      if (newTaskName) {
        this.columns[columnIndex].tasks.push({ name: newTaskName, tags: [] });
      }
    },
    renameTask(columnIndex, taskIndex) {
      const newTaskName = prompt(`Rename task "${this.columns[columnIndex].tasks[taskIndex].name}" to:`);
      if (newTaskName) {
        this.columns[columnIndex].tasks[taskIndex].name = newTaskName;
      }
    },
    deleteTask(columnIndex, taskIndex) {
      if (confirm(`Are you sure you want to delete this task?`)) {
        this.columns[columnIndex].tasks.splice(taskIndex, 1);
      }
    },
    moveTask(columnIndex, taskIndex) {
      const targetColumnIndex = parseInt(prompt(`Move to column (Enter number 0-${this.columns.length - 1}):`));
      if (targetColumnIndex >= 0 && targetColumnIndex < this.columns.length) {
        const task = this.columns[columnIndex].tasks.splice(taskIndex, 1)[0];
        this.columns[targetColumnIndex].tasks.push(task);
      } else {
        alert("Invalid column number.");
      }
    },
    addTag(columnIndex, taskIndex) {
      const newTag = prompt("Enter a tag:");
      if (newTag) {
        this.columns[columnIndex].tasks[taskIndex].tags.push(newTag);
      }
    },
    removeTag(columnIndex, taskIndex, tagIndex) {
      this.columns[columnIndex].tasks[taskIndex].tags.splice(tagIndex, 1);
    }
  }
};
</script>

<style scoped>
/* Board Container */
.board-container {
  padding: 20px;
  max-width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Board Header (Rounded Box) */
.board-header {
  background-color: #666;
  padding: 15px;
  border-radius: 15px;
  width: 90%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

/* Board Info */
.board-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

/* Board Name */
.board-name {
  font-size: 24px;
  font-weight: bold;
  color: black;
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #00c853;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
}

/* Rename Board Button */
.rename-board-btn {
  background-color: #ffcc00;
  border: none;
  font-size: 14px;
  cursor: pointer;
  padding: 5px 8px;
  border-radius: 4px;
}

/* Add Column Button */
.add-column-btn {
  background-color: #33ff99;
  color: #fff;
  border: none;
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

/* Rename and Delete Buttons */
.column-actions {
  display: flex;
  gap: 5px;
}

.rename-column-btn {
  background-color: #ffcc00;
  color: black;
  border: none;
  font-size: 14px;
  cursor: pointer;
  padding: 5px 8px;
  border-radius: 4px;
}

.delete-column-btn {
  background-color: #d4abab;
  color: white;
  border: none;
  font-size: 14px;
  cursor: pointer;
  padding: 5px 8px;
  border-radius: 4px;
}

/* Kanban Columns */
.columns {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
}

/* Individual Column */
.column {
  background-color: #888;
  padding: 15px;
  border-radius: 15px;
  width: 250px;
  min-height: 400px;
  text-align: center;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Column Header */
.column-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

/* Task List */
.task-list {
  list-style: none;
  padding: 0;
  margin: 10px 0;
  width: 100%;
}

/* Task */
.task {
  background-color: #444;
  padding: 8px;
  margin: 5px 0;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

/* Task Actions */
.task-actions {
  display: flex;
  gap: 5px;
}

/* Add Task Button */
.add-task-btn {
  background-color: #28a745;
  color: white;
  border: none;
  font-size: 14px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
  margin-top: 10px;
}

/* Task Tags */
.task-tags {
  margin-top: 5px;
}

.tag {
  background-color: #ffcc00;
  color: black;
  border-radius: 5px;
  padding: 3px 6px;
  margin-right: 5px;
  display: inline-flex;
  align-items: center;
}

.remove-tag-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  margin-left: 5px;
}
</style>
