import ICollaborators from "./ICollaborators";

export default interface ICollaboratorsModel {
  createCollaborator(collaborator: ICollaborators): Promise<ICollaborators>;
  createManyCollaborators(collaborators: ICollaborators[]): Promise<ICollaborators[]>;
}