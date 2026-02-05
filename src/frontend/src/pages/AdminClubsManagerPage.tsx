import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AdminGuard } from '@/components/AdminGuard';
import { useGetClubs, useCreateClub, useUpdateClub, useDeleteClub } from '@/hooks/useQueries';
import { Loader2, Plus, Edit, Trash2, Save, X, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { Club } from '../backend';
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

type ClubFormData = {
  id?: bigint;
  name: string;
  profilePicture: string;
  aims: string;
  motto: string;
  slogan: string;
  achievements: string;
  program: string;
  activities: string;
  history: string;
};

function AdminClubsManagerContent() {
  const { data: clubs, isLoading, isError } = useGetClubs();
  const createMutation = useCreateClub();
  const updateMutation = useUpdateClub();
  const deleteMutation = useDeleteClub();

  const [isEditing, setIsEditing] = useState(false);
  const [editingClub, setEditingClub] = useState<ClubFormData | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [clubToDelete, setClubToDelete] = useState<bigint | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const emptyForm: ClubFormData = {
    name: '',
    profilePicture: '',
    aims: '',
    motto: '',
    slogan: '',
    achievements: '',
    program: '',
    activities: '',
    history: '',
  };

  const handleAddNew = () => {
    setEditingClub(emptyForm);
    setIsEditing(true);
    setSuccessMessage(null);
  };

  const handleEdit = (club: Club) => {
    setEditingClub({
      id: club.id,
      name: club.name,
      profilePicture: club.profilePicture || '',
      aims: club.aims,
      motto: club.motto,
      slogan: club.slogan,
      achievements: club.achievements,
      program: club.program,
      activities: club.activities,
      history: club.history,
    });
    setIsEditing(true);
    setSuccessMessage(null);
  };

  const handleCancel = () => {
    setEditingClub(null);
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!editingClub) return;

    try {
      if (editingClub.id !== undefined) {
        // Update existing club
        await updateMutation.mutateAsync({
          id: editingClub.id,
          name: editingClub.name,
          profilePicture: editingClub.profilePicture.trim() || null,
          aims: editingClub.aims,
          motto: editingClub.motto,
          slogan: editingClub.slogan,
          achievements: editingClub.achievements,
          program: editingClub.program,
          activities: editingClub.activities,
          history: editingClub.history,
        });
        setSuccessMessage('Club updated successfully!');
      } else {
        // Create new club
        await createMutation.mutateAsync({
          name: editingClub.name,
          profilePicture: editingClub.profilePicture.trim() || null,
          aims: editingClub.aims,
          motto: editingClub.motto,
          slogan: editingClub.slogan,
          achievements: editingClub.achievements,
          program: editingClub.program,
          activities: editingClub.activities,
          history: editingClub.history,
        });
        setSuccessMessage('Club created successfully!');
      }
      setEditingClub(null);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save club:', error);
    }
  };

  const handleDeleteClick = (id: bigint) => {
    setClubToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (clubToDelete === null) return;

    try {
      await deleteMutation.mutateAsync(clubToDelete);
      setSuccessMessage('Club deleted successfully!');
      setDeleteDialogOpen(false);
      setClubToDelete(null);
    } catch (error) {
      console.error('Failed to delete club:', error);
    }
  };

  const handleChange = (field: keyof ClubFormData, value: string) => {
    if (!editingClub) return;
    setEditingClub({ ...editingClub, [field]: value });
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;
  const isDeleting = deleteMutation.isPending;

  return (
    <div className="container py-12 md:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Sparkles className="h-6 w-6" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight">
                Minor Clubs <span className="text-primary">Manager</span>
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Create, edit, and manage information about each minor club
            </p>
          </div>
          {!isEditing && (
            <Button onClick={handleAddNew} size="lg">
              <Plus className="mr-2 h-5 w-5" />
              Add Club
            </Button>
          )}
        </div>

        {/* Success Message */}
        {successMessage && (
          <Alert className="border-2 border-primary/50 bg-primary/5">
            <AlertTitle className="text-lg font-bold">Success!</AlertTitle>
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}

        {/* Error Messages */}
        {(createMutation.isError || updateMutation.isError || deleteMutation.isError) && (
          <Alert variant="destructive">
            <AlertDescription>
              {createMutation.isError && 'Failed to create club. '}
              {updateMutation.isError && 'Failed to update club. '}
              {deleteMutation.isError && 'Failed to delete club. '}
              Please try again.
            </AlertDescription>
          </Alert>
        )}

        {/* Edit Form */}
        {isEditing && editingClub && (
          <Card className="border-2 border-primary/50">
            <CardHeader>
              <CardTitle className="text-2xl">
                {editingClub.id !== undefined ? 'Edit Club' : 'Add New Club'}
              </CardTitle>
              <CardDescription className="text-base">
                Fill in all the details about the club
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Club Name *</Label>
                <Input
                  id="name"
                  value={editingClub.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Enter club name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profilePicture">Profile Picture URL</Label>
                <Input
                  id="profilePicture"
                  value={editingClub.profilePicture}
                  onChange={(e) => handleChange('profilePicture', e.target.value)}
                  placeholder="e.g., /assets/club-logo.png or https://example.com/image.png"
                />
                <p className="text-sm text-muted-foreground">
                  Enter the URL of the club's profile picture (optional)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="aims">Aims</Label>
                <Textarea
                  id="aims"
                  value={editingClub.aims}
                  onChange={(e) => handleChange('aims', e.target.value)}
                  placeholder="What are the club's aims and objectives?"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="motto">Motto</Label>
                <Input
                  id="motto"
                  value={editingClub.motto}
                  onChange={(e) => handleChange('motto', e.target.value)}
                  placeholder="Enter club motto"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slogan">Slogan</Label>
                <Input
                  id="slogan"
                  value={editingClub.slogan}
                  onChange={(e) => handleChange('slogan', e.target.value)}
                  placeholder="Enter club slogan"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="program">Program</Label>
                <Textarea
                  id="program"
                  value={editingClub.program}
                  onChange={(e) => handleChange('program', e.target.value)}
                  placeholder="Describe the club's program and curriculum"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="activities">Activities</Label>
                <Textarea
                  id="activities"
                  value={editingClub.activities}
                  onChange={(e) => handleChange('activities', e.target.value)}
                  placeholder="What activities does the club organize?"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="achievements">Achievements</Label>
                <Textarea
                  id="achievements"
                  value={editingClub.achievements}
                  onChange={(e) => handleChange('achievements', e.target.value)}
                  placeholder="List the club's achievements and milestones"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="history">History</Label>
                <Textarea
                  id="history"
                  value={editingClub.history}
                  onChange={(e) => handleChange('history', e.target.value)}
                  placeholder="Tell the story of the club's history"
                  rows={4}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleSave}
                  disabled={isSaving || !editingClub.name.trim()}
                  className="flex-1"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Club
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  disabled={isSaving}
                  className="flex-1"
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Clubs List */}
        {!isEditing && (
          <>
            {isLoading && (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}

            {isError && (
              <Alert variant="destructive">
                <AlertDescription>
                  Failed to load clubs. Please try again later.
                </AlertDescription>
              </Alert>
            )}

            {!isLoading && !isError && clubs && clubs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  No clubs yet. Click "Add Club" to create your first club.
                </p>
              </div>
            )}

            {!isLoading && !isError && clubs && clubs.length > 0 && (
              <div className="grid gap-4">
                {clubs.map((club) => (
                  <Card key={club.id.toString()} className="border-2">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4 items-start">
                          {club.profilePicture && (
                            <img
                              src={club.profilePicture}
                              alt={`${club.name} logo`}
                              className="h-16 w-16 rounded-xl object-cover border-2 border-border"
                            />
                          )}
                          <div className="space-y-1">
                            <CardTitle className="text-2xl">{club.name}</CardTitle>
                            {club.slogan && (
                              <CardDescription className="text-base italic">
                                "{club.slogan}"
                              </CardDescription>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(club)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteClick(club.id)}
                            disabled={isDeleting}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        {club.aims && (
                          <p>
                            <strong>Aims:</strong> {club.aims.substring(0, 100)}
                            {club.aims.length > 100 ? '...' : ''}
                          </p>
                        )}
                        {club.motto && (
                          <p>
                            <strong>Motto:</strong> {club.motto}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the club
                and all its information.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default function AdminClubsManagerPage() {
  return (
    <AdminGuard>
      <AdminClubsManagerContent />
    </AdminGuard>
  );
}
