// Importation des React hooks permettant de décomposer les états de l'application et les fonctions associées
import { useEffect, useRef, useState } from 'react';
// Importation des components de l'app
import Header from './components/Header';
import ContactList from './components/ContactList';
// Importation des fonctions issues de l'API back-end Java
import { getContacts, saveContact, deleteContact } from './api/ContactService';
// On définit les principales routes de direction des URL
import { Routes, Route, Navigate } from 'react-router-dom';

// Toastify est une librairie permettant de faciliter les notifications, l'affichage des erreurs, etc.
import 'react-toastify/dist/ReactToastify.css';
import { toastError, toastSuccess } from './api/ToastService';
import { ToastContainer } from 'react-toastify';


function App() {
  // On utilise un hook useRef pour stocker les données du formulaires sans déclencher immédiatement un rendu
  const formRef = useRef();
  // On stocke les données du contacts
  const [data, setData] = useState([]);
  // Utilisation d'un état pour compter le nombre de contacts présents (à zéro de base)
  const [contactCount, setContactCount] = useState(0);
  // On stocke les valeurs du formulaire contact
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    company: '',
    status: '',
  });

  // Nombre maximum de contacts autorisés (simplifie l'application)
  const MAX_CONTACTS = 20;

  // Fonction pour afficher tous les contacts présents dans la base de données
  const getAllContacts = async () => {
    try {
      // On récupère les informations via l'API
      const response = await getContacts(0, MAX_CONTACTS);
      setData(response.data.content);
      setContactCount(response.data.totalElements);
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  // Gestion des évènements (modifications suite aux actions de l'utilisateur)
  const onChange = (event) => {
    // Mise à jour des valeurs des formulaires
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  // Fonction gérant la création d'un nouveau Contact
  const handleNewContact = async (event) => {
    // Sécurité pour éviter d'avoir des contacts incomplets
    event.preventDefault();
    if (contactCount >= MAX_CONTACTS) {
      toastError('Contact limit reached. Cannot add more contacts.');
      return;
    }
    try {
      // On crée un nouveau contact via l'API
      await saveContact(values);
      // On ferme l'affichage du formulaire
      toggleForm(false);
      // On remet à zéro les valeurs prises par le formulaire
      setValues({
        name: '',
        email: '',
        phone: '',
        address: '',
        title: '',
        status: '',
      });
      // Rafraichir la liste des contacts
      getAllContacts();
      toastSuccess('Contact saved successfully!');
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  // Fonction gérant la suppresion d'un Contact
  const deleteContactHandler = async (id) => {
    try {
      // On supprime un contact via l'API
      await deleteContact(id);
      toastSuccess('Contact deleted successfully!');
      // Rafraichir la liste des contacts
      getAllContacts();
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  // Affiche ou désaffiche le formulaire selon la valeur booléenne true - false
  const toggleForm = show => show ? formRef.current.showform() : formRef.current.close();

  // Affichage des Contacts
  useEffect(() => {
    getAllContacts();
  }, []);

  // Affichage de l'application en JSX
  return (
    <>
      <Header toggleform={toggleform} nbOfContacts={contactCount} />
      <main className='main'>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Navigate to={'/contacts'} />} />
            <Route path="/contacts" element={<ContactList data={data} deleteContactHandler={deleteContactHandler} />} />
          </Routes>
        </div>
      </main>

      <dialog ref={formRef} className="form" id="form">
        <div className="form__header">
          <h3>New Contact</h3>
          <{ /* Le bouton fermer le formulaire déclenche l'état qui désaffiche le formulaire */ }>
          <i onClick={() => toggleForm(false)} className="bi bi-x-lg"></i>
        </div>
        <div className="divider"></div>
        <div className="form__body">
          <form onSubmit={handleNewContact}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Name</span>
                <input type="text" value={values.name} onChange={onChange} name='name' required />
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input type="text" value={values.email} onChange={onChange} name='email' required />
              </div>
              <div className="input-box">
                <span className="details">Title</span>
                <input type="text" value={values.title} onChange={onChange} name='title' required />
              </div>
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input type="text" value={values.phone} onChange={onChange} name='phone' required />
              </div>
              <div className="input-box">
                <span className="details">Address</span>
                <input type="text" value={values.address} onChange={onChange} name='address' required />
              </div>
              <div className="input-box">
                <span className="details">Account Status</span>
                <input type="text" value={values.status} onChange={onChange} name='status' required />
              </div>
            </div>
            <div className="form_footer">
            <{ /* Le bouton annuler du formulaire désaffiche aussi le formulaire */ }>
              <button onClick={() => toggleForm(false)} type='button' className="btn btn-danger">Cancel</button>
              <button type='submit' className="btn">Save</button>
            </div>
          </form>
        </div>
      </dialog>
      <ToastContainer />
    </>
  );
}

export default App;
