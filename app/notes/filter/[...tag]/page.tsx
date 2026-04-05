import { fetchNotesByTag } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";

interface NotesFiltersProps {
  params: Promise<{ tag: string[] }>;
}

export default async function NotesFilters({ params }: NotesFiltersProps) {
  const { tag } = await params;
  const tagValue = tag[0] === "all" ? undefined : tag[0];
  const response = await fetchNotesByTag(tagValue);

  return (
    <div>
      <NoteList notes={response.notes} />
    </div>
  );
}
