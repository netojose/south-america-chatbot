import User from './User';

export default interface UsersSlice {
  items: User[];
  isLoading: boolean;
}
