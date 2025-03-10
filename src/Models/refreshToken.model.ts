import SequelizeRefreshToken from '../database/models/SequelizeRefreshToken';
import IRefreshToken from '../Interfaces/refreshToken/IRefreshToken';

class RefreshTokenModel {
  private sequelizeRefreshToken = SequelizeRefreshToken;

  async create(refreshToken: IRefreshToken): Promise<IRefreshToken> {
    const newRefreshToken = await this.sequelizeRefreshToken.create(refreshToken);
    return newRefreshToken;
  }

  async findByID(id: number): Promise<IRefreshToken | null> {
    const findRefreshToken = await this.sequelizeRefreshToken.findByPk(id);
    return findRefreshToken;
  }

  async findByToken(token: string): Promise<IRefreshToken | null> {
    const findRefreshToken = await this.sequelizeRefreshToken.findOne({ where: { token } });
    return findRefreshToken;
  }

  async update(refreshToken: IRefreshToken): Promise<void> {
    await this.sequelizeRefreshToken.update(
      refreshToken,
      { where: { id: refreshToken.id } },
    );
  }

  async delete(id: number): Promise<SequelizeRefreshToken | null> {
    await this.sequelizeRefreshToken.destroy({ where: { id } });
    const deletedRefreshToken = await this.sequelizeRefreshToken.findByPk(id);
    return deletedRefreshToken;
  }
}

export default RefreshTokenModel;
