//purpose: Interface for new extra routes

interface INewExtraRoute {
  userId: number;
  date: Date
  costCenter: string;
  driver: string;
  client: string;
  status: string;
  collaborators: { id: number; name: string; }[];
  user: { id: number; name: string; };
}

export default INewExtraRoute;  