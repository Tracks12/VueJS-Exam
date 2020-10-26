class store {
  static load(data) {
    return JSON.parse(atob(data));
  }

  static save(data) {
    return btoa(JSON.stringify(data));
  }
}

const appView = {
  template: `
		<aside>
			<p>{{ tasks.length }} task<span v-if="tasks.length > 1">s</span> to do</p>
			<ul>
				<li v-for="task in tasks">
					<label><span class="infoHolder">{{ new Date(task.id).toLocaleString() }}</span>{{ task.label }}</label>
					<button class="warn" @click="delTask(task)">
						<span class="mdi mdi-trash-can mdi-24px"></span>
					</button>
				</li>
			</ul>
			<form>
				<div class="inputBox">
					<span class="mdi mdi-note-plus mdi-24px"></span>
					<input type="text" id="task" v-model="task" required />
					<label>add task</label>
				</div>
				<input type="submit" value="add" @click.prevent="addTask" />
			</form>
		</aside>
	`,

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
