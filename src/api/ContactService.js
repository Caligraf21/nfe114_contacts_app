// Librairie facilitant l'importation des fonctions d'une API à partir d'une URL définie
import axios from "axios";

// Adresse locale correspondant au serveur back-end Java
// C'est ici que l'on transmet les informations au contrôleur
// Le contrôleur va pouvoir créer, récupérer et supprimer des Contacts dans la base de données Postgresql
const API_URL = 'http://localhost:8080/contacts';

export async function saveContact(contact) {
    return await axios.post(API_URL, contact);
}

export async function getContacts(page = 0, size = 10) {
    return await axios.get(`${API_URL}?page=${page}&size=${size}`);
}

export async function getContact(id) {
    return await axios.get(`${API_URL}/${id}`);
}

export async function updateContact(contact) {
    return await axios.put(API_URL, contact);
}

export async function deleteContact(id) {
    return await axios.delete(`${API_URL}/${id}`);
}
