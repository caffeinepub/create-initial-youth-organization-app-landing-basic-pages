import Map "mo:core/Map";
import Nat "mo:core/Nat";
import BlobStorage "blob-storage/Storage";

module {
  // Old types
  type OldAboutSection = {
    title : Text;
    content : Text;
    link : Bool;
  };

  type OldHomePageSection = {
    title : Text;
    description : Text;
    imageUrl : Text;
  };

  type OldActor = {
    historyContent : Text;
    membershipRegistrations : [OldMembershipRegistration];
    socialMediaLinks : ?OldSocialMediaLinks;
    aboutSections : [OldAboutSection];
    homePageSections : [OldHomePageSection];
    // Omitted clubMap, as it's not part of the stable state
  };

  type OldMembershipRegistration = {
    name : Text;
    email : Text;
    address : Text;
    phone : Text;
    additionalInfo : Text;
  };

  type OldSocialMediaLinks = {
    facebook : Text;
    linkedin : Text;
    tiktok : Text;
    twitter : Text;
    youtube : Text;
    instagram : Text;
    whatsapp : Text;
  };

  // New types
  type NewAboutSection = {
    title : Text;
    content : Text;
    link : Bool;
    media : ?BlobStorage.ExternalBlob;
  };

  type NewHomePageSection = {
    title : Text;
    description : Text;
    image : ?BlobStorage.ExternalBlob;
  };

  type NewActor = {
    historyContent : Text;
    historyMedia : ?BlobStorage.ExternalBlob;
    membershipRegistrations : [OldMembershipRegistration];
    socialMediaLinks : ?OldSocialMediaLinks;
    aboutSections : [NewAboutSection];
    homePageSections : [NewHomePageSection];
    brandingMedia : ?Branding;
  };

  type Branding = {
    logo : ?BlobStorage.ExternalBlob;
    otherMedia : ?BlobStorage.ExternalBlob;
    name : Text;
  };

  public func run(old : OldActor) : NewActor {
    let newAboutSections = old.aboutSections.map<OldAboutSection, NewAboutSection>(
      func(oldSection) {
        {
          title = oldSection.title;
          content = oldSection.content;
          link = oldSection.link;
          media = null; // Default existing data with no media
        };
      }
    );

    let newHomePageSections = old.homePageSections.map<OldHomePageSection, NewHomePageSection>(
      func(oldSection) {
        {
          title = oldSection.title;
          description = oldSection.description;
          image = null; // Default existing data with no image
        };
      }
    );

    {
      historyContent = old.historyContent;
      historyMedia = null;
      membershipRegistrations = old.membershipRegistrations;
      socialMediaLinks = old.socialMediaLinks;
      aboutSections = newAboutSections;
      homePageSections = newHomePageSections;
      brandingMedia = null;
    };
  };
};
