import { v4 as uuidv4 } from 'uuid';
import LocalStorageOperations from './storage';
const storage = new LocalStorageOperations();

export default class Note {
    constructor(body) {
        this.id = uuidv4()
        this.body = body
    }

    saveNote() {
        storage.saveNote(this)
        console.log('Note saved');
    }

    updateNote(newNote) {
        storage.updateNote(newNote, this)
        console.log('Note updated');
    }

    deleteNote() {
        storage.deleteNote(this.id)
        console.log('Note deleted');
    }
}