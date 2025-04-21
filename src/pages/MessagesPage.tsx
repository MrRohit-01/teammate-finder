import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import MessageThread from '../components/messaging/MessageThread';
import ContactList from '../components/messaging/ContactList';

const MessagesPage: React.FC = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { currentUser, users, messages, sendMessage, markMessageAsRead } = useAppStore();
  
  const [selectedContactId, setSelectedContactId] = useState<string | null>(userId || null);
  const [contactsWithMessages, setContactsWithMessages] = useState<typeof users>([]);
  const [messagesByContact, setMessagesByContact] = useState<Record<string, typeof messages>>({});
  
  useEffect(() => {
    if (!currentUser) return;
    
    // Get unique contact IDs from messages (either sender or receiver)
    const contactIds = new Set<string>();
    
    messages.forEach(msg => {
      if (msg.senderId === currentUser.id) {
        contactIds.add(msg.receiverId);
      } else if (msg.receiverId === currentUser.id) {
        contactIds.add(msg.senderId);
      }
    });
    
    // Get user objects for contacts
    const contacts = users.filter(user => 
      contactIds.has(user.id) && user.id !== currentUser.id
    );
    
    setContactsWithMessages(contacts);
    
    // Group messages by contact
    const groupedMessages: Record<string, typeof messages> = {};
    
    contacts.forEach(contact => {
      groupedMessages[contact.id] = messages.filter(msg => 
        (msg.senderId === currentUser.id && msg.receiverId === contact.id) ||
        (msg.senderId === contact.id && msg.receiverId === currentUser.id)
      );
    });
    
    setMessagesByContact(groupedMessages);
    
    // Mark messages from selected contact as read
    if (selectedContactId) {
      const unreadMessages = messages.filter(msg => 
        msg.senderId === selectedContactId && 
        msg.receiverId === currentUser.id && 
        !msg.read
      );
      
      unreadMessages.forEach(msg => {
        markMessageAsRead(msg.id);
      });
    }
  }, [currentUser, users, messages, selectedContactId, markMessageAsRead]);
  
  // Set selected contact from URL parameter
  useEffect(() => {
    if (userId && userId !== selectedContactId) {
      setSelectedContactId(userId);
    }
  }, [userId]);
  
  const handleSelectContact = (contactId: string) => {
    setSelectedContactId(contactId);
    navigate(`/messages/${contactId}`);
  };
  
  const handleSendMessage = (content: string) => {
    if (!currentUser || !selectedContactId) return;
    sendMessage(currentUser.id, selectedContactId, content);
  };
  
  if (!currentUser) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-2">You need to be logged in</h3>
          <p className="text-gray-600">
            Please log in to view your messages.
          </p>
        </div>
      </div>
    );
  }
  
  const selectedContact = users.find(user => user.id === selectedContactId);
  const selectedMessages = selectedContactId ? messagesByContact[selectedContactId] || [] : [];
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 min-h-[600px]">
          <div className="md:col-span-1 border-r">
            <ContactList
              contacts={contactsWithMessages}
              messages={messagesByContact}
              currentUserId={currentUser.id}
              selectedContactId={selectedContactId}
              onSelectContact={handleSelectContact}
            />
          </div>
          
          <div className="md:col-span-2 lg:col-span-3">
            {selectedContact ? (
              <MessageThread
                messages={selectedMessages}
                currentUser={currentUser}
                otherUser={selectedContact}
                onSendMessage={handleSendMessage}
              />
            ) : (
              <div className="h-full flex items-center justify-center p-8 text-center text-gray-500 bg-gray-50">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No conversation selected</h3>
                  <p>
                    Select a contact from the list or start a new conversation from the teammates page.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;