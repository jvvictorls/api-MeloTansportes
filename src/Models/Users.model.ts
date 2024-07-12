import IUsers from '../Interfaces/Users/IUsers';
import IUsersModel from '../Interfaces/Users/IUsersModel';
import SequelizeUsers from '../database/models/SequelizeUsers';

export default class UsersModel implements IUsersModel {
  private model = SequelizeUsers;

  async findAll(): Promise<IUsers[] | null> {
    const findAllUsers = await this.model.findAll();
    if (findAllUsers.length === 0) return null;
    return findAllUsers;
  }

  async findById(id: number): Promise<IUsers | null> {
    const findUser = await this.model.findByPk(id);
    if (!findUser) return null;
    return findUser.dataValues;
  }

  async findByEmail(email: string): Promise<IUsers | null> {
    const findUser = await this.model.findOne({ where: { email } });
    if (!findUser) return null;
    const { dataValues } = findUser;
    return dataValues;
  }

  async create(user: IUsers): Promise<IUsers> {
    const { dataValues } = await this.model.create(user);
    return dataValues;
  }

  async update(id: number, user: IUsers): Promise<IUsers | null> {
    const [affectedRows] = await this.model.update(user, { where: { id } });
    if (affectedRows < 0) {
      return null;
    }
    const updatedUser = await this.findById(id);
    return updatedUser;
  }

  async delete(id: number): Promise<number> {
    const deleteUser = await this.model.destroy({ where: { id } });
    return deleteUser;
  }
}
