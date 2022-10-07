import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export const getDocumentSnapshot = async( docRef, conditions ) => {
    const q = conditions === undefined ? query( docRef ) : query( docRef, ...conditions );    
    return await getDocs(q);
}

const loadNotes = async(uid) => {
    let notes = [];
    const notesRef = collection(db, `/${uid}/journal/notes`);
    const querySnapshot = await getDocumentSnapshot(notesRef, [orderBy('date', 'desc')]);
    querySnapshot.forEach(doc => {
        notes = [
            ...notes,
            {
                id: doc.id,
                ...doc.data()
            }
        ];
    });
    return notes;
};

export default loadNotes;