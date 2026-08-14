import { useCallback, useEffect, useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import TopBar from './components/TopBar.jsx';
import ChatWindow from './components/ChatWindow.jsx';
import InputBar from './components/InputBar.jsx';
import LiveVoiceOverlay from './components/LiveVoiceOverlay.jsx';
import SettingsModal from './components/SettingsModal.jsx';
import { useChat } from './hooks/useChat.js';
import * as api from './api/client.js';
import { DEFAULT_AI_AVATAR, DEFAULT_USER_AVATAR } from './assets/defaultAvatars.js';

export default function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isLiveVoiceOpen, setLiveVoiceOpen] = useState(false);

  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);

  const [aiAvatarUrl, setAiAvatarUrl] = useState(DEFAULT_AI_AVATAR);
  const [userAvatarUrl, setUserAvatarUrl] = useState(DEFAULT_USER_AVATAR);
  const [userName, setUserName] = useState('You');

  const { messages, isLoadingHistory, isSending, send } = useChat(activeConversationId);

  useEffect(() => {
    api
      .listConversations()
      .then((data) => {
        const list = data.conversations || [];
        setConversations(list);
        if (list.length > 0) setActiveConversationId(list[0].id);
      })
      .catch(() => {});
  }, []);

  const handleNewChat = useCallback(() => {
    setActiveConversationId(null);
    setSidebarOpen(false);
  }, []);

  const handleSelectConversation = useCallback((id) => {
    setActiveConversationId(id);
    setSidebarOpen(false);
  }, []);

  const handleSend = useCallback(
    async (text, files) => {
      let attachmentIds = [];
      let attachmentPreviews = [];

      if (files.length > 0) {
        const uploads = await Promise.all(
          files.map((file) => api.uploadDocument(file, activeConversationId))
        );
        attachmentIds = uploads.map((u) => u.id);
        attachmentPreviews = files.map((f) => ({ name: f.name }));
      }

      await send(text, { attachmentIds, attachmentPreviews });

      if (!activeConversationId) {
        api
          .listConversations()
          .then((data) => {
            const list = data.conversations || [];
            setConversations(list);
            if (list.length > 0) setActiveConversationId(list[0].id);
          })
          .catch(() => {});
      }
    },
    [activeConversationId, send]
  );

  const handleProfileImageChange = useCallback((file) => {
    const localPreview = URL.createObjectURL(file);
    setUserAvatarUrl(localPreview);
    api.uploadProfileImage(file).catch(() => {});
  }, []);

  const activeConversation = conversations.find((c) => c.id === activeConversationId);
  const title = activeConversation?.title || 'Abdullah AI';

  return (
    <div className="h-[100dvh] w-full flex bg-ink-950 overflow-hidden">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={handleSelectConversation}
        onNewChat={handleNewChat}
        onStartLiveVoice={() => setLiveVoiceOpen(true)}
        userName={userName}
        userAvatarUrl={userAvatarUrl}
        onProfileImageChange={handleProfileImageChange}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar onOpenSidebar={() => setSidebarOpen(true)} title={title} aiAvatarUrl={aiAvatarUrl} />

        <ChatWindow
          messages={messages}
          isLoadingHistory={isLoadingHistory}
          isSending={isSending}
          aiAvatarUrl={aiAvatarUrl}
          userAvatarUrl={userAvatarUrl}
        />

        <InputBar onSend={handleSend} onStartLiveVoice={() => setLiveVoiceOpen(true)} isSending={isSending} />
      </div>

      {isLiveVoiceOpen && (
        <LiveVoiceOverlay
          conversationId={activeConversationId}
          aiAvatarUrl={aiAvatarUrl}
          onClose={() => setLiveVoiceOpen(false)}
        />
      )}

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setSettingsOpen(false)}
        userName={userName}
        userAvatarUrl={userAvatarUrl}
        onProfileImageChange={handleProfileImageChange}
      />
    </div>
  );
}
