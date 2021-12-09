import Request from "./common/request.js";
import Store from "./common/store.js";

const appView = {
	template: Request.get("/views/todo.html"),

  methods: {
    addTask() {
			if(!this.task) {
				document.getElementById("task").focus();
				return false;
			}

			let task = {
				id: Date.now(),
				label: this.task,
				checked: false
			};

			this.tasks.push(task);
			this.task = null;

			localStorage.tasks = Store.save(this.tasks);
		},

		checkTask(task) {
			task.checked = !task.checked;

			localStorage.tasks = Store.save(this.tasks);
		},

		editTask(task) {
			console.log(`Edit task: ${task.id}`);
		},

		moveToTrash(task) {
			this.tasks.forEach((v, k) => {
				if(v.id === task.id) this.tasks.splice(k, 1);

				localStorage.tasks = Store.save(this.tasks);
			});

			this.trash.push(task);

			localStorage.trash = Store.save(this.trash);
		},

		undoMoveToTrash() {
			this.tasks.push(this.trash[this.trash.length-1]);
			this.trash.pop();

			localStorage.trash = Store.save(this.trash);
			localStorage.tasks = Store.save(this.tasks);
		}
  },

	data() {
		return {
			task: null,
			tasks: localStorage.tasks ? Store.load(localStorage.tasks) : [],
			trash: localStorage.trash ? Store.load(localStorage.trash) : [],
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
	// app.unmount();
};

/**
 * END
 */
