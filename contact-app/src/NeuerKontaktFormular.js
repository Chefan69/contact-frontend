// NeuerKontaktFormular.js
import React, { useState } from 'react';

function NeuerKontaktFormular({ onSave, onCancel }) {
    const [neuerKontakt, setNeuerKontakt] = useState({ name: '', username: '', email: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(neuerKontakt);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                value={neuerKontakt.name}
                onChange={(e) => setNeuerKontakt({ ...neuerKontakt, name: e.target.value })}
                placeholder="Name"
            />
            <input 
                type="text"
                value={neuerKontakt.username}
                onChange={(e) => setNeuerKontakt({ ...neuerKontakt, username: e.target.value })}
                placeholder="Username"
            />
            <input 
                type="email"
                value={neuerKontakt.email}
                onChange={(e) => setNeuerKontakt({ ...neuerKontakt, email: e.target.value })}
                placeholder="E-Mail"
            />
            <button className="button createButton" type="submit">Erstellen</button>
            <button className="button cancelButton" type="button" onClick={onCancel}>Abbrechen</button>
        </form>
    );
}

export default NeuerKontaktFormular;
