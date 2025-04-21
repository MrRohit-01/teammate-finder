import React, { useState, useRef, useEffect } from 'react';
import { User, Message } from '../../types';
import { format } from 'date-fns';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import { Send } from 'lucide-react';

interface MessageThreadProps {
  messages: Message[];
  currentUser: User;
  otherUser: User;
  onSendMessage: (content: string) => void;
  className?: string;
}

const MessageThread: React.FC<MessageThreadProps> = ({
  messages,
  currentUser,
  otherUser,
  onSendMessage,
  className = '',
}) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
  
  const formatMessageTime = (date: Date) => {
    return format(new Date(date), 'h:mm a');
  };
  
  return (
    <div className={`flex flex-col h-full ${className}`}>
      <div className="flex items-center p-4 border-b">
        <Avatar
          src={otherUser.photoURL}
          name={otherUser.displayName}
          size="md"
        />
        <div className="ml-3">
          <h3 className="text-base font-medium text-gray-900">
            {otherUser.displayName}
          </h3>
          <p className="text-xs text-gray-500">
            {otherUser.experienceLevel.charAt(0).toUpperCase() + otherUser.experienceLevel.slice(1)} • {' '}
            {otherUser.preferredRoles.map(role => 
              role.charAt(0).toUpperCase() + role.slice(1)
            ).join(', ')}
          </p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {sortedMessages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          sortedMessages.map((message) => {
            const isCurrentUser = message.senderId === currentUser.id;
            const user = isCurrentUser ? currentUser : otherUser;
            
            return (
              <div 
                key={message.id} 
                className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className="flex max-w-[75%]">
                  {!isCurrentUser && (
                    <Avatar
                      src={user.photoURL}
                      name={user.displayName}
                      size="sm"
                      className="mr-2 mt-1"
                    />
                  )}
                  
                  <div>
                    <div 
                      className={`
                        px-4 py-2 rounded-lg text-sm
                        ${
                          isCurrentUser 
                            ? 'bg-indigo-500 text-white' 
                            : 'bg-gray-100 text-gray-800'
                        }
                      `}
                    >
                      {message.content}
                    </div>
                    <div 
                      className={`
                        text-xs text-gray-500 mt-1
                        ${isCurrentUser ? 'text-right' : 'text-left'}
                      `}
                    >
                      {formatMessageTime(message.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 min-h-[80px] p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Type your message..."
          />
          <Button
            variant="primary"
            icon={<Send size={16} />}
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="self-end"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageThread;