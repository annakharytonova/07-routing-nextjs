"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { useState } from "react";
import { useDebounce } from "use-debounce";

import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import css from "@/components/NoteForm/NoteForm.module.css";

interface NotesClientProps {
  tag: string | undefined;
}

function NotesClient({ tag }: NotesClientProps) {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isSuccess } = useQuery({
    queryKey: ["notes", debouncedSearch, page, tag],
    queryFn: () => fetchNotes(debouncedSearch, page, tag),
    placeholderData: keepPreviousData,
  });
  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const totalPages = data?.totalPages ?? 0;

  return (
    <div>
      <header>
        <SearchBox value={search} onChange={handleSearch} />
        {totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            handlePageChange={({ selected }) => setPage(selected + 1)}
          />
        )}
        <div className={css.actions}>
          <button
            onClick={() => setIsModalOpen(true)}
            className={css.submitButton}
          >
            Create note +
          </button>
        </div>
      </header>
      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isModalOpen && (
        <Modal>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

export default NotesClient;
