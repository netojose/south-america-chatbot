import Message from './Message';

export default interface Messageslice {
  items: {
    [userID: string]: Array<Message>;
  };
}
