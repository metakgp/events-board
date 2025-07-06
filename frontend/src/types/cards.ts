export type SocCardType = {
  _id?: string;
  id?: string;
  name: string;
  mail: string;
  phone: string;
  description: string;
  onApprove: () => void;
  onDecline: () => void;
};
