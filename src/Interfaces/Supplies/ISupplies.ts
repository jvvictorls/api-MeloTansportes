export default interface ISupplies {
  id: number;
  vehicle_id: number;
  name: string;
  unity: string;
  quantity: number;
  unity_price: number;
  total_price: number;
  fiscal_note: string;
  created_at: Date;
  updated_at: Date;
}