import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { db } from "../firebase";

function UpdateDeleteButtons({ id, setSelected, session, pageTitle }) {
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
