import tasksData from "@/services/mockData/tasks.json";

class TaskService {
  constructor() {
    this.storageKey = "flowtasks_tasks";
    this.initializeData();
  }

  initializeData() {
    const storedTasks = localStorage.getItem(this.storageKey);
    if (!storedTasks) {
      localStorage.setItem(this.storageKey, JSON.stringify(tasksData));
    }
  }

  getStoredTasks() {
    const tasks = localStorage.getItem(this.storageKey);
    return tasks ? JSON.parse(tasks) : [];
  }

  saveTasks(tasks) {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks = this.getStoredTasks();
        resolve([...tasks]);
      }, 250);
    });
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const tasks = this.getStoredTasks();
        const task = tasks.find(task => task.id === id);
        if (task) {
          resolve({ ...task });
        } else {
          reject(new Error(`Task with id ${id} not found`));
        }
      }, 200);
    });
  }

  async create(taskData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const tasks = this.getStoredTasks();
          const maxId = tasks.reduce((max, task) => {
            const taskId = parseInt(task.id);
            return taskId > max ? taskId : max;
          }, 0);
          
          const newTask = {
            ...taskData,
            id: (maxId + 1).toString(),
            status: "active",
            createdAt: new Date().toISOString(),
            completedAt: null
          };
          
          tasks.push(newTask);
          this.saveTasks(tasks);
          resolve({ ...newTask });
        } catch (error) {
          reject(error);
        }
      }, 300);
    });
  }

  async update(id, updates) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const tasks = this.getStoredTasks();
          const index = tasks.findIndex(task => task.id === id);
          
          if (index === -1) {
            reject(new Error(`Task with id ${id} not found`));
            return;
          }
          
          const updatedTask = {
            ...tasks[index],
            ...updates
          };
          
          // Handle status change to completed
          if (updates.status === "completed" && tasks[index].status !== "completed") {
            updatedTask.completedAt = new Date().toISOString();
          } else if (updates.status === "active") {
            updatedTask.completedAt = null;
          }
          
          tasks[index] = updatedTask;
          this.saveTasks(tasks);
          resolve({ ...updatedTask });
        } catch (error) {
          reject(error);
        }
      }, 300);
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const tasks = this.getStoredTasks();
          const index = tasks.findIndex(task => task.id === id);
          
          if (index === -1) {
            reject(new Error(`Task with id ${id} not found`));
            return;
          }
          
          const deletedTask = tasks[index];
          tasks.splice(index, 1);
          this.saveTasks(tasks);
          resolve({ ...deletedTask });
        } catch (error) {
          reject(error);
        }
      }, 250);
    });
  }

  async toggleComplete(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const task = await this.getById(id);
        const newStatus = task.status === "completed" ? "active" : "completed";
        const updatedTask = await this.update(id, { status: newStatus });
        resolve(updatedTask);
      } catch (error) {
        reject(error);
      }
});
  }

  async reorderTasks(taskIds) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const tasks = this.getStoredTasks();
          
          // Create a map of task IDs to their new order
          const orderMap = {};
          taskIds.forEach((id, index) => {
            orderMap[id] = index;
          });
          
          // Update order field for each task
          const updatedTasks = tasks.map(task => {
            if (orderMap.hasOwnProperty(task.id)) {
              return {
                ...task,
                order: orderMap[task.id]
              };
            }
            return task;
          });
          
          this.saveTasks(updatedTasks);
          resolve(updatedTasks);
        } catch (error) {
          reject(error);
        }
      }, 200);
    });
  }
}

export default new TaskService();