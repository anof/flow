import React, { useCallback, useEffect, useState } from 'react';
import { Box, Typography, IconButton, Tooltip, Divider, useTheme } from '@mui/material';
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  Code,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  Link,
  TextFields,
} from '@mui/icons-material';
import { useEditor, EditorContent } from '@tiptap/react';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import LinkExtension from '@tiptap/extension-link';
import CodeBlock from '@tiptap/extension-code-block';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';

interface Props {
  content: string;
  mode: 'edit' | 'preview' | 'view';
  onUpdate: (content: string) => void;
}

interface MenuBarProps {
  editor: Editor | null;
}

const editorStyles = {
  '& .ProseMirror': {
    outline: 'none',
    minHeight: '100px',
    padding: '1rem',
    '& > * + *': {
      marginTop: '0.75em',
    },
  },
  '& .ProseMirror p': {
    margin: '0.5em 0',
  },
  '& .ProseMirror ul, & .ProseMirror ol': {
    paddingLeft: '1.5em',
    margin: '0.5em 0',
  },
  '& .ProseMirror blockquote': {
    borderLeft: '3px solid #ccc',
    margin: '0.5em 0',
    paddingLeft: '1em',
    color: '#666',
  },
  '& .ProseMirror pre': {
    background: '#f5f5f5',
    padding: '1em',
    borderRadius: '4px',
    overflow: 'auto',
    margin: '0.5em 0',
  },
  '& .ProseMirror code': {
    background: '#f5f5f5',
    padding: '0.2em 0.4em',
    borderRadius: '3px',
    fontFamily: 'monospace',
  },
  '& .ProseMirror img': {
    maxWidth: '100%',
    height: 'auto',
    margin: '0.5em 0',
  },
  '& .ProseMirror h1': {
    fontSize: '2em',
    fontWeight: 'bold',
    margin: '0.5em 0',
  },
  '& .ProseMirror h2': {
    fontSize: '1.5em',
    fontWeight: 'bold',
    margin: '0.5em 0',
  },
  '& .ProseMirror h3': {
    fontSize: '1.17em',
    fontWeight: 'bold',
    margin: '0.5em 0',
  },
  '& .ProseMirror a': {
    color: '#1976d2',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
};

const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <Box sx={{
      display: 'flex',
      gap: 1,
      p: 1,
      borderBottom: '1px solid',
      borderColor: 'divider',
      flexWrap: 'wrap'
    }}>
      <Tooltip title="Bold">
        <IconButton
          size="small"
          onClick={() => editor.commands.toggleBold()}
          color={editor.isActive('bold') ? 'primary' : 'default'}
        >
          <FormatBold />
        </IconButton>
      </Tooltip>
      <Tooltip title="Italic">
        <IconButton
          size="small"
          onClick={() => editor.commands.toggleItalic()}
          color={editor.isActive('italic') ? 'primary' : 'default'}
        >
          <FormatItalic />
        </IconButton>
      </Tooltip>
      <Tooltip title="Underline">
        <IconButton
          size="small"
          onClick={() => editor.commands.toggleUnderline()}
          color={editor.isActive('underline') ? 'primary' : 'default'}
        >
          <FormatUnderlined />
        </IconButton>
      </Tooltip>
      <Divider orientation="vertical" flexItem />
      <Tooltip title="Bullet List">
        <IconButton
          size="small"
          onClick={() => editor.commands.toggleBulletList()}
          color={editor.isActive('bulletList') ? 'primary' : 'default'}
        >
          <FormatListBulleted />
        </IconButton>
      </Tooltip>
      <Tooltip title="Numbered List">
        <IconButton
          size="small"
          onClick={() => editor.commands.toggleOrderedList()}
          color={editor.isActive('orderedList') ? 'primary' : 'default'}
        >
          <FormatListNumbered />
        </IconButton>
      </Tooltip>
      <Tooltip title="Blockquote">
        <IconButton
          size="small"
          onClick={() => editor.commands.toggleBlockquote()}
          color={editor.isActive('blockquote') ? 'primary' : 'default'}
        >
          <FormatQuote />
        </IconButton>
      </Tooltip>
      <Tooltip title="Code Block">
        <IconButton
          size="small"
          onClick={() => editor.commands.toggleCodeBlock()}
          color={editor.isActive('codeBlock') ? 'primary' : 'default'}
        >
          <Code />
        </IconButton>
      </Tooltip>
      <Divider orientation="vertical" flexItem />
      <Tooltip title="Align Left">
        <IconButton
          size="small"
          onClick={() => editor.commands.setTextAlign('left')}
          color={editor.isActive({ textAlign: 'left' }) ? 'primary' : 'default'}
        >
          <FormatAlignLeft />
        </IconButton>
      </Tooltip>
      <Tooltip title="Align Center">
        <IconButton
          size="small"
          onClick={() => editor.commands.setTextAlign('center')}
          color={editor.isActive({ textAlign: 'center' }) ? 'primary' : 'default'}
        >
          <FormatAlignCenter />
        </IconButton>
      </Tooltip>
      <Tooltip title="Align Right">
        <IconButton
          size="small"
          onClick={() => editor.commands.setTextAlign('right')}
          color={editor.isActive({ textAlign: 'right' }) ? 'primary' : 'default'}
        >
          <FormatAlignRight />
        </IconButton>
      </Tooltip>
      <Divider orientation="vertical" flexItem />
      <Tooltip title="Add Link">
        <IconButton
          size="small"
          onClick={() => {
            const url = window.prompt('Enter URL');
            if (url) {
              editor.commands.setLink({ href: url });
            }
          }}
          color={editor.isActive('link') ? 'primary' : 'default'}
        >
          <Link />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

const TextCard: React.FC<Props> = ({ content, mode, onUpdate }) => {
  const theme = useTheme();
  const [isPreview, setIsPreview] = useState(mode === 'preview');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start writing...',
      }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          class: 'text-primary hover:underline',
        },
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: 'rounded-md bg-gray-100 p-4 font-mono text-sm',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      TextStyle,
      Color,
    ],
    content: content || '',
    editable: mode === 'edit',
    onUpdate: ({ editor }: { editor: Editor }) => {
      onUpdate(editor.getHTML());
    },
  });

  if (mode === 'preview') {
    return (
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          py: 3
        }}
      >
        {content ? (
          <Box
            sx={{
              width: '100%',
              ...editorStyles
            }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <>
            <TextFields sx={{ fontSize: 40, color: 'text.secondary' }} />
            <Typography variant="body1" color="text.secondary" align="center">
              No text content yet
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Switch to edit mode to add your text
            </Typography>
          </>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <MenuBar editor={editor} />
      <Box sx={{ p: 2, ...editorStyles }}>
        <EditorContent editor={editor} />
      </Box>
    </Box>
  );
};

export default TextCard;
