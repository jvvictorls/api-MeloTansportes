import SequelizeRefreshToken from '../database/models/SequelizeRefreshToken';
import IRefreshToken from '../Interfaces/refreshToken/IRefreshToken';
import INewRefreshToken from '../Interfaces/refreshToken/INewRefreshToken';

class RefreshTokenModel {
  private sequelizeRefreshToken = SequelizeRefreshToken;

  async create(refreshToken: INewRefreshToken) {
    const newRefreshToken = await this.sequelizeRefreshToken.create(refreshToken);
    return newRefreshToken;
  }

  async findByID(id: number)  {
    const findRefreshToken = await this.sequelizeRefreshToken.findByPk(id);
    return findRefreshToken;
  }

  async findByToken(token: string) {
    const findRefreshToken = await this.sequelizeRefreshToken.findOne({ where: { token } });
    return findRefreshToken?.dataValues;
  }

  async update(refreshToken: IRefreshToken): Promise<void> {
    await this.sequelizeRefreshToken.update(
      refreshToken,
      { where: { id: refreshToken.id } },
    );
  }

  async delete(id: number): Promise<boolean> {
  const deletedCount = await this.sequelizeRefreshToken.destroy({
    where: { id },
  });
  return deletedCount > 0;
  }
}

export default RefreshTokenModel;
