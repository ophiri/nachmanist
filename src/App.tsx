import { useState, useRef, useEffect } from 'react'
import { ChatMessage } from './components/ChatMessage'
import { ChatInput } from './components/ChatInput'
import { Sidebar } from './components/Sidebar'
import { WelcomeScreen } from './components/WelcomeScreen'
import { sendMessage } from './services/chatService'
import type { Message, Conversation } from './types'

function App() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const activeConversation = conversations.find(c => c.id === activeConversationId)
  const messages = activeConversation?.messages ?? []

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const createNewConversation = (): string => {
    const id = Date.now().toString()
    const newConv: Conversation = {
      id,
      title: 'שיחה חדשה',
      messages: [],
      createdAt: new Date()
    }
    setConversations(prev => [newConv, ...prev])
    setActiveConversationId(id)
    return id
  }

  const handleSend = async (text: string) => {
    let convId = activeConversationId
    if (!convId) {
      convId = createNewConversation()
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    }

    setConversations(prev => prev.map(c => {
      if (c.id === convId) {
        const updated = {
          ...c,
          messages: [...c.messages, userMessage],
          title: c.messages.length === 0 ? text.slice(0, 40) + (text.length > 40 ? '...' : '') : c.title
        }
        return updated
      }
      return c
    }))

    setIsLoading(true)

    try {
      const allMessages = [
        ...(conversations.find(c => c.id === convId)?.messages ?? []),
        userMessage
      ]
      const response = await sendMessage(allMessages)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      }

      setConversations(prev => prev.map(c => {
        if (c.id === convId) {
          return { ...c, messages: [...c.messages, assistantMessage] }
        }
        return c
      }))
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'סליחה, נתקלתי בבעיה. כמו שרבי נחמן אמר: "אין שום ייאוש בעולם כלל!" - נסה שוב בבקשה.',
        timestamp: new Date()
      }
      setConversations(prev => prev.map(c => {
        if (c.id === convId) {
          return { ...c, messages: [...c.messages, errorMessage] }
        }
        return c
      }))
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteConversation = (id: string) => {
    setConversations(prev => prev.filter(c => c.id !== id))
    if (activeConversationId === id) {
      setActiveConversationId(null)
    }
  }

  return (
    <div className="app">
      <Sidebar
        conversations={conversations}
        activeId={activeConversationId}
        isOpen={sidebarOpen}
        onSelect={setActiveConversationId}
        onNew={() => createNewConversation()}
        onDelete={handleDeleteConversation}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <main className={`main-content ${sidebarOpen ? '' : 'full-width'}`}>
        {!sidebarOpen && (
          <button className="toggle-sidebar-btn" onClick={() => setSidebarOpen(true)}>
            ☰
          </button>
        )}

        <div className="chat-container">
          {messages.length === 0 ? (
            <WelcomeScreen onSuggestionClick={handleSend} />
          ) : (
            <div className="messages-area">
              {messages.map(msg => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              {isLoading && (
                <div className="message assistant-message">
                  <div className="message-avatar assistant-avatar">
                    <span className="avatar-icon">🕯️</span>
                  </div>
                  <div className="message-bubble">
                    <div className="typing-indicator">
                      <span></span><span></span><span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}

          <div className="input-area">
            <ChatInput onSend={handleSend} isLoading={isLoading} />
            <p className="disclaimer">
              הנחמניסט מבוסס על תורת רבי נחמן מברסלב. התשובות הן לצורך השראה ואינן מהוות תחליף לייעוץ רבני מוסמך.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
