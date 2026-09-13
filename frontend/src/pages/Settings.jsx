import { useEffect, useState } from "react";
import { CheckCircle, Loader2, User } from "lucide-react";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { getCurrentUser, updateCurrentUser } from "../services/api";
import { useApp } from "../context/AppContext";

export default function Settings() {
  const { profile, setProfile } = useApp();

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    profile_image: "",
    address: "",
    is_active: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      setLoading(true);
      setError("");

      const user = await getCurrentUser();

      setProfile({
        name: user.full_name,
        email: user.email,
        role: user.role,
        farmName: user.farm_name || "",
        location: user.address || "",
        fieldSizeAcres: user.field_size_acres || 0,
      });

      setForm({
        full_name: user.full_name || "",
        phone: user.phone || "",
        profile_image: user.profile_image || "",
        address: user.address || "",
        is_active: user.is_active ?? true,
      });
    } catch (err) {
      setError(err.message || "Failed to load profile.");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = {
        full_name: form.full_name,
        phone: form.phone,
        profile_image: form.profile_image,
        address: form.address,
        is_active: form.is_active,
      };

      const updatedUser = await updateCurrentUser(payload);

      setProfile({
        name: updatedUser.full_name,
        email: updatedUser.email,
        role: updatedUser.role,
        farmName: updatedUser.farm_name || "",
        location: updatedUser.address || "",
        fieldSizeAcres: updatedUser.field_size_acres || 0,
      });

      setForm({
        full_name: updatedUser.full_name || "",
        phone: updatedUser.phone || "",
        profile_image: updatedUser.profile_image || "",
        address: updatedUser.address || "",
        is_active: updatedUser.is_active ?? true,
      });

      setSuccess("Profile updated successfully.");
    } catch (err) {
      setError(err.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <Loader2 className="h-7 w-7 animate-spin text-forest-700" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-stone-900">Settings</h2>

        <p className="mt-1 text-stone-500">Manage your SmartAgriAI profile.</p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          <CheckCircle className="h-4 w-4" />
          {success}
        </div>
      )}

      <Card>
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-emerald-100 p-3">
            <User className="h-6 w-6 text-forest-700" />
          </div>

          <div>
            <h3 className="font-semibold text-stone-900">
              Profile Information
            </h3>

            <p className="text-sm text-stone-500">
              Update your personal information.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="Full Name"
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              placeholder="Your full name"
              required
            />

            <Input
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Your phone number"
            />

            <Input
              label="Profile Image URL"
              name="profile_image"
              value={form.profile_image}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
            />

            <Input
              label="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Your address"
            />
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-stone-200 bg-stone-50 p-4">
            <input
              id="is_active"
              type="checkbox"
              checked={form.is_active}
              onChange={(event) =>
                setForm((previous) => ({
                  ...previous,
                  is_active: event.target.checked,
                }))
              }
              className="h-4 w-4 rounded border-stone-300"
            />

            <label
              htmlFor="is_active"
              className="text-sm font-medium text-stone-700"
            >
              Account active
            </label>
          </div>

          <div className="border-t border-stone-200 pt-5">
            <h4 className="mb-3 text-sm font-semibold text-stone-700">
              Account Information
            </h4>

            <div className="grid gap-3 text-sm sm:grid-cols-3">
              <div>
                <p className="text-xs text-stone-400">Email</p>
                <p className="font-medium text-stone-800">
                  {profile?.email || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-xs text-stone-400">Role</p>
                <p className="font-medium capitalize text-stone-800">
                  {profile?.role || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-xs text-stone-400">User ID</p>
                <p className="font-medium text-stone-800">
                  {profile?.id ?? "N/A"}
                </p>
              </div>
            </div>
          </div>

          <Button type="submit" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
}
