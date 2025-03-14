import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  onSnapshot,
  getDoc,
  where
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Workflow, Card, CardContent } from '../types/workflow';
import { useAuth } from './useAuth';

export const useFlow = (workflowId?: string) => {
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!workflowId || !user) {
      setLoading(false);
      return;
    }

    const workflowRef = doc(db, 'workflows', workflowId);
    const unsubscribe = onSnapshot(workflowRef, (doc) => {
      if (doc.exists()) {
        setWorkflow({ id: doc.id, ...doc.data() } as Workflow);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [workflowId, user]);

  const createWorkflow = async (name: string, description?: string) => {
    if (!user) throw new Error('User not authenticated');

    const newWorkflow: Omit<Workflow, 'id'> = {
      name,
      description,
      cards: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: user.id,
      isPublic: false
    };

    const docRef = await addDoc(collection(db, 'workflows'), newWorkflow);
    
    // Update user's workflows array
    const userRef = doc(db, 'users', user.id);
    await updateDoc(userRef, {
      workflows: [...user.workflows, docRef.id],
      updatedAt: new Date()
    });

    return docRef.id;
  };

  const addCard = async (type: string) => {
    if (!workflow) throw new Error('No workflow selected');

    const initialContent: CardContent = type === 'link' 
      ? { url: '', name: '' }
      : '';

    const newCard: Card = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content: initialContent,
      order: workflow.cards.length + 1
    };

    const updatedCards = [...workflow.cards, newCard];
    const workflowRef = doc(db, 'workflows', workflow.id);
    await updateDoc(workflowRef, {
      cards: updatedCards,
      updatedAt: new Date()
    });
  };

  const updateCard = async (id: string, newContent: CardContent) => {
    if (!workflow) throw new Error('No workflow selected');

    const updatedCards = workflow.cards.map(card => 
      card.id === id ? { ...card, content: newContent } : card
    );

    const workflowRef = doc(db, 'workflows', workflow.id);
    await updateDoc(workflowRef, {
      cards: updatedCards,
      updatedAt: new Date()
    });
  };

  const deleteCard = async (id: string) => {
    if (!workflow) throw new Error('No workflow selected');

    const updatedCards = workflow.cards.filter(card => card.id !== id);
    const workflowRef = doc(db, 'workflows', workflow.id);
    await updateDoc(workflowRef, {
      cards: updatedCards,
      updatedAt: new Date()
    });
  };

  const updateCardOrder = async (cards: Card[]) => {
    if (!workflow) throw new Error('No workflow selected');

    const workflowRef = doc(db, 'workflows', workflow.id);
    await updateDoc(workflowRef, {
      cards,
      updatedAt: new Date()
    });
  };

  const updateWorkflow = async (updates: Partial<Workflow>) => {
    if (!workflow) throw new Error('No workflow selected');

    const workflowRef = doc(db, 'workflows', workflow.id);
    await updateDoc(workflowRef, {
      ...updates,
      updatedAt: new Date()
    });
  };

  return {
    workflow,
    loading,
    createWorkflow,
    addCard,
    updateCard,
    deleteCard,
    updateCardOrder,
    updateWorkflow
  };
}; 