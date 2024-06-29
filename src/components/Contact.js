import React from 'react';

// Composant permettant de paramétrer l'affichage d'un Contact dans le menu principal, le contact peut être supprimé
const Contact = ({ contact, deleteContactHandler }) => {
    // Fonction auxilliaire pour décomposer le nom en initiales (ex: Pierre Lemaire = P.L)
    const getInitials = (name) => {
        const namesArray = name.split(" ").map((n)=>n[0]).join(".");
        if (namesArray.length > 1) {
            return namesArray;
        }
        return name[0];
    };

    // Un bouton permet de supprimer le Contant en cliquant sur remove
    return (
        <div className="contact__item">
            <div className="contact__header">
                <div className="contact__image">
                    <div className="contact__initials">{getInitials(contact.name)}</div>
                </div>
                <div className="contact__details">
                    <p className="contact_name">{contact.name} </p>
                    <p className="contact_title">{contact.title}</p>
                </div>
            </div>
            <div className="contact__body">
                <p><i className="bi bi-briefcase-fill"></i> {contact.company}</p>
                <p><i className="bi bi-telephone-fill"></i> {contact.phone}</p>
                <p><i className="bi bi-threads"></i> {contact.email} </p>
                <p><i className="bi bi-geo-alt-fill"></i> {contact.address} </p>
                <p>{contact.status === 'Urgence' ? <i className='bi bi-exclamation-triangle-fill'></i> : 
                    <i className='bi bi-check'></i>} {contact.status}</p>
            </div>
            <button onClick={() => deleteContactHandler(contact.id)} className="btn btn-danger">Remove</button>
        </div>
    );
}

export default Contact;
