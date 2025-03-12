interface INewRefreshToken {
  userId: number,
  token: string,
  expiresIn: Date,
  createdAt: Date
}

export default INewRefreshToken;
