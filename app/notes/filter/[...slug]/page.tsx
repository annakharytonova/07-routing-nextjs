import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

interface NotesFiltersProps {
  params: Promise<{ slug: string[] }>;
}

const NotesFilters = async ({ params }: NotesFiltersProps) => {
  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : slug[0];
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag],
    queryFn: () => fetchNotes("", 1, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesFilters;

// interface NotesFiltersProps {
//   params: Promise<{ slug: string[] }>;
// }

// export default async function NotesFilters({ params }: NotesFiltersProps) {
//   const { slug } = await params;
//   const tagValue = slug[0] === "all" ? undefined : slug[0];
//   const response = await fetchNotes("", 1, tagValue);

//   return (
//     <div>
//       <NoteList notes={response.notes} />
//     </div>
//   );
// }
