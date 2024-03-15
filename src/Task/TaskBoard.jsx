import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import NoTaskFound from "./NoTaskFound";
import SearchTask from "./SearchTask";
import TaskAction from "./TaskAction";
import TaskList from "./TaskList";

export default function TaskBoard() {
    const defaultTask = {
        id: crypto.randomUUID(),
        title: "Learn React",
        description:
            "I want to Learn React such than I can treat it like my salve",
        tags: ["web", "React", "JS"],
        priority: "High",
        isFavorite: false,
    };
    const [tasks, setTasks] = useState([defaultTask]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [taskToUpdate, setTaskToUpdate] = useState(null);
    function HandelAddEditTask(newTask, isAdd) {
        if (isAdd) {
            setTasks([...tasks, newTask]);
        } else {
            setTasks(
                tasks.map((task) => {
                    if (task.id === newTask.id) {
                        return newTask;
                    }
                    return task;
                })
            );
        }

        setShowAddModal(false);
    }
    function handelEditTask(task) {
        setTaskToUpdate(task);
        setShowAddModal(true);
    }
    function HandelCloseClick() {
        setShowAddModal(false);
        setTaskToUpdate(null);
    }
    function handelDeleteTask(taskID) {
        const taskAfterDelete = tasks.filter((task) => task.id !== taskID);
        setTasks(taskAfterDelete);
    }
    function handelDeleteAllTask() {
        tasks.length = 0;
        setTasks([...tasks]);
    }
    function handelFavorite(taskId) {
        const taskIndex = tasks.findIndex((task) => task.id === taskId);
        const newTask = [...tasks];
        newTask[taskIndex].isFavorite = !newTask[taskIndex].isFavorite;
        setTasks(newTask);
    }
    function handelSearch(searchTerm) {
        console.log(searchTerm);
        const filtered = tasks.filter((task) =>
            task.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setTasks([...filtered]);
    }
    return (
        <section className="mb-20" id="tasks">
            {showAddModal && (
                <AddTaskModal
                    onSave={HandelAddEditTask}
                    onCloseClick={HandelCloseClick}
                    taskToUpdate={taskToUpdate}
                />
            )}
            <div className="container">
                <div className="p-2 flex justify-end">
                    <SearchTask onSearch={handelSearch} />
                </div>
                <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
                    <TaskAction
                        onAddClick={() => setShowAddModal(true)}
                        onDeleteAllClick={handelDeleteAllTask}
                    />
                    {tasks.length > 0 ? (
                        <TaskList
                            tasks={tasks}
                            onDelete={handelDeleteTask}
                            onEdit={handelEditTask}
                            onFav={handelFavorite}
                        />
                    ) : (
                        <NoTaskFound />
                    )}
                </div>
            </div>
        </section>
    );
}
