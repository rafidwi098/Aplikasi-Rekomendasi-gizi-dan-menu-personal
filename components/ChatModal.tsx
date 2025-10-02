import React, { useState, useEffect, useRef } from 'react';
import { Doctor } from './Konsultasi';
import { CloseIcon } from './icons/CloseIcon';
import { SendIcon } from './icons/SendIcon';
import { GoogleGenAI } from "@google/genai";

interface ChatModalProps {
  doctor: Doctor;
  onClose: () => void;
}

interface ChatMessage {
  text: string;
  sender: 'user' | 'doctor';
}

const ChatModal: React.FC<ChatModalProps> = ({ doctor, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    // Pesan sambutan awal dari dokter
    setMessages([
      { sender: 'doctor', text: `Halo! Saya ${doctor.name}. Ada yang bisa saya bantu terkait kebutuhan gizi Anda?` }
    ]);
  }, [doctor]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const userMessage: ChatMessage = { sender: 'user', text: userInput };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const chatHistoryForPrompt = messages
        .map(msg => `${msg.sender === 'user' ? 'User' : 'Doctor'}: ${msg.text}`)
        .join('\n');

      const prompt = `Anda adalah ${doctor.name}, seorang ${doctor.specialty} yang ramah dan profesional. Lanjutkan percakapan ini dengan pengguna.
      Riwayat obrolan sejauh ini:
      ${chatHistoryForPrompt}
      User: ${userMessage.text}
      Doctor: `;
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction: `Anda adalah ${doctor.name}, seorang ahli gizi yang ramah dan profesional. Berikan nasihat yang bermanfaat, singkat, dan mudah dipahami. Jaga agar jawaban Anda tetap singkat dan bersifat percakapan.`,
          temperature: 0.7,
        }
      });
      
      const doctorResponse: ChatMessage = { sender: 'doctor', text: response.text };
      setMessages(prev => [...prev, doctorResponse]);

    } catch (error) {
      console.error("Error communicating with AI:", error);
      const errorResponse: ChatMessage = { sender: 'doctor', text: 'Maaf, sepertinya saya sedang mengalami sedikit kendala teknis. Bisa ulangi pertanyaan Anda?' };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex flex-col justify-end" onClick={onClose}>
      <div 
        className="bg-white w-full max-w-2xl mx-auto h-[90vh] md:h-[80vh] md:rounded-t-2xl shadow-2xl flex flex-col animate-slideInUp"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-slate-200 flex-shrink-0">
          <div className="flex items-center gap-3">
            <img src={doctor.imageUrl} alt={doctor.name} className="w-12 h-12 rounded-full" />
            <div>
              <h2 className="font-bold text-slate-800 text-lg">{doctor.name}</h2>
              <p className="text-sm text-green-600 font-medium">Online</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-500 hover:text-slate-800">
            <CloseIcon />
          </button>
        </header>

        {/* Messages Area */}
        <main className="flex-grow p-4 overflow-y-auto bg-slate-50">
          <div className="flex flex-col gap-4">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl animate-bubblePop ${
                    msg.sender === 'user' 
                      ? 'bg-emerald-500 text-white rounded-br-lg' 
                      : 'bg-white text-slate-800 rounded-bl-lg border border-slate-200'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                  <div className="px-4 py-3 rounded-2xl bg-white text-slate-500 border border-slate-200 rounded-bl-lg">
                      <span className="animate-pulse">Mengetik...</span>
                  </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Input Footer */}
        <footer className="p-4 border-t border-slate-200 bg-white flex-shrink-0">
          <form onSubmit={handleSendMessage} className="flex items-center gap-3">
            <input
              type="text"
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              placeholder="Ketik pesan Anda..."
              className="flex-grow w-full px-4 py-3 bg-slate-100 text-slate-800 border border-transparent rounded-full focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white transition"
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={!userInput.trim() || isLoading}
              className="bg-emerald-500 text-white rounded-full p-3 hover:bg-emerald-600 disabled:bg-slate-300 transition-colors transform active:scale-90"
              aria-label="Kirim pesan"
            >
              <SendIcon />
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
};

export default ChatModal;