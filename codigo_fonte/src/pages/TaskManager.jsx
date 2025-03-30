import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Sword } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export function TaskManager() {
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState("");
  const [newTaskName, setNewTaskName] = useState("");
  const [selectedList, setSelectedList] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedLists = localStorage.getItem("taskLists");
    if (savedLists) {
      setLists(JSON.parse(savedLists));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("taskLists", JSON.stringify(lists));
  }, [lists]);

  const addList = (e) => {
    e.preventDefault();
    if (!newListName.trim()) {
      toast({
        title: "Erro",
        description: "O nome da lista não pode estar vazio",
        variant: "destructive",
      });
      return;
    }

    const newList = {
      id: Date.now(),
      name: newListName,
      tasks: [],
    };

    setLists([...lists, newList]);
    setNewListName("");
    toast({
      title: "Sucesso",
      description: "Lista criada com sucesso",
    });
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTaskName.trim() || !selectedList) {
      toast({
        title: "Erro",
        description: "Selecione uma lista e digite um nome para a tarefa",
        variant: "destructive",
      });
      return;
    }

    const updatedLists = lists.map((list) => {
      if (list.id === selectedList) {
        return {
          ...list,
          tasks: [
            ...list.tasks,
            { id: Date.now(), name: newTaskName, completed: false },
          ],
        };
      }
      return list;
    });

    setLists(updatedLists);
    setNewTaskName("");
    toast({
      title: "Sucesso",
      description: "Tarefa adicionada com sucesso",
    });
  };

  const toggleTask = (listId, taskId) => {
    const updatedLists = lists.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          tasks: list.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          ),
        };
      }
      return list;
    });
    setLists(updatedLists);
  };

  const deleteList = (listId) => {
    setLists(lists.filter((list) => list.id !== listId));
    toast({
      title: "Lista removida",
      description: "A lista foi removida com sucesso",
    });
  };

  const deleteTask = (listId, taskId) => {
    const updatedLists = lists.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          tasks: list.tasks.filter((task) => task.id !== taskId),
        };
      }
      return list;
    });
    setLists(updatedLists);
    toast({
      title: "Tarefa removida",
      description: "A tarefa foi removida com sucesso",
    });
  };

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Lists Section */}
          <div className="space-y-4">
            <h2 className="medieval-title text-2xl text-primary mb-4">Suas Listas</h2>
            <form onSubmit={addList} className="flex gap-2 mb-4">
              <input
                type="text"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                placeholder="Nome da nova lista"
                className="flex-1 px-4 py-2 rounded bg-secondary text-secondary-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button type="submit">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar
              </Button>
            </form>

            <AnimatePresence>
              {lists.map((list) => (
                <motion.div
                  key={list.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="task-list p-4 rounded-lg mb-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <button
                      onClick={() => setSelectedList(list.id)}
                      className={`text-lg font-semibold ${
                        selectedList === list.id ? "text-primary" : "text-foreground"
                      }`}
                    >
                      <Sword className="w-4 h-4 inline mr-2" />
                      {list.name}
                    </button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => deleteList(list.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {list.tasks.length} tarefas
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Tasks Section */}
          <div className="space-y-4">
            <h2 className="medieval-title text-2xl text-primary mb-4">Tarefas</h2>
            <form onSubmit={addTask} className="flex gap-2 mb-4">
              <input
                type="text"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                placeholder="Nova tarefa"
                className="flex-1 px-4 py-2 rounded bg-secondary text-secondary-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button type="submit" disabled={!selectedList}>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar
              </Button>
            </form>

            <AnimatePresence>
              {selectedList &&
                lists
                  .find((list) => list.id === selectedList)
                  ?.tasks.map((task) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="task-list p-4 rounded-lg flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(selectedList, task.id)}
                          className="w-4 h-4 mr-3 accent-primary"
                        />
                        <span
                          className={`${
                            task.completed ? "line-through text-muted-foreground" : ""
                          }`}
                        >
                          {task.name}
                        </span>
                      </div>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => deleteTask(selectedList, task.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  ))}
            </AnimatePresence>

            {selectedList && 
              lists.find((list) => list.id === selectedList)?.tasks.length === 0 && (
              <div className="text-center text-muted-foreground p-8">
                Nenhuma tarefa ainda. Adicione uma nova tarefa!
              </div>
            )}

            {!selectedList && (
              <div className="text-center text-muted-foreground p-8">
                Selecione uma lista para ver suas tarefas
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}