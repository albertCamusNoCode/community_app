export interface Community {
  id: string;
  name: string;
  memberCount: number;
  role: "creator" | "member";
}
