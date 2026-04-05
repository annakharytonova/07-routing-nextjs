import axios from "axios";

import type { Note } from "../types/note";
import type { CreateNoteParam } from "../types/note";

interface NotesParam {
  notes: Note[];
  totalPages: number;
}

const url = "https://notehub-public.goit.study/api/notes";

export async function fetchNotes(
  query: string,
  page: number,
  tag?: string,
): Promise<NotesParam> {
  const optionsNote = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
    params: {
      search: query,
      page,
      perPage: 12,
      tag,
    },
  };
  const response = await axios.get<NotesParam>(url, optionsNote);
  return response.data;
}

export async function createNote(newNote: CreateNoteParam): Promise<Note> {
  const optionsCreate = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  };
  const response = await axios.post<Note>(url, newNote, optionsCreate);
  return response.data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const optionsDelete = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  };
  const response = await axios.delete<Note>(`${url}/${noteId}`, optionsDelete);
  return response.data;
}

export async function fetchNoteById(noteId: string): Promise<Note> {
  const optionsNoteById = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  };
  const response = await axios.get<Note>(`${url}/${noteId}`, optionsNoteById);
  return response.data;
}
