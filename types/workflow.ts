export type CardContent = string | { url: string; name: string };

export interface Card {
  id?: string;
  type: string;
  content: CardContent;
  order: number;
}

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  cards: Card[];
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  isPublic: boolean;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  workflows: string[]; // Array of workflow IDs
  createdAt: Date;
  updatedAt: Date;
} 