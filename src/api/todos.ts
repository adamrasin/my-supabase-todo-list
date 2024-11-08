import { supabase } from '../supabaseClient';
import { Todo } from '../types';

export const fetchTodos = async (): Promise<Todo[]> => {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) throw new Error(error.message);
  return data as Todo[];
};

export const addTodo = async (text: string): Promise<void> => {
  const { error } = await supabase.from('todos').insert([{ text, completed: false }]);
  if (error) throw new Error(error.message);
};

export const toggleComplete = async (id: string, completed: boolean): Promise<void> => {
  const { error } = await supabase.from('todos').update({ completed }).eq('id', id);
  if (error) throw new Error(error.message);
};

export const deleteTodo = async (id: string): Promise<void> => {
  const { error } = await supabase.from('todos').delete().eq('id', id);
  if (error) throw new Error(error.message);
};