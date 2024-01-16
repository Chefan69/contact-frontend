import React, { useState } from "react";

// ContactCard.js
export default function ContactCard({ kontakt, onUpdate, onDelete }) {
  // Bearbeitungsmodus Status
  const [isEditing, setIsEditing] = useState(false);
  const [editKontakt, setEditKontakt] = useState(kontakt);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditKontakt(kontakt); // Zurücksetzen der Änderungen
  };

  const handleSave = () => {
    onUpdate(editKontakt);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(kontakt.id);
  };

  if (isEditing) {
    return (
      <div className="bearbeitungsFormular">
        {/* Bearbeitungsformular */}
        <input
          type="text"
          value={editKontakt.name}
          onChange={(e) =>
            setEditKontakt({ ...editKontakt, name: e.target.value })
          }
          placeholder="Name"
        />

        <input
          type="text"
          value={editKontakt.username}
          onChange={(e) =>
            setEditKontakt({ ...editKontakt, username: e.target.value })
          }
          placeholder="Username"
        />

        <input
          type="email"
          value={editKontakt.email}
          onChange={(e) =>
            setEditKontakt({ ...editKontakt, email: e.target.value })
          }
          placeholder="E-Mail"
        />

        {/* Weitere Felder für Username und E-Mail */}
        <button onClick={handleSave}>Speichern</button>
        <button onClick={handleCancel}>Abbrechen</button>
      </div>
    );
  }

  return (
    <div className="contactCard">
      <button className="button editButton" onClick={handleEdit}>Bearbeiten</button>
      <button className="button deleteButton" onClick={handleDelete}>Löschen</button>
    </div>
  );
}
