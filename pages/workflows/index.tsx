import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useFlow } from '../../hooks/useFlow';
import { useAuth } from '../../hooks/useAuth';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Workflow } from '../../types/workflow';
import { withAuth } from '../../components/auth/withAuth';

const WorkflowsPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [open, setOpen] = useState(false);
  const [newWorkflowName, setNewWorkflowName] = useState('');
  const [newWorkflowDescription, setNewWorkflowDescription] = useState('');
  const { createWorkflow } = useFlow();

  React.useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'workflows'),
      where('userId', '==', user.id)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const workflowsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Workflow[];
      setWorkflows(workflowsData);
    });

    return () => unsubscribe();
  }, [user]);

  const handleCreateWorkflow = async () => {
    if (!newWorkflowName.trim()) return;

    try {
      const workflowId = await createWorkflow(newWorkflowName, newWorkflowDescription);
      setOpen(false);
      setNewWorkflowName('');
      setNewWorkflowDescription('');
      router.push(`/workflows/${workflowId}`);
    } catch (error) {
      console.error('Error creating workflow:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          My Workflows
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          New Workflow
        </Button>
      </Box>

      <Grid container spacing={3}>
        {workflows.map((workflow) => (
          <Grid item xs={12} sm={6} md={4} key={workflow.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer'
              }}
              onClick={() => router.push(`/workflows/${workflow.id}`)}
            >
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  {workflow.name}
                </Typography>
                {workflow.description && (
                  <Typography color="text.secondary" gutterBottom>
                    {workflow.description}
                  </Typography>
                )}
                <Typography variant="body2" color="text.secondary">
                  {workflow.cards.length} cards
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create New Workflow</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Workflow Name"
            fullWidth
            value={newWorkflowName}
            onChange={(e) => setNewWorkflowName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description (optional)"
            fullWidth
            multiline
            rows={3}
            value={newWorkflowDescription}
            onChange={(e) => setNewWorkflowDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateWorkflow} variant="contained" color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default withAuth(WorkflowsPage); 