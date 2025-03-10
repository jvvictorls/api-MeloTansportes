interface IRefreshToken {
  id?: number,
  userId: number,
  token: string,
  expiresIn: Date,
  createdAt: Date
}

export default IRefreshToken;
