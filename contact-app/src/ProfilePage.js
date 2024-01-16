/* import React from "react";
import {useParams} from 'react-router-dom';



export default function ProfilePage() {

    let {id} = useParams();

    return(
        <h1>Hello, {id} </h1>
    );
    
} */

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./styles/Styles.css";
import KontaktListe from "./KontaktListe.js";

export default function ProfilePage() {
  const navigate = useNavigate();

  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSignOut = () => {
    setUser(null);
    navigate("/"); // Navigate to your HomePage
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm("Sind Sie sicher, dass Sie Ihr Konto löschen möchten?")
    ) {
      try {
        const response = await fetch(`http://localhost:8080/users/${userId}`, {
          method: "DELETE",
          // Fügen Sie bei Bedarf weitere Header hinzu, wie z.B. für Authentifizierung
        });

        if (response.ok) {
          // Optional: Löschen Sie lokale Benutzerdaten oder Authentifizierungstokens
          // z.B. localStorage.removeItem('userToken');

          // Umleitung zur Homepage
          navigate("/");
        } else {
          // Fehlerbehandlung
          console.error("Fehler beim Löschen des Kontos");
        }
      } catch (error) {
        console.error("Ein Fehler ist aufgetreten:", error);
      }
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8080/users/${userId}`);
        if (!response.ok) {
          throw new Error("Fehler beim Abrufen der Benutzerdaten");
        }
        const userData = await response.json();
        setUser(userData);
        console.log(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <div>Laden...</div>;
  if (error) return <div>Fehler: {error}</div>;
  if (!user) return <div>Benutzer nicht gefunden</div>;

  return (
    // <h1>Hallo, {user.username}</h1>

    <>
      <div className="header">
        <div className="headerSection"></div> {/* Empty div for spacing */}
        <div className="headerSection">
          <div className="headerTitle">
            Hallo, {user ? user.username : "Laden..."}
          </div>
        </div>
        <div className="headerSection headerButtons">
          <button className="button" onClick={handleSignOut}>
            Sign Out
          </button>
          <button className="button deleteButton" onClick={handleDeleteAccount}>
            Delete Account
          </button>
        </div>
      </div>

      <div className="profileLayout">
        <div className="kontaktListeBereich">
          <h2>Contact-Manager</h2>
          <KontaktListe userId={userId} />
        </div>
        <div className="zukuenftigerBereich">
          {/* Platz für zukünftige Features */}
        </div>
      </div>
    </>
  );
}
