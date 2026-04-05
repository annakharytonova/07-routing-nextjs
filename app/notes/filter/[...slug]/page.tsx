import { fetchNotesByTag } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";

interface NotesFiltersProps {
  params: Promise<{ slug: string[] }>;
}

export default async function NotesFilters({ params }: NotesFiltersProps) {
  const { slug } = await params;
  const tagValue = slug[0] === "all" ? undefined : slug[0];
  const response = await fetchNotesByTag(tagValue);

  return (
    <div>
      <NoteList notes={response.notes} />
    </div>
  );
}
