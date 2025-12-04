import { useState } from "react";
import { AppStore } from "../utils/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../utils/reduxstore";
import { loginSuccess } from "../utils/authSlice";

interface Props {
  onClose: () => void;
}

export default function LoginForm({ onClose }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    AppStore.login(username, password)
      .then((result) => {
        console.log("Loged in");
        dispatch(loginSuccess(result))
        onClose();
      })
      .catch((error) => {
        console.error(error);
        setError("Login failed");
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          className="w-full border rounded p-2 mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded p-2 mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-between">
          <button
            className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
            onClick={handleLogin}
          >
            Login
          </button>
          <button className="text-gray-500 hover:underline" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
