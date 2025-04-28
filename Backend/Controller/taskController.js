import Task from "../Model/TaskModel.js";

export const getTask = async (req, res) => {
  try {
    const task = await Task.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(task);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const addTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const newTask = new Task({ ...req.body, userId });
    await newTask.save();
    res.status(201).json({ message: "Task added", newTask });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findByIdAndUpdate(
      taskId,
      { ...req.body },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(201).json({ message: "Task updated", task });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.status = task.status === "active" ? "completed" : "active";

    await task.save();

    res.status(201).json({ message: "Status updated", task });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
