export type EventType = {
  id?: string;
  _id?: string;
  title: string;
  description?: string;
  date: string;
  posterurl: string;
  time: string;
  society: string;
  archived?: boolean;
  createdBy?: string;
  tags: string[];
};
export type UserSocCardType = {
  id?: string;
  title: string;
  description?: string;
  tags: string[];
  setErrorMessage: (msg: string) => void;
  setuserEvents: React.Dispatch<React.SetStateAction<EventType[]>>;
};
