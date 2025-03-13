declare module '@tiptap/core' {
  export interface Extension {
    name: string;
    options: Record<string, any>;
    addOptions(options: Record<string, any>): void;
    addStorage(storage: Record<string, any>): void;
    addProseMirrorPlugins(): any[];
    addKeyboardShortcuts(): Record<string, () => boolean>;
    addInputRules(): any[];
    addPasteRules(): any[];
    addCommands(): Record<string, (...args: any[]) => any>;
    addAttributes(): Record<string, any>;
    addGlobalAttributes(): Record<string, any>;
    addNodeView(): any;
    configure(options: Record<string, any>): Extension;
  }

  export interface EditorCommands {
    toggleBold(): boolean;
    toggleItalic(): boolean;
    toggleUnderline(): boolean;
    toggleBulletList(): boolean;
    toggleOrderedList(): boolean;
    toggleBlockquote(): boolean;
    toggleCodeBlock(): boolean;
    setTextAlign(align: 'left' | 'center' | 'right'): boolean;
    setLink(attributes: { href: string }): boolean;
    setImage(attributes: { src: string }): boolean;
  }

  export class Editor {
    constructor(options: Record<string, any>);
    commands: EditorCommands;
    options: Record<string, any>;
    storage: Record<string, any>;
    state: any;
    view: any;
    isActive(name: string | Record<string, any>, attributes?: Record<string, any>): boolean;
    can(): boolean;
    focus(): void;
    blur(): void;
    getHTML(): string;
    getText(): string;
    getJSON(): any;
    chain(): Editor;
    run(): void;
  }
}

declare module '@tiptap/react' {
  import { Editor } from '@tiptap/core';
  import { ReactNode } from 'react';

  export interface EditorContentProps {
    editor: Editor | null;
    children?: ReactNode;
  }

  export function useEditor(options: any): Editor | null;
  export function EditorContent(props: EditorContentProps): JSX.Element;
}

declare module '@tiptap/starter-kit' {
  import { Extension } from '@tiptap/core';
  const StarterKit: Extension;
  export default StarterKit;
}

declare module '@tiptap/extension-placeholder' {
  import { Extension } from '@tiptap/core';
  const Placeholder: Extension;
  export default Placeholder;
}

declare module '@tiptap/extension-link' {
  import { Extension } from '@tiptap/core';
  const Link: Extension;
  export default Link;
}

declare module '@tiptap/extension-image' {
  import { Extension } from '@tiptap/core';
  const Image: Extension;
  export default Image;
}

declare module '@tiptap/extension-code-block' {
  import { Extension } from '@tiptap/core';
  const CodeBlock: Extension;
  export default CodeBlock;
}

declare module '@tiptap/extension-text-align' {
  import { Extension } from '@tiptap/core';
  const TextAlign: Extension;
  export default TextAlign;
}

declare module '@tiptap/extension-underline' {
  import { Extension } from '@tiptap/core';
  const Underline: Extension;
  export default Underline;
}

declare module '@tiptap/extension-text-style' {
  import { Extension } from '@tiptap/core';
  const TextStyle: Extension;
  export default TextStyle;
}

declare module '@tiptap/extension-color' {
  import { Extension } from '@tiptap/core';
  const Color: Extension;
  export default Color;
} 