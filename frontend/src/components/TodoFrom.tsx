import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { addtodo } from "../service/client";


const TodoForm: React.FC = () => {
    const [todo, setTodo] = useState("");
    const queryClient = useQueryClient();
    const { mutate, isError, error, isPending } = useMutation({
        mutationKey: ["todos"],
        mutationFn: addtodo,
        onSuccess: () => {
            setTodo("");
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },

        onError: (error) => {
            alert("Error adding todo: " + (error instanceof Error ? error.message : "Unknown error"));
        }
    });

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();

        if (todo.length === 0) {
            alert("Todo cannot be empty");
        } else {
            console.log(todo)
            mutate({ title: todo });
        }
    };



    return (
        <div className="mb-6">
            <form onSubmit={submitHandler} className="flex space-x-3">
                <label htmlFor="todo" className="sr-only">Todo</label>
                <input
                    type='text'
                    id='todo'
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    className='border border-gray-300 p-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    placeholder="Add a new todo"
                />
                <button
                    type="submit"
                    className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200'
                    disabled={isPending}
                >
                    {isPending ? "Adding..." : "Add Todo"}
                </button>
            </form>
            {isError && <p className="text-red-500 mt-2">{error instanceof Error ? error.message : "Error occurred"}</p>}
        </div>
    );
};

export default TodoForm;
