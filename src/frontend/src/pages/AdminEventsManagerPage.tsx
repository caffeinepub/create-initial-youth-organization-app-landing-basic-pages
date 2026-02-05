import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AdminGuard } from '@/components/AdminGuard';
import { useGetEvents, useCreateOrUpdateEvent, useDeleteEvent } from '@/hooks/useQueries';
import { Calendar, Loader2, Plus, Pencil, Trash2, X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import type { Event } from '../backend';

function AdminEventsManagerContent() {
  const { data: events, isLoading } = useGetEvents();
  const createOrUpdateMutation = useCreateOrUpdateEvent();
  const deleteMutation = useDeleteEvent();

  const [isEditing, setIsEditing] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [deleteEventId, setDeleteEventId] = useState<bigint | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dateTime: '',
    location: '',
    organizer: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleCreate = () => {
    setIsEditing(true);
    setEditingEvent(null);
    setFormData({
      title: '',
      description: '',
      dateTime: '',
      location: '',
      organizer: '',
    });
    setError(null);
    setSuccess(null);
  };

  const handleEdit = (event: Event) => {
    setIsEditing(true);
    setEditingEvent(event);
    
    // Convert dateTime to local datetime-local format
    let dateTimeValue = '';
    try {
      const date = new Date(event.dateTime);
      dateTimeValue = date.toISOString().slice(0, 16);
    } catch {
      dateTimeValue = event.dateTime;
    }

    setFormData({
      title: event.title,
      description: event.description,
      dateTime: dateTimeValue,
      location: event.location,
      organizer: event.organizer,
    });
    setError(null);
    setSuccess(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingEvent(null);
    setFormData({
      title: '',
      description: '',
      dateTime: '',
      location: '',
      organizer: '',
    });
    setError(null);
  };

  const handleSave = async () => {
    // Validation
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    if (!formData.description.trim()) {
      setError('Description is required');
      return;
    }
    if (!formData.dateTime.trim()) {
      setError('Date and time are required');
      return;
    }
    if (!formData.location.trim()) {
      setError('Location is required');
      return;
    }

    try {
      const eventData: Event = {
        id: editingEvent ? editingEvent.id : BigInt(Date.now()),
        title: formData.title.trim(),
        description: formData.description.trim(),
        dateTime: new Date(formData.dateTime).toISOString(),
        location: formData.location.trim(),
        organizer: formData.organizer.trim(),
        media: editingEvent?.media,
      };

      await createOrUpdateMutation.mutateAsync(eventData);
      setSuccess(editingEvent ? 'Event updated successfully!' : 'Event created successfully!');
      setIsEditing(false);
      setEditingEvent(null);
      setFormData({
        title: '',
        description: '',
        dateTime: '',
        location: '',
        organizer: '',
      });
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to save event');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteEventId) return;

    try {
      await deleteMutation.mutateAsync(deleteEventId);
      setSuccess('Event deleted successfully!');
      setDeleteEventId(null);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to delete event');
      setDeleteEventId(null);
    }
  };

  return (
    <div className="container py-12 md:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Calendar className="h-6 w-6" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight">
                Events <span className="text-primary">Manager</span>
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Create, edit, and manage events for your organization
            </p>
          </div>
          {!isEditing && (
            <Button onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          )}
        </div>

        {/* Success/Error Messages */}
        {success && (
          <Alert>
            <AlertDescription className="text-green-600 font-medium">
              {success}
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Edit Form */}
        {isEditing && (
          <Card className="border-2 border-primary">
            <CardHeader>
              <CardTitle>{editingEvent ? 'Edit Event' : 'Create New Event'}</CardTitle>
              <CardDescription>
                {editingEvent ? 'Update event details below' : 'Fill in the event details below'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Event title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Event description"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateTime">Date and Time *</Label>
                <Input
                  id="dateTime"
                  type="datetime-local"
                  value={formData.dateTime}
                  onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Event location"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="organizer">Organizer</Label>
                <Input
                  id="organizer"
                  value={formData.organizer}
                  onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                  placeholder="Event organizer (optional)"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={handleSave}
                  disabled={createOrUpdateMutation.isPending}
                  className="flex-1"
                >
                  {createOrUpdateMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Event'
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={createOrUpdateMutation.isPending}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Events List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : events && events.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">All Events</h2>
            {events.map((event) => (
              <Card key={event.id.toString()}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <CardTitle>{event.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {event.description}
                      </CardDescription>
                      <div className="text-sm text-muted-foreground pt-2">
                        <p>📅 {new Date(event.dateTime).toLocaleString()}</p>
                        <p>📍 {event.location}</p>
                        {event.organizer && <p>👤 {event.organizer}</p>}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleEdit(event)}
                        disabled={isEditing}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => setDeleteEventId(event.id)}
                        disabled={isEditing || deleteMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          !isEditing && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No events yet. Create your first event to get started!
              </p>
            </div>
          )
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deleteEventId} onOpenChange={() => setDeleteEventId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Event</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this event? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteConfirm}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default function AdminEventsManagerPage() {
  return (
    <AdminGuard>
      <AdminEventsManagerContent />
    </AdminGuard>
  );
}
