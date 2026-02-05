import Map "mo:core/Map";
import Nat "mo:core/Nat";
import BlobStorage "blob-storage/Storage";

module {
  type Event = {
    id : Nat;
    title : Text;
    description : Text;
    dateTime : Text;
    location : Text;
    media : ?BlobStorage.ExternalBlob;
    organizer : Text;
  };

  type OldActor = {};
  type NewActor = {
    eventsMap : Map.Map<Nat, Event>;
  };

  public func run(old : OldActor) : NewActor {
    let newEventsMap = Map.empty<Nat, Event>();
    { eventsMap = newEventsMap };
  };
};
