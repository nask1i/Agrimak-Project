import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { AppStore } from '../utils/store';
import { Product } from '../types';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  products?: Product[]; // when present, render product suggestions
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm the Agrimak assistant. I can help you with product information, delivery questions, store hours, and more. What would you like to know?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const ProductSuggestions: React.FC<{ products: Product[] }> = ({ products }) => {
    return (
      <div className="mt-2 space-y-2">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white border rounded-md shadow-sm hover:shadow-md transition-shadow p-2 flex items-center space-x-3"
          >
            <Link
              to={`/product/${p.id}`}
              className="flex items-center space-x-3 w-full"
            >
              <img
                src={p.image}
                alt={p.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-700 truncate">{p.title}</div>
                <div className="text-xs text-gray-500">${p.price.toFixed(2)}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    );
  };

  const handleSendMessage = async () => {
    const text = inputText.trim();
    if (!text) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsSending(true);

    try {
      const response = await AppStore.sendSearch(text);
      // response expected to be Product[]
      if (Array.isArray(response) && response.length > 0) {
        // first a text reply
        const introMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Here is the list of products matching your needs:",
          isBot: true,
          timestamp: new Date()
        };
        // then a message containing products (rendered specially)
        const productsMessage: Message = {
          id: (Date.now() + 2).toString(),
          text: "",
          isBot: true,
          timestamp: new Date(),
          products: response
        };

        setMessages(prev => [...prev, introMessage, productsMessage]);
      } else {
        // fallback to simple text reply if no products found
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: "No products found matching your query.",
          isBot: true,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
      }
    } catch (err) {
      console.error("Chat send failed:", err);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I couldn't reach the server. Please try again later.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-lg transition-colors z-50"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col z-50">
          {/* Header */}
          <div className="bg-emerald-600 text-white p-4 rounded-t-lg flex items-center space-x-2">
            <Bot className="h-5 w-5" />
            <span className="font-medium">Agrimak Assistant</span>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-emerald-600 text-white'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.isBot ? (
                      <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    ) : (
                      <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    )}
                    <div>
                      {message.text && <p className="text-sm leading-relaxed">{message.text}</p>}
                      {message.products && message.products.length > 0 && (
                        <ProductSuggestions products={message.products} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 text-sm"
                disabled={isSending}
              />
              <button
                onClick={handleSendMessage}
                className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-lg transition-colors"
                disabled={isSending}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}