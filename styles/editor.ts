export const editorStyles = {
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