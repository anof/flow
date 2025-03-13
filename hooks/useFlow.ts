import { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

export type CardContent = string | { url: string; name: string };

export interface Card {
  id?: string;
  type: string;
  content: CardContent;
  order: number;
}

export const useFlow = () => {
  const [list, setList] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'cards'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const cards = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Card[];
      setList(cards);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addCard = async (type: string) => {
    const initialContent: CardContent = type === 'link' 
      ? { url: '', name: '' }
      : '';

    const newCard = {
      type,
      content: initialContent,
      order: list.length + 1
    };

    await addDoc(collection(db, 'cards'), newCard);
  };

  const updateCard = async (id: string, newContent: CardContent) => {
    const cardRef = doc(db, 'cards', id);
    await updateDoc(cardRef, { content: newContent });
  };

  const deleteCard = async (id: string) => {
    const cardRef = doc(db, 'cards', id);
    await deleteDoc(cardRef);
  };

  const updateCardOrder = async (cards: Card[]) => {
    const batch = cards.map((card, index) => {
      const cardRef = doc(db, 'cards', card.id!);
      return updateDoc(cardRef, { order: index + 1 });
    });
    await Promise.all(batch);
  };

  return {
    list,
    loading,
    addCard,
    updateCard,
    deleteCard,
    updateCardOrder
  };
}; 