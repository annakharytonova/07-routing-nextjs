"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotesByTag } from "@/lib/api";
import { useParams } from "next/navigation";

// import { useDebounce } from "use-debounce";

// import Pagination from "@/components/Pagination/Pagination";
// import SearchBox from "@/components/SearchBox/SearchBox";
// import Modal from "@/components/Modal/Modal";
// import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";

function NotesClient() {
  const { slug } = useParams<{ slug: string[] }>();
  const tag = slug[0] === "all" ? undefined : slug[0];

  const { data, isSuccess } = useQuery({
    queryKey: ["notes", tag],
    queryFn: () => fetchNotesByTag(tag),
  });
  if (!isSuccess) return null;

  return <NoteList notes={data.notes} />;
}

export default NotesClient;
