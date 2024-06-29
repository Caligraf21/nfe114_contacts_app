import React from 'react';
import Contact from './Contact';

// Composant permettant de générer la liste de Contacts
// Si moins de 1 : l'utilisateur doit en crée un
// Si >0 et 20< : on affiche la liste de Contacts
// Si > 20 : L'utilisateur ne peut plus afficher plus de Contacts. Il doit en supprimer certains

const ContactList = ({ data, deleteContactHandler }) => {
    return (
        <main className='main'>
            {data.length === 0 && <div>No Contacts. Please add a new contact</div>}

            <ul className='contact__list'>
                {data?.content?.length > 0 && data.content.map(contact => (
                    <Contact contact={contact} key={contact.id} deleteContactHandler={deleteContactHandler} />
                ))}
            </ul>

            {data?.length >= 20 && (
                <div className='contact-limit-message'>
                    <p>You have reached the maximum number of contacts. Cannot add more contacts.</p>
                </div>
            )}
        </main>
    );
}

export default ContactList;
