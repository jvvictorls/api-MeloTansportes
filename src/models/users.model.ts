import IUsers from '../Interfaces/Users/IUsers';
import IUsersModel from '../Interfaces/Users/IUsersModel';
import SequelizeUsers from '../database/models/SequelizeUsers';

export default class UsersModel implements IUsersModel {
  private model = SequelizeUsers;

  private toEntity(user: any): IUsers {
    return user.get({ plain: true });
  }

  async findAll(): Promise<IUsers[]> {
    const users = await this.model.findAll();
    return users.map((u) => this.toEntity(u));
  }

  async findById(id: number): Promise<IUsers | null> {
    const user = await this.model.findByPk(id);
    if (!user) return null;

    return this.toEntity(user);
  }

  async findByEmail(email: string): Promise<IUsers | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;

    return this.toEntity(user);
  }

  async create(user: IUsers): Promise<IUsers> {
    const created = await this.model.create(user);
    return this.toEntity(created);
  }

  async update(id: number, user: IUsers): Promise<IUsers | null> {
    const [affectedRows] = await this.model.update(user, {
      where: { id },
    });

    if (affectedRows === 0) return null;

    return this.findById(id);
  }

  async delete(id: number): Promise<number> {
    return this.model.destroy({ where: { id } });
  }
}