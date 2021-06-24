export type MessageChoice = { buttons: string[] };
export type MessageSpeak = { text: string; audio: string | null };
export type MessageUser = { text: string };

type Message = { id: string; type: 'user' | 'choice' | 'speak' } & (MessageChoice | MessageSpeak | MessageUser);

export default Message;
