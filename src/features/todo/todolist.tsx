import React, {useState, useEffect} from "react";
import { getTodosAsync, createTodoAsync, updateTodoAsync, deleteTodoAsync, selectTodos } from "./todoSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { Todo } from "../../type/todo";
import { log } from "console";

const Todolist: React.FC = ()=>{
    const dispatch = useAppDispatch();
    const todos = useAppSelector(selectTodos);
    console.log(todos);
    

    const [newTodo, setNewTodo] = useState<string>("");
    const [editId, setEditId] = useState<string | null>(null);
    const [editInput, setEditInput] = useState<string>("");

    useEffect(()=>{
        dispatch(getTodosAsync());
    },[dispatch]);

    const handleSubmit = ()=>{
        dispatch(createTodoAsync({content: newTodo}));
        dispatch(getTodosAsync());
        setNewTodo("");
    };

    const handleEdit = (id:string) =>{
        if(editId === id){
            dispatch(updateTodoAsync({id:id, content: editInput}));
            setEditInput("");
            setEditId(null);
            dispatch(getTodosAsync());
        }else{
            const todo = todos.find((todo) => todo.id === id);
            if(todo){
                setEditInput(todo.content);
            }
            setEditId(id);
        }

    }

    const handleDelete = (id:string)=>{
        dispatch(deleteTodoAsync({id}));
        dispatch(getTodosAsync());
    }

    return(
        <div className='todo-container'>
        <div className='todo-form'>
            <input value={newTodo} onChange={(event)=>{setNewTodo(event.target.value)}}/>
            <button onClick={handleSubmit}>submit</button>
        </div>
        <div className='todo-list'>
            <ul>
                {todos.map((item)=>{
                    const isEdit = item.id === editId;
                    return (
                        <li key={item.id}>
                            {/* edit or not */}
                            {isEdit 
                            ? (<input value={editInput} onChange={(event)=>setEditInput(event.target.value)}/>) 
                            : (<span>{item.content}</span>)}
                            <button onClick={()=>handleEdit(item.id!)}> 
                                {editId===item.id ? "save" : "edit"}
                            </button>
                            <button onClick={()=>{handleDelete(item.id!)}}>delete</button>
                        </li>
                    );
                })}
            </ul>
        </div>
    </div>
    );
}

export default Todolist;
