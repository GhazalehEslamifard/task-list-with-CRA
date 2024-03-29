import { destroy, types } from "mobx-state-tree";
import { useContext, createContext } from "react";

import { taskList } from "../mock-data/mockData";
import { TaskType, StoreType, Filter } from "../types";

import { Task } from "./task";

export const Store = types
  .model("Tasks", {
    tasks: types.array(Task),
    editingTask: types.maybe(types.reference(Task)),
    filter: types.optional(
      types.enumeration<Filter>(Object.values(Filter)),
      Filter.All
    ),
  })
  .actions((self) => ({
    deleteTasks(tasks: TaskType[]) {
      tasks.map((task) => destroy(task));
    },
    createTask(description: string) {
      self.tasks.push(Task.create({ description }));
    },
    setEditingTask(task: TaskType | undefined) {
      self.editingTask = task;
    },
    setFilter(filter: Filter) {
      self.filter = filter;
    },
  }))
  .views((self) => ({
    get filteredTasks() {
      switch (self.filter) {
        case Filter.All:
          return self.tasks;
        case Filter.Important:
          return self.tasks.filter((task) => task.hasStarTag === true);
        default:
          return [];
      }
    },
  }));

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const StoreContext = createContext<StoreType>(null!);

export function useStore(): StoreType {
  return useContext(StoreContext);
}

export const store = Store.create({ tasks: taskList });
