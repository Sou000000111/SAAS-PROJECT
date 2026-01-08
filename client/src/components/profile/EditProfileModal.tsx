import { useState } from "react";
import { useUser } from "../../context/UserContext";

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

export default function EditProfileModal({ open, setOpen }: Props) {
  const { user, updateUser } = useUser();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [preview, setPreview] = useState(user.avatar);

  if (!open) return null;

  // 🔥 BASE64 CONVERTER
  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const base64 = await fileToBase64(file);
    setPreview(base64);
  };

  const handleSave = () => {
    updateUser({
      name,
      email,
      avatar: preview, // ✅ base64 saved
    });

    setOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-900 rounded-xl w-full max-w-md p-6 space-y-4">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
          Edit Profile
        </h3>

        {/* Avatar Preview */}
        <div className="flex justify-center">
          <img
            src={preview}
            className="w-24 h-24 rounded-full object-cover border"
          />
        </div>

        <input
          className="w-full border px-3 py-2 rounded dark:bg-slate-800 dark:border-slate-700"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full border px-3 py-2 rounded dark:bg-slate-800 dark:border-slate-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={() => setOpen(false)}
            className="text-slate-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
