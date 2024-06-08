import {Todo} from '../type/todo';

const baseURL: string = "http://localhost:3300/todos";

export const getTodos = async (): Promise<Todo[]> => {
    return fetch(baseURL)
        .then((res) => res.json());
};

export const createTodo = async (newTodo: Omit<Todo, 'id'>): Promise<Todo> => {
    return fetch(baseURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
    }).then((res) => res.json());
};

export const updateTodo = async (id: string, partialTodo: Partial<Todo>): Promise<Todo> => {
    return fetch(`${baseURL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(partialTodo),
    }).then((res) => res.json());
};

export const deleteTodo = async (id: string): Promise<void> => {
    return fetch(`${baseURL}/${id}`, { method: "DELETE" })
        .then((res) => res.json());
};