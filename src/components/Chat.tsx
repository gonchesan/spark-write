import React from 'react';

interface ChatProp {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}
const Chat: React.FC<ChatProp> = ({ value, onChange }) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      cols={50}
      rows={4}
    />
  );
};

export default Chat;
