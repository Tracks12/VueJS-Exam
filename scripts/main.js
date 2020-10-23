import "/scripts/jquery-3.5.1.js";

const appView = {
  template: `
		<aside>
			<p>{{ tasks.length }} tasks to do</p>
			<div>
				<ul>
					<li v-for="task in tasks">
						<label>{{ task.label }}</label>
						<button @click="delTask(task)">
							<span class="mdi mdi-trash-can mdi-24px"></span>
						</button>
					</li>
				</ul>
			</div>
			<form>
				<div class="inputBox">
					<span class="mdi mdi-note-plus mdi-24px"></span>
					<input type="text" v-model="task" required />
					<label>add task</label>
				</div>
				<input type="submit" value="add" @click.prevent="addTask" />
			</form>
		</aside>
	`,

  methods: {
    addTask() {
      if (!this.task) return false;

      let task = {
        id: this.tasklog + 1,
        label: this.task,
      };

      this.tasklog++;
      this.tasks.push(task);
      this.task = null;

      localStorage.tasklog = this.tasklog;
      localStorage.tasks = btoa(JSON.stringify(this.tasks));
    },

    delTask(task) {
      this.tasks.forEach((v, k) => {
        if (v.id === task.id) this.tasks.splice(k, 1);

        localStorage.tasks = btoa(JSON.stringify(this.tasks));
      });
    },
  },

  data() {
    return {
      task: "",
      tasklog: localStorage.tasklog ? localStorage.tasklog : 0,
      tasks: localStorage.tasks ? JSON.parse(atob(localStorage.tasks)) : [],
    };
  },
};

$(document).ready(() => {
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
});
