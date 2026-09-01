import Button from "../components/ui/Button"
import Card from "../components/ui/Card"
import Input, { Select } from "../components/ui/Input"
import { languages } from "../data/mockData"
import { useApp } from "../context/AppContext"

export default function Settings() {
  const { language, setLanguage, profile, setProfile, notificationsOn, setNotificationsOn } = useApp()

  function saveProfile(event) {
    event.preventDefault()
    const data = new FormData(event.target)
    setProfile((prev) => ({
      ...prev,
      name: data.get("name"),
      email: data.get("email"),
      farmName: data.get("farmName"),
      location: data.get("location"),
      fieldSizeAcres: Number(data.get("fieldSize")),
    }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-stone-900">Settings</h2>
        <p className="mt-1 text-stone-500">Profile, farm context and language stay on this device for the demo.</p>
      </div>

      <form onSubmit={saveProfile} className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="font-semibold">Profile</h3>
          <div className="mt-4 space-y-3">
            <Input name="name" label="Name" defaultValue={profile.name} />
            <Input name="email" type="email" label="Email" defaultValue={profile.email} />
          </div>
        </Card>
        <Card>
          <h3 className="font-semibold">Farm information</h3>
          <div className="mt-4 space-y-3">
            <Input name="farmName" label="Farm name" defaultValue={profile.farmName} />
            <Input name="location" label="Location" defaultValue={profile.location} />
            <Input name="fieldSize" type="number" step="0.1" label="Field size (acres)" defaultValue={profile.fieldSizeAcres} />
          </div>
          <Button type="submit" className="mt-4">
            Save farm context
          </Button>
        </Card>
      </form>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="font-semibold">Language</h3>
          <p className="mt-1 text-sm text-stone-500">
            Selector is live. Full Hindi and Marathi strings can be added to `src/i18n/strings.js` later.
          </p>
          <div className="mt-4">
            <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.label}
                </option>
              ))}
            </Select>
          </div>
        </Card>
        <Card>
          <h3 className="font-semibold">Notifications</h3>
          <div className="mt-4 space-y-3 text-sm">
            {Object.entries(notificationsOn).map(([key, value]) => (
              <label key={key} className="flex items-center justify-between rounded-xl bg-mist px-3 py-3">
                <span className="capitalize">{key} alerts</span>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setNotificationsOn((prev) => ({ ...prev, [key]: e.target.checked }))}
                />
              </label>
            ))}
          </div>
        </Card>
        <Card className="lg:col-span-2">
          <h3 className="font-semibold">Preferences</h3>
          <p className="mt-2 text-sm text-stone-500">
            Units stay metric (kg/ha). Currency display uses ₹ for the demo. No analytics cookies are collected.
          </p>
        </Card>
      </div>
    </div>
  )
}
