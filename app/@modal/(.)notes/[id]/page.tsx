import { fetchNoteById } from "@/lib/api";

import NotePreview from "@/components/NotePreview/NotePreview";
import Modal from "@/components/Modal/Modal";

type Props = {
  params: Promise<{ id: string }>;
};

const NoteModalPage = async ({ params }: Props) => {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return (
    <>
      <Modal>
        <NotePreview note={note} />
      </Modal>
    </>
  );
};

export default NoteModalPage;
