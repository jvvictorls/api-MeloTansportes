//purpose: Interface for new extra routes

interface INewExtraRoute {
  userId: number;
  origin: string;
  destination: string;
  date: Date
  time: string;
  costCenter: string;
  driver: string;
  client: string;
  status: string;
  collaborators: { id: number; name: string; }[];
  user: { id: number; name: string; };
}

export default INewExtraRoute;  