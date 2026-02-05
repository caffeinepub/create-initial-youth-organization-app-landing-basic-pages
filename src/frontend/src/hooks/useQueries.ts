import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { MembershipRegistration, Club, SocialMediaLinks, AboutSection, HomePageSection } from '../backend';

// History Content Queries
export function useGetHistoryContent() {
  const { actor, isFetching } = useActor();

  return useQuery<string>({
    queryKey: ['historyContent'],
    queryFn: async () => {
      if (!actor) return '';
      return actor.getHistoryContent();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateHistoryContent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newContent: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateHistoryContent(newContent);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['historyContent'] });
    },
  });
}

// Membership Registration Queries
export function useSubmitMembershipRegistration() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (registration: MembershipRegistration) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitMembershipRegistration(registration);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['membershipRegistrations'] });
    },
  });
}

export function useGetAllMembershipRegistrations() {
  const { actor, isFetching } = useActor();

  return useQuery<MembershipRegistration[]>({
    queryKey: ['membershipRegistrations'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMembershipRegistrations();
    },
    enabled: !!actor && !isFetching,
  });
}

// Club Queries
export function useGetClubs() {
  const { actor, isFetching } = useActor();

  return useQuery<Club[]>({
    queryKey: ['clubs'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getClubs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetClubById(id: bigint | null) {
  const { actor, isFetching } = useActor();

  return useQuery<Club | null>({
    queryKey: ['club', id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      const clubs = await actor.getClubs();
      return clubs.find((club) => club.id === id) || null;
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useCreateClub() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (club: {
      name: string;
      profilePicture: string | null;
      aims: string;
      motto: string;
      slogan: string;
      achievements: string;
      program: string;
      activities: string;
      history: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createClub(
        club.name,
        club.profilePicture,
        club.aims,
        club.motto,
        club.slogan,
        club.achievements,
        club.program,
        club.activities,
        club.history
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clubs'] });
    },
  });
}

export function useUpdateClub() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (club: {
      id: bigint;
      name: string;
      profilePicture: string | null;
      aims: string;
      motto: string;
      slogan: string;
      achievements: string;
      program: string;
      activities: string;
      history: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateClub(
        club.id,
        club.name,
        club.profilePicture,
        club.aims,
        club.motto,
        club.slogan,
        club.achievements,
        club.program,
        club.activities,
        club.history
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['clubs'] });
      queryClient.invalidateQueries({ queryKey: ['club', variables.id.toString()] });
    },
  });
}

export function useDeleteClub() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteClub(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clubs'] });
    },
  });
}

// Social Media Links Queries
export function useGetSocialMediaLinks() {
  const { actor, isFetching } = useActor();

  return useQuery<SocialMediaLinks | null>({
    queryKey: ['socialMediaLinks'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getSocialMediaLinks();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSetSocialMediaLinks() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (links: SocialMediaLinks) => {
      if (!actor) throw new Error('Actor not available');
      return actor.setSocialMediaLinks(links);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['socialMediaLinks'] });
    },
  });
}

// About Content Queries
export function useGetAboutSections() {
  const { actor, isFetching } = useActor();

  return useQuery<AboutSection[]>({
    queryKey: ['aboutSections'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAboutSections();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateAboutSections() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sections: AboutSection[]) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateAboutSections(sections);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aboutSections'] });
    },
  });
}

// Home Page Configuration Queries
export function useGetHomePageSections() {
  const { actor, isFetching } = useActor();

  return useQuery<HomePageSection[]>({
    queryKey: ['homePageSections'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getHomePageSections();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateHomePageSections() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sections: HomePageSection[]) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateHomePageSections(sections);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['homePageSections'] });
    },
  });
}
