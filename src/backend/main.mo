import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Nat32 "mo:core/Nat32";
import Iter "mo:core/Iter";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";



actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type MembershipRegistration = {
    name : Text;
    email : Text;
    address : Text;
    phone : Text;
    additionalInfo : Text;
  };

  public type UserProfile = {
    name : Text;
  };

  public type Club = {
    id : Nat;
    name : Text;
    profilePicture : ?Text;
    aims : Text;
    motto : Text;
    slogan : Text;
    achievements : Text;
    program : Text;
    activities : Text;
    history : Text;
  };

  public type SocialMediaLinks = {
    facebook : Text;
    linkedin : Text;
    tiktok : Text;
    twitter : Text;
    youtube : Text;
    instagram : Text;
    whatsapp : Text;
  };

  public type AboutSection = {
    title : Text;
    content : Text;
    link : Bool;
  };

  public type HomePageSection = {
    title : Text;
    description : Text;
    imageUrl : Text;
  };

  stable var historyContent = "";
  stable var membershipRegistrations : [MembershipRegistration] = [];
  stable var nextClubId = 0;
  stable var clubIdRange = (0 : Nat32, 0 : Nat32 + 1000);
  stable var socialMediaLinks : ?SocialMediaLinks = null;
  stable var aboutSections : [AboutSection] = [];
  stable var homePageSections : [HomePageSection] = [];

  let clubMap = Map.empty<Nat, Club>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    null;
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    null;
  };

  public shared ({ caller }) func saveCallerUserProfile(_profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
  };

  public query func getHistoryContent() : async Text {
    historyContent;
  };

  public shared ({ caller }) func updateHistoryContent(newContent : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update history content");
    };
    historyContent := newContent;
  };

  public shared ({ caller }) func submitMembershipRegistration(registration : MembershipRegistration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can submit registrations");
    };
    membershipRegistrations := membershipRegistrations.concat([registration]);
  };

  public query ({ caller }) func getAllMembershipRegistrations() : async [MembershipRegistration] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view registrations");
    };
    membershipRegistrations;
  };

  public shared ({ caller }) func createClub(
    name : Text,
    profilePicture : ?Text,
    aims : Text,
    motto : Text,
    slogan : Text,
    achievements : Text,
    program : Text,
    activities : Text,
    history : Text,
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create clubs");
    };

    let newId = nextClubId;
    let club : Club = {
      id = newId;
      name;
      profilePicture;
      aims;
      motto;
      slogan;
      achievements;
      program;
      activities;
      history;
    };

    clubMap.add(newId, club);
    nextClubId += 1;
    newId;
  };

  public shared ({ caller }) func updateClub(
    id : Nat,
    name : Text,
    profilePicture : ?Text,
    aims : Text,
    motto : Text,
    slogan : Text,
    achievements : Text,
    program : Text,
    activities : Text,
    history : Text,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update clubs");
    };

    switch (clubMap.get(id)) {
      case (null) { Runtime.trap("Club not found") };
      case (?_) {
        let updatedClub : Club = {
          id;
          name;
          profilePicture;
          aims;
          motto;
          slogan;
          achievements;
          program;
          activities;
          history;
        };
        clubMap.add(id, updatedClub);
      };
    };
  };

  public shared ({ caller }) func deleteClub(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete clubs");
    };

    if (not clubMap.containsKey(id)) {
      Runtime.trap("Club not found");
    };

    clubMap.remove(id);
  };

  public query func getClubs() : async [Club] {
    clubMap.values().toArray();
  };

  // Social Media Management
  public query func getSocialMediaLinks() : async ?SocialMediaLinks {
    socialMediaLinks;
  };

  public shared ({ caller }) func setSocialMediaLinks(links : SocialMediaLinks) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update social media links");
    };
    socialMediaLinks := ?links;
  };

  // About Content Management
  public query func getAboutSections() : async [AboutSection] {
    aboutSections;
  };

  public shared ({ caller }) func updateAboutSections(sections : [AboutSection]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update About sections");
    };
    aboutSections := sections;
  };

  // Home Page Configuration Management
  public query func getHomePageSections() : async [HomePageSection] {
    homePageSections;
  };

  public shared ({ caller }) func updateHomePageSections(sections : [HomePageSection]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update Home page sections");
    };
    homePageSections := sections;
  };
};

