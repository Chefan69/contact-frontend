import React, { useState, useEffect } from "react";
import ContactCard from "./ContactCard";
import NeuerKontaktFormular from "./NeuerKontaktFormular";

function KontaktListe({ userId }) {
  const [kontakte, setKontakte] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedKontakt, setSelectedKontakt] = useState(null);

  const handleKontaktSelect = (kontakt) => {
    setSelectedKontakt(kontakt);
    setIsCreating(false); // Verbergen des Formulars zum Erstellen eines neuen Kontakts
  };

  const [isCreating, setIsCreating] = useState(false);

  const handleCreateNew = () => {
    setIsCreating(true);
    setSelectedKontakt(null); // Optional: Deselect any selected contact
  };

  const handleSaveNewKontakt = async (kontakt) => {
    try {
      const response = await fetch(
        `http://localhost:8080/users/${userId}/contacts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Andere notwendige Header
          },
          body: JSON.stringify(kontakt),
        }
      );

      if (response.ok) {
        // Nach erfolgreichem Erstellen den neuen Kontakt zur Liste hinzufügen
        const addedKontakt = await response.json();
        setKontakte([...kontakte, addedKontakt]);
        setIsCreating(false);
      } else {
        // Fehlerbehandlung
      }
    } catch (error) {
      // Netzwerk- oder Serverfehlerbehandlung
    }
  };

  // Kontakte beim Initialisieren der Komponente laden
  useEffect(() => {
    const fetchKontakte = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/users/${userId}/contacts`
        );
        if (response.ok) {
          const data = await response.json();
          setKontakte(data);
        }
      } catch (error) {
        console.error("Fehler beim Laden der Kontakte:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchKontakte();
  }, [userId]);

  // Funktion zum Löschen eines Kontakts
  const handleDelete = async (contactId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/users/${userId}/contacts/${contactId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setKontakte(kontakte.filter((kontakt) => kontakt.id !== contactId));
        setSelectedKontakt(null);
      }
    } catch (error) {
      console.error("Fehler beim Löschen des Kontakts:", error);
    }
  };

  const handleUpdate = async (updatedKontakt) => {
    try {
      const response = await fetch(
        `http://localhost:8080/users/${userId}/contacts/${updatedKontakt.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // Fügen Sie hier weitere notwendige Header hinzu, z.B. für die Authentifizierung
          },
          body: JSON.stringify(updatedKontakt),
        }
      );

      if (response.ok) {
        const updatedData = await response.json();
        // Aktualisieren Sie die Kontaktliste im Zustand
        setKontakte(
          kontakte.map((kontakt) =>
            kontakt.id === updatedKontakt.id ? updatedData : kontakt
          )
        );
        setSelectedKontakt(null);
      } else {
        // Fehlerbehandlung, wenn die Antwort nicht 'ok' ist
        console.error("Fehler beim Aktualisieren des Kontakts");
      }
    } catch (error) {
      // Fehlerbehandlung für Netzwerkfehler
      console.error("Netzwerkfehler:", error);
    }
  };

  useEffect(() => {
    // Funktion, die aufruft, wenn außerhalb der Kontakte geklickt wird
    const handleClickOutside = (event) => {
      // Überprüfen, ob das geklickte Element kein Kontakt ist
      if (
        !event.target.closest(".kontakt") &&
        !event.target.closest(".contactCard") &&
        !event.target.closest(".bearbeitungsFormular")
      ) {
        setSelectedKontakt(null);
      }
    };

    // Event-Listener hinzufügen
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Bereinigung: Event-Listener entfernen
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) return <div>Laden...</div>;

  return (
    <div>
                  <div className="kontaktHeader">
                <span>Name</span>
                <span>Username</span>
                <span>E-Mail</span>
            </div>

            {/* Kontaktliste */}
            {kontakte.map((kontakt) => (
                <div
                    key={kontakt.id}
                    className={`kontakt ${
                        selectedKontakt && kontakt.id === selectedKontakt.id
                            ? "kontaktHervorgehoben"
                            : ""
                    }`}
                    onClick={() => handleKontaktSelect(kontakt)}
                >
                    <span>{kontakt.name}</span>
                    <span>{kontakt.username}</span>
                    <span>{kontakt.email}</span>
                </div>
            ))}

      {selectedKontakt && (
        <ContactCard
          kontakt={selectedKontakt}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}

      {!isCreating && !selectedKontakt && (
        <button className="button createButton" onClick={handleCreateNew}>
          Create
        </button>
      )}
      {isCreating && (
        <NeuerKontaktFormular
          onSave={handleSaveNewKontakt}
          onCancel={() => setIsCreating(false)}
        />
      )}
    </div>
  );
}

export default KontaktListe;
