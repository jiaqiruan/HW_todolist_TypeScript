import { Todo } from "../../type/todo";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getTodos, createTodo, deleteTodo, updateTodo } from "../../API/todoAPI";
import { RootState, AppThunk } from "../../app/store";

interface TodoState {
    todos: Todo[];
}

const getTodosAsync = createAsyncThunk<Todo[]>("todos/getTodos", async ()=>{
    const response = await getTodos();
    return response;
});

const createTodoAsync = createAsyncThunk<Todo, Omit<Todo, 'id'>>("todos/createTodo",async(payload)=>{
    const response = await createTodo(payload);
    return response;
});

const updateTodoAsync = createAsyncThunk<Todo, { id: string; content: string }>("todos/updateTodo", async(payload)=>{
    const response = await updateTodo(payload.id,{content: payload.content});
    return response;
});

const deleteTodoAsync = createAsyncThunk<string, { id: string }>("todos/deleteTodo",async(payload)=>{
    const id = payload.id;
    const response = await deleteTodo(id);
    return id;
});

const initialState: TodoState = {
    todos: [],
};

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {

    },
    extraReducers: (builder)=>{
        builder
        .addCase(getTodosAsync.fulfilled, (state,action)=>{
            state.todos = action.payload;
        })
        .addCase(createTodoAsync.fulfilled, (state,action)=>{
            state.todos = [action.payload, ...state.todos];
        })
        .addCase(updateTodoAsync.fulfilled, (state,action)=>{

            state.todos = state.todos.map((item)=>{
                if(item.id === action.payload.id){
                    return {...item, content: action.payload.content};
                }else{
                    return item;
                }
            });
        })
        .addCase(deleteTodoAsync.fulfilled, (state, action)=>{
            state.todos = state.todos.filter((item)=>{
                return item.id !== action.payload;
            });
        });
    },
});

export { getTodosAsync, createTodoAsync, updateTodoAsync, deleteTodoAsync };

export const selectTodos = (state: RootState) => state.todos.todos;

export default todoSlice.reducer;