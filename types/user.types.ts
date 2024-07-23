export type User = {
  id: string;
  email: string | null;
  emailVisibility: boolean | null;
  verified: boolean | null;
  username: string | null;
  phone: string | null;
  phoneData?: {[key: string]: any};
  avatar: string | null;
  avatarUrl: string | null;
  created: Date;
  updated: Date | null;
}