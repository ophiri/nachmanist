import type { Conversation } from '../types'

interface Props {
  conversations: Conversation[]
  activeId: string | null
  isOpen: boolean
  onSelect: (id: string) => void
  onNew: () => void
  onDelete: (id: string) => void
  onToggle: () => void
}

export function Sidebar({ conversations, activeId, isOpen, onSelect, onNew, onDelete, onToggle }: Props) {
  if (!isOpen) return null

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">נחמניסט</h2>
        <button className="sidebar-toggle" onClick={onToggle} aria-label="סגור תפריט">✕</button>
      </div>

      <button className="new-chat-btn" onClick={onNew}>
        <span>+</span> שיחה חדשה
      </button>

      <div className="conversations-list">
        {conversations.map(conv => (
          <div
            key={conv.id}
            className={`conversation-item ${conv.id === activeId ? 'active' : ''}`}
            onClick={() => onSelect(conv.id)}
          >
            <span className="conv-icon">💬</span>
            <span className="conv-title">{conv.title}</span>
            <button
              className="delete-conv"
              onClick={e => { e.stopPropagation(); onDelete(conv.id) }}
              aria-label="מחק שיחה"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="branding">
          <span className="branding-icon">🕎</span>
          <span>ברוח רבי נחמן מברסלב</span>
        </div>
      </div>
    </aside>
  )
}
