/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState, useRef, useEffect } from "react";
// import { searchData } from "../Controller/Pinecone";
import { embedAnswer, getResponse } from "../Controller/OpenAI";

type Message = {
  role: 'user' | 'bot';
  content: string;
};

export default function ChatbotUI() {
  const [inputMessage, setInputMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Message[]>([
    {
      role: 'bot',
      content: `Silahkan tanya apapun tentang saya!`
    }
  ]);

  const sendMessage = async() => {
    if (!inputMessage.trim()) return;
    
    // Tambahkan pesan user ke chat history
    const newUserMessage: Message = {
      role: 'user',
      content: inputMessage
    };
    try{
      setChatHistory(prev => [...prev, newUserMessage]);
      const embedData:number[] = await embedAnswer(inputMessage);
      console.log(`embedData = ${embedData}`);
      // const additionaldata:{ metadata: unknown; narasi: string; list: string[]} = await searchData(embedData)
      // const list: string[] = additionaldata.list;
      // const narasi: string = additionaldata.narasi;
      // const response: string= await getResponse(list, narasi, inputMessage);
      const response: string= await getResponse( inputMessage);
      
      const newBotMessage: Message = {
        role: 'bot',
        content: response
      };
      setChatHistory(prev => [...prev, newBotMessage])

    }catch(error: any){console.log(error)}


    setInputMessage("");
    
    

  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };
  const chatContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="h-[100vh] w-full bg-[#22242d] text-white px-5 md:px-28 ">
      <div className='w-full border-b-2 '> </div>
      <div className="md:px-52 flex flex-col items-center gap-6 h-full">
         {/* Header Chat */}
      <div className="py-4 text:lg md:text-xl font-bold">Chatbot Assistant</div>
      
      {/* Chat Area */}
      <div ref={chatContainerRef}  className="flex-1 w-full overflow-y-auto flex flex-col gap-4 pb-6 scrollbar-hide no-scrollbar">
        {chatHistory.map((message, index) => (
          <div 
            key={index}  
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[70%] rounded-lg p-4  ${
                message.role === 'user' 
                  ? 'bg-[#00b683] rounded-br-none' 
                  : 'bg-[#02777d] rounded-bl-none'
              }`}
            >
              <p>{message.content}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Input Area */}
      <div className="w-full pb-6">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Type your message..." 
            className="w-full bg-[#3a3f4b] rounded-full py-3 px-5 pr-12 focus:outline-none"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button 
            onClick={sendMessage} 
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            disabled={!inputMessage.trim()}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-6 w-6 ${inputMessage.trim() ? 'text-blue-400' : 'text-gray-500'}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
      </div>
     
    </div>
  );
}