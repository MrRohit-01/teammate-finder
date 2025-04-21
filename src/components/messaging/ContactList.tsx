import React from 'react';
import { User, Message } from '../../types';
import Avatar from '../common/Avatar';
import { format } from 'date-fns';
import { MessageSquare } from 'lucide-react';

interface ContactListProps {
  contacts: User[];
  messages: Record<string, Message[]>;
  currentUserId: string;
  selectedContactId: string | null;
  onSelectContact: (contactId: string) => void;
  className?: string;
}

const ContactList: React.FC<ContactListProps> = ({
  contacts,
  messages,
  currentUserId,
  selectedContactId,
  onSelectContact,
  className = '',
}) => {
  const getLastMessage = (contactId: string) => {
    const contactMessages = messages[contactId] || [];
    if (contactMessages.length === 0) return null;
    
    return contactMessages[contactMessages.length - 1];
  };
  
  const getUnreadCount = (contactId: string) => {
    return (messages[contactId] || [])
      .filter(msg => msg.receiverId === currentUserId && !msg.read)
      .length;
  };
  
  const formatLastMessageTime = (date: Date) => {
    const messageDate = new Date(date);
    const today = new Date();
    
    if (
      messageDate.getDate() === today.getDate() &&
      messageDate.getMonth() === today.getMonth() &&
      messageDate.getFullYear() === today.getFullYear()
    ) {
      return format(messageDate, 'h:mm a');
    }
    
    return format(messageDate, 'MMM d');
  };
  
  return (
    <div className={`${className}`}>
      <div className="p-4 border-b">
        <h2 className="text-lg font-medium text-gray-900 flex items-center">
          <MessageSquare className="mr-2 h-5 w-5 text-indigo-500" />
          Messages
        </h2>
      </div>
      
      {contacts.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          <p>No conversations yet.</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {contacts.map(contact => {
            const lastMessage = getLastMessage(contact.id);
            const unreadCount = getUnreadCount(contact.id);
            
            return (
              <li 
                key={contact.id}
                className={`
                  hover:bg-gray-50 cursor-pointer
                  ${selectedContactId === contact.id ? 'bg-indigo-50' : ''}
                `}
                onClick={() => onSelectContact(contact.id)}
              >
                <div className="p-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar
                        src={contact.photoURL}
                        name={contact.displayName}
                        size="md"
                        online={true} // This would be dynamic in a real app
                      />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {contact.displayName}
                        </p>
                        {lastMessage && (
                          <p 
                            className={`
                              text-xs truncate max-w-[200px]
                              ${unreadCount > 0 ? 'font-medium text-gray-900' : 'text-gray-500'}
                            `}
                          >
                            {lastMessage.senderId === currentUserId ? 'You: ' : ''}
                            {lastMessage.content}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      {lastMessage && (
                        <span className="text-xs text-gray-500">
                          {formatLastMessageTime(lastMessage.createdAt)}
                        </span>
                      )}
                      {unreadCount > 0 && (
                        <span className="mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          {unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ContactList;