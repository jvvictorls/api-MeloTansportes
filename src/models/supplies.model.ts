import SequelizeSupplies from "../database/models/SequelizeSupplies";
import SequelizeVehicles from "../database/models/SequelizeVehicles";
export default class suppliesModel {
  private supplies = SequelizeSupplies;

  async getAll() {
    const supplies = await this.supplies.findAll({
      include: {
        model: SequelizeVehicles,
        as: 'vehicle',
        attributes: ['id', 'model', 'plate',],
      }
    });
    return supplies;
  }
}