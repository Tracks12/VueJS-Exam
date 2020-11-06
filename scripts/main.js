class store {
  static load(data) {
    return JSON.parse(atob(data));
  }

  static save(data) {
    return btoa(JSON.stringify(data));
  }
}

const toDoList = new XMLHttpRequest();
toDoList.open("GET", "/views/todo.html", false);
toDoList.send();

const appView = {
  template: toDoList.responseText,

  methods: {
    addTask() {
      if (!this.task) {
        document.getElementById("task").focus();

        return false;
      }

      let task = {
        id: Date.now(),
        label: this.task,
      };

      this.tasks.push(task);
      this.task = null;

      localStorage.tasks = store.save(this.tasks);
    },

    delTask(task) {
      this.tasks.forEach((v, k) => {
        if (v.id === task.id) this.tasks.splice(k, 1);

        localStorage.tasks = store.save(this.tasks);
      });
    },
  },

  data() {
    return {
      task: null,
      tasks: localStorage.tasks ? store.load(localStorage.tasks) : [],
    };
  },
};

window.onload = () => {
  const app = Vue.createApp({
    components: {
      "app-view": appView,
    },

    data() {
      return {
        app: {
          title: "to do list",
          version: "1.0",
        },
      };
    },
  });

  app.mount("#app");
  //app.unmount();
};

/**
 * END
 */
