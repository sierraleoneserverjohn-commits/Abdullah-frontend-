import React, { useState } from 'react';
import { Plus, Mic, Send, MessageSquare, Activity, Zap, PhoneCall, Paperclip } from 'lucide-react';

export default function AbdullahAI() {
  const [inputText, setInputText] = useState('');
  const [isLive, setIsLive] = useState(false);
  const backendUrl = "https://abdullah-ai-backend.onrender.com";

  const handleSend = async () => {
    if (!inputText.trim()) return;
    // Example hookup to your Render backend
    console.log(`Sending to ${backendUrl}/api/chat:`, inputText);
    setInputText('');
  };

  return (
    <div className="flex h-screen w-screen bg-[#1E1E2E] text-white overflow-hidden font-sans">
      
      {/* SIDEBAR */}
      <div className="w-72 bg-[#181825] flex flex-col justify-between border-r border-[#313244]">
        <div className="p-4 flex flex-col gap-6">
          
          {/* User Profile */}
          <div className="flex items-center gap-3">
             {/* Replace with your actual GitHub raw image link */}
             <img 
               src="https://github.com/github.png" 
               alt="User Profile" 
               className="w-10 h-10 rounded-full object-cover border border-[#45475A]" 
             />
             <div className="font-semibold text-lg">Abdullah</div>
          </div>

          {/* Live Conversation Button */}
          <button 
            onClick={() => setIsLive(!isLive)}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all font-medium ${
              isLive ? 'bg-red-500/20 text-red-400 border border-red-500/50' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
             <PhoneCall size={20} className={isLive ? "animate-pulse" : ""} />
             <span>{isLive ? 'End Live Voice' : 'Start Live Voice'}</span>
          </button>

          {/* Recent Chats */}
          <div className="flex flex-col gap-2 mt-2">
             <h3 className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Recent Chats</h3>
             <button className="flex items-center gap-3 text-gray-300 hover:bg-[#313244] p-2 rounded-lg transition-all text-left">
                <MessageSquare size={16} />
                <span className="truncate text-sm">Groq Llama 3.3 Setup</span>
             </button>
             <button className="flex items-center gap-3 text-gray-300 hover:bg-[#313244] p-2 rounded-lg transition-all text-left">
                <MessageSquare size={16} />
                <span className="truncate text-sm">Gemini Live API Routing</span>
             </button>
          </div>
        </div>
        
        {/* Real-time API Tracker */}
        <div className="p-4 border-t border-[#313244] bg-[#11111B]">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
             <Activity size={16} />
             <span className="font-medium">Real-Time API Tracking</span>
          </div>
          <div className="flex flex-col gap-2 text-xs">
            <div className="flex justify-between items-center">
              <span>Groq (Llama 3.3):</span> 
              <span className="text-green-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> 12ms</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Gemini Live:</span> 
              <span className={isLive ? "text-blue-400" : "text-gray-500"}>
                {isLive ? 'Active Web Socket' : 'Standby'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN SCREEN */}
      <div className="flex-1 flex flex-col bg-[#1E1E2E]">
        
        {/* Header */}
        <div className="h-16 border-b border-[#313244] flex items-center px-6 justify-between shrink-0">
           <div className="flex items-center gap-3">
              {/* AI Profile Logo */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
                 <Zap size={16} className="text-white" />
              </div>
              <span className="font-semibold text-lg tracking-wide">Abdullah AI</span>
           </div>
           <div className="text-xs font-medium text-gray-400 bg-[#313244] px-3 py-1.5 rounded-full border border-[#45475A]">
              Powered by Groq & Gemini
           </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
           <div className="flex gap-4 max-w-4xl mx-auto w-full">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-md">
                 <Zap size={16} className="text-white" />
              </div>
              <div className="bg-[#313244] p-4 rounded-2xl rounded-tl-none text-sm leading-relaxed text-gray-200 border border-[#45475A]">
                 Hello bro! I'm officially hooked up to your backend at <b>{backendUrl}</b>. I am ready to process documents, use Groq for lightning-fast text, and fire up Gemini Live for real-time voice. What are we building today?
              </div>
           </div>
        </div>

        {/* Typing Bar Area */}
        <div className="p-6 shrink-0 border-t border-[#313244]/50 bg-gradient-to-t from-[#1E1E2E] to-transparent">
           <div className="max-w-4xl mx-auto bg-[#313244] rounded-2xl p-2 flex items-end gap-2 border border-[#45475A] shadow-xl focus-within:border-indigo-500 transition-colors">
              
              {/* Add Document Button */}
              <button className="p-3 text-gray-400 hover:text-white hover:bg-[#45475A] rounded-xl transition-all mb-0.5">
                 <Plus size={22} />
              </button>
              
              {/* Text Input */}
              <textarea 
                 value={inputText}
                 onChange={(e) => setInputText(e.target.value)}
                 placeholder="Type a message or attach a document..."
                 className="flex-1 bg-transparent text-white outline-none placeholder-gray-500 px-2 py-3 resize-none max-h-32"
                 rows="1"
              />

              {/* Dynamic Action Button */}
              {inputText.trim() === '' ? (
                 <button 
                    onClick={() => setIsLive(!isLive)}
                    className={`p-3 rounded-xl transition-all mb-0.5 shadow-lg ${
                      isLive ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-[#45475A] hover:bg-indigo-600 text-white'
                    }`}
                 >
                    <Mic size={20} />
                 </button>
              ) : (
                 <button 
                    onClick={handleSend}
                    className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all mb-0.5 shadow-lg"
                 >
                    <Send size={20} />
                 </button>
              )}
           </div>
        </div>

      </div>
    </div>
  );
}
