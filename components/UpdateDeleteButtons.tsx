import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { Session } from "next-auth";

type UpdateDeleteButtonsProps = {
  id: string,
  setSelected: (val: string | null) => void
  session: Session
  pageTitle: string
}

function UpdateDeleteButtons({ id, setSelected, session, pageTitle }: UpdateDeleteButtonsProps) {
  const deleteDocument = async (id) => {
    await deleteDoc(doc(db, "users", session.user.uid, pageTitle, id));
  };
  return (
    <div className="flex justify-between">
      <button
        onClick={() => setSelected(id)}
        className="updateDeleteButtons updateButton"
      >
        update
      </button>
      <button
        onClick={() => deleteDocument(id)}
        className="updateDeleteButtons deleteButton"
      >
        delete
      </button>
    </div>
  );
}

export default UpdateDeleteButtons;
