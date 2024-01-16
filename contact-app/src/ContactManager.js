/* import React from 'react';
import { useParams } from 'react-router-dom';

function ContactManager() {
  const { id } = useParams();

  // Implement logic to manage contacts

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title text-center">Contact Manager for User {id}</h1>
          {/* Implement CRUD operations for contacts here 
        </div>
      </div>
    </div>
  );
}

export default ContactManager;
 */

/* 
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, Table } from 'react-bootstrap';

function ContactManager() {
  const { userId } = useParams();
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    username: '',
    name: '',
    email: '',
  });

  const fetchContacts = async () => {
    try {
      const response = await fetch(`http://localhost:8080/contacts/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      } else {
        console.error('Failed to fetch contacts');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  const handleAddContact = async () => {
    try {
      const response = await fetch(`http://localhost:8080/contact/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContact),
      });
      if (response.ok) {
        const data = await response.json();
        setContacts([...contacts, data]);
        setNewContact({ username: '', name: '', email: '' });
      } else {
        console.error('Failed to add contact');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [userId]);

  return (
    <div className="container mt-5">
      <h1>Contact Manager</h1>
      <Form>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={newContact.username}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={newContact.name}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={newContact.email}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleAddContact}>
          Add Contact
        </Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.username}</td>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ContactManager;
 */


/* 
// ContactManager.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ContactService from "./ContactService";

const ContactManager = () => {
  const { userId } = useParams();
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    username: "",
    name: "",
    email: "",
  });

  useEffect(() => {
    // Fetch user's contacts when the component mounts
    ContactService.getAllContactsByUserId(userId)
      .then((response) => {
        setContacts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
      });
  }, [userId]);

  const handleNewContactSubmit = (e) => {
    e.preventDefault();

    // Create a new contact for the user
    ContactService.createContact(userId, newContact)
      .then((response) => {
        setContacts([...contacts, response.data]);
        setNewContact({ username: "", name: "", email: "" });
      })
      .catch((error) => {
        console.error("Error creating contact:", error);
      });
  };

  const handleDeleteContact = (contactId) => {
    // Delete an existing contact
    ContactService.deleteContact(contactId)
      .then(() => {
        setContacts(contacts.filter((contact) => contact.id !== contactId));
      })
      .catch((error) => {
        console.error("Error deleting contact:", error);
      });
  };

  return (
    <div>
      <h2>Welcome to your Contact Manager </h2>
      <p>Manage your contacts below:</p>

   
      <form onSubmit={handleNewContactSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={newContact.username}
          onChange={(e) =>
            setNewContact({ ...newContact, username: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Name"
          value={newContact.name}
          onChange={(e) =>
            setNewContact({ ...newContact, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Email"
          value={newContact.email}
          onChange={(e) =>
            setNewContact({ ...newContact, email: e.target.value })
          }
        />
        <button type="submit">Create Contact</button>
      </form>

     
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {contact.username} - {contact.name} ({contact.email})
            <button onClick={() => handleDeleteContact(contact.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactManager;
 */


import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ContactService from "./ContactService";

const ContactManager = () => {
  const { userId } = useParams();
  const [contacts, setContacts] = useState([]);
  const [contactForm, setContactForm] = useState({ username: "", name: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);

  console.log(userId);

  useEffect(() => {
    fetchContacts();
  }, [userId]);

  const fetchContacts = () => {
    ContactService.getAllContactsByUserId(userId)
      .then(response => setContacts(response.data))
      .catch(error => console.error("Error fetching contacts:", error));
  };

  const handleFormChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const submitContact = (e) => {
    e.preventDefault();
    const action = isEditing ? ContactService.updateContact : ContactService.createContact;
    action(contactForm.id || userId, contactForm)
      .then(() => {
        fetchContacts();
        setContactForm({ username: "", name: "", email: "" });
        setIsEditing(false);
      })
      .catch(error => console.error("Error submitting contact:", error));
  };

  const deleteContact = (contactId) => {
    ContactService.deleteContact(contactId)
      .then(() => fetchContacts())
      .catch(error => console.error("Error deleting contact:", error));
  };

  const startEditContact = (contact) => {
    setContactForm(contact);
    setIsEditing(true);
  };

  return (
    <div>
      <h2>Hello User: {userId}</h2>
      <h2>Contact Manager</h2>

   
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {contact.name} - {contact.email}
            <button onClick={() => startEditContact(contact)}>Edit</button>
            <button onClick={() => deleteContact(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>

     
      <form onSubmit={submitContact}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={contactForm.username}
          onChange={handleFormChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={contactForm.name}
          onChange={handleFormChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={contactForm.email}
          onChange={handleFormChange}
        />
        <button type="submit">{isEditing ? "Update Contact" : "Add Contact"}</button>
      </form>
    </div>
  );
};

export default ContactManager;
