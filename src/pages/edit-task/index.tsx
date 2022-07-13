import { observer } from "mobx-react-lite";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { TaskForm } from "../../lib/components/task-form";
import { useStore } from "../../stores/store";

function EditTaskComponent() {
  const navigate = useNavigate();
  const store = useStore();

  const handleSubmit = useCallback((description: string) => {
    if (store.editingTask) {
      store.editingTask.editTask(description);
    }

    navigate("/");
  }, []);

  return (
    <TaskForm
      onSubmit={handleSubmit}
      {...(store.editingTask
        ? { defaultValue: store.editingTask.description }
        : {})}
      isEditing
    />
  );
}

export const EditTask = observer(EditTaskComponent);
