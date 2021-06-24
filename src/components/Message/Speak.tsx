import React from 'react';

const Speak = ({ text, audio }: { text: string; audio: string | null }): React.ReactElement => <li data-x={audio}>{text}</li>;

export default Speak;
