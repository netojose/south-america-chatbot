import User from './User';

export default interface UsersSlice {
  items: {
    [id: string]: User;
  };
}
