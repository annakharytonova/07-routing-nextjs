"use client";

import css from "./NotePreview.module.css";
import { useRouter } from "next/navigation";

import type { Note } from "@/types/note";

interface NotePreviewProps {
  note: Note;
}

export default function NotePreview({ note }: NotePreviewProps) {
  const router = useRouter();
  const closeModal = () => router.back();
  return (
    <div className={css.container}>
      <button className={css.backBtn} onClick={closeModal}>
        Close
      </button>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.tag}>{note.tag}</p>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.createdAt}</p>
      </div>
    </div>
  );
}
