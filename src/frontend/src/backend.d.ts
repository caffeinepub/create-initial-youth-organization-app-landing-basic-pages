import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface AboutSection {
    title: string;
    content: string;
    link: boolean;
}
export interface SocialMediaLinks {
    linkedin: string;
    tiktok: string;
    twitter: string;
    instagram: string;
    whatsapp: string;
    facebook: string;
    youtube: string;
}
export interface MembershipRegistration {
    additionalInfo: string;
    name: string;
    email: string;
    address: string;
    phone: string;
}
export interface Club {
    id: bigint;
    motto: string;
    aims: string;
    name: string;
    activities: string;
    history: string;
    slogan: string;
    achievements: string;
    profilePicture?: string;
    program: string;
}
export interface UserProfile {
    name: string;
}
export interface HomePageSection {
    title: string;
    description: string;
    imageUrl: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createClub(name: string, profilePicture: string | null, aims: string, motto: string, slogan: string, achievements: string, program: string, activities: string, history: string): Promise<bigint>;
    deleteClub(id: bigint): Promise<void>;
    getAboutSections(): Promise<Array<AboutSection>>;
    getAllMembershipRegistrations(): Promise<Array<MembershipRegistration>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getClubs(): Promise<Array<Club>>;
    getHistoryContent(): Promise<string>;
    getHomePageSections(): Promise<Array<HomePageSection>>;
    getSocialMediaLinks(): Promise<SocialMediaLinks | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(_profile: UserProfile): Promise<void>;
    setSocialMediaLinks(links: SocialMediaLinks): Promise<void>;
    submitMembershipRegistration(registration: MembershipRegistration): Promise<void>;
    updateAboutSections(sections: Array<AboutSection>): Promise<void>;
    updateClub(id: bigint, name: string, profilePicture: string | null, aims: string, motto: string, slogan: string, achievements: string, program: string, activities: string, history: string): Promise<void>;
    updateHistoryContent(newContent: string): Promise<void>;
    updateHomePageSections(sections: Array<HomePageSection>): Promise<void>;
}
