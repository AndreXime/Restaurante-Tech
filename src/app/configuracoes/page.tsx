import { SettingsTabs } from "../../components/settings/settings-tabs"
import { SimpleHeader } from "../../components/layout/simple-header"

export default function SettingsPage() {
  return (
    <div className="flex flex-col h-full">
      <SimpleHeader title="Configurações" />
      <div className="flex-1 overflow-auto p-4">
        <SettingsTabs />
      </div>
    </div>
  )
}
