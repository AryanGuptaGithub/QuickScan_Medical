// app/admin/settings/page.tsx
import { FiSave, FiUpload } from "react-icons/fi";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Configure your platform settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* General Settings */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-bold mb-4">General Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Platform Name
                </label>
                <input
                  type="text"
                  defaultValue="QuickScan"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Admin Email
                </label>
                <input
                  type="email"
                  defaultValue="admin@quickscan.com"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Support Phone
                </label>
                <input
                  type="text"
                  defaultValue="+91 1800 123 4567"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Booking Settings */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-bold mb-4">Booking Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto-confirm bookings</p>
                  <p className="text-sm text-gray-500">Automatically confirm new bookings</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email notifications</p>
                  <p className="text-sm text-gray-500">Send email confirmations to patients</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Booking Lead Time (hours)
                </label>
                <input
                  type="number"
                  defaultValue="24"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Logo Upload */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-bold mb-4">Platform Logo</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <FiUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-500 mb-2">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-400">SVG, PNG, JPG (max. 2MB)</p>
              <button className="mt-4 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm">
                Upload Logo
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="space-y-4">
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center space-x-2">
                <FiSave />
                <span>Save Changes</span>
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50">
                Reset to Default
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}