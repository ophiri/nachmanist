import { useState, useEffect } from 'react'

export interface AzureConfig {
  endpoint: string
  apiKey: string
  deployment: string
  apiVersion: string
}

const STORAGE_KEY = 'nachmanist-azure-config'

function loadConfig(): AzureConfig {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch { /* ignore */ }
  return { endpoint: '', apiKey: '', deployment: 'gpt-4o', apiVersion: '2024-08-01-preview' }
}

function saveConfig(config: AzureConfig) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
}

export function getStoredConfig(): AzureConfig {
  return loadConfig()
}

export function isConfigured(): boolean {
  const config = loadConfig()
  return !!(config.endpoint && config.apiKey && config.deployment)
}

interface Props {
  isOpen: boolean
  onClose: () => void
  onSave: () => void
}

export function SettingsModal({ isOpen, onClose, onSave }: Props) {
  const [config, setConfig] = useState<AzureConfig>(loadConfig)

  useEffect(() => {
    if (isOpen) setConfig(loadConfig())
  }, [isOpen])

  if (!isOpen) return null

  const handleSave = () => {
    saveConfig(config)
    onSave()
    onClose()
  }

  const isValid = config.endpoint && config.apiKey && config.deployment

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>⚙️ הגדרות Azure OpenAI</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <p className="modal-description">
            הגדר את פרטי Azure OpenAI שלך כדי להתחיל לשוחח עם הנחמניסט.
            <br />
            הפרטים נשמרים רק בדפדפן שלך (localStorage).
          </p>

          <div className="form-group">
            <label>Endpoint</label>
            <input
              type="url"
              value={config.endpoint}
              onChange={e => setConfig({ ...config, endpoint: e.target.value })}
              placeholder="https://your-resource.openai.azure.com"
              dir="ltr"
            />
          </div>

          <div className="form-group">
            <label>API Key</label>
            <input
              type="password"
              value={config.apiKey}
              onChange={e => setConfig({ ...config, apiKey: e.target.value })}
              placeholder="your-api-key"
              dir="ltr"
            />
          </div>

          <div className="form-group">
            <label>Deployment Name</label>
            <input
              type="text"
              value={config.deployment}
              onChange={e => setConfig({ ...config, deployment: e.target.value })}
              placeholder="gpt-4o"
              dir="ltr"
            />
          </div>

          <div className="form-group">
            <label>API Version</label>
            <input
              type="text"
              value={config.apiVersion}
              onChange={e => setConfig({ ...config, apiVersion: e.target.value })}
              placeholder="2024-08-01-preview"
              dir="ltr"
            />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>ביטול</button>
          <button className="btn-save" onClick={handleSave} disabled={!isValid}>שמור</button>
        </div>
      </div>
    </div>
  )
}
