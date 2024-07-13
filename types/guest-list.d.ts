type GuestStatus =
  | "Consideration"
  | "Decided"
  | "Invited"
  | "Confirmed"
  | "Declined"
  | "Not Invited";

type GuestTags =
  | "close family"
  | "wedding party"
  | "the cuz's & then some"
  | "extended family"
  | "friend of the family"
  | "friends"
  | "professional friends"
  | "co-workers"
  | "extended friends"
  | "wave 1"
  | "rehearsal dinner"
  | "breakfast";

type Bride = "Ainsley";
type Groom = "Drew";

interface DinnerCounts {
  beefDinnerCount?: number;
  salmonDinnerCount?: number;
  childDinnerCount?: number;
  veganDinnerCount?: number;
  totalDinnerCount?: number;
}

interface GuestGroup {
  offered: number | null;
  claimed?: number;
}

interface PlusOne extends GuestGroup {
  name?: string;
}

interface Guest {
  resourceId: string;
  resourceURL: string;
  name: string;
  guestStatus: GuestStatus;
  phone?: string;
  inviteId: string;
  address?: string;
  SMSUpdates?: boolean;
  inviteCode: string;
  createdAt: Date;
  guestOf?: (Bride | Groom)[];
  addressVerified: boolean;
  email?: string;
  guestNote?: string;
  saveDateWave?: number;
  attendingRehersalDinner: boolean;
  attendingBreakfast: boolean;
  tags: GuestTags[] | null;
  totalInvites: number | null;
  totalAttendees?: number | null;
  guestCount: GuestGroup;
  children: GuestGroup;
  plusOnes: PlusOne;
  dinnerPicks: DinnerCounts;
}
