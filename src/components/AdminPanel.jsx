import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function AdminPanel() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const ADMIN_PASSWORD = "admin123"; // Change this to something secure in production

  const fetchProviders = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("laundryShops").select("*");

    if (error) {
      console.error("Fetch error:", error.message);
      setErrorMsg("Failed to fetch providers.");
    } else {
      const formatted = data.map((provider) => ({
        ...provider,
        services: Array.isArray(provider.services)
          ? provider.services
          : safeParse(provider.services),
      }));
      setProviders(formatted);
    }

    setLoading(false);
  };

  const safeParse = (json) => {
    try {
      return JSON.parse(json);
    } catch {
      return [];
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("laundryShops").delete().eq("id", id);

    if (error) {
      console.error("Delete error:", error.message);
      alert("Failed to delete provider.");
    } else {
      setProviders((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      fetchProviders();
    } else {
      alert("Incorrect password.");
    }
  };

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <h2 className="text-2xl font-bold mb-4">🔒 Admin Access</h2>
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-4 py-2 rounded-md mb-4 w-full max-w-xs"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    );
  }

  if (loading) return <p className="text-center mt-10">Loading providers...</p>;
  if (errorMsg) return <p className="text-red-500 text-center mt-10">{errorMsg}</p>;

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">📋 Admin Panel</h2>
      {providers.length === 0 ? (
        <p className="text-center">No providers registered.</p>
      ) : (
        <ul className="space-y-6">
          {providers.map((provider) => (
            <li
              key={provider.id}
              className="bg-white p-6 rounded-xl shadow-md transition hover:shadow-lg"
            >
              <h3 className="text-xl font-bold mb-1">{provider.name}</h3>
              <p><strong>Phone:</strong> {provider.phone}</p>
              <p><strong>Email:</strong> {provider.email || "N/A"}</p>
              <p><strong>Address:</strong> {provider.address}</p>
              <div className="mt-2">
                <strong>Services:</strong>
                {provider.services?.length > 0 ? (
                  <ul className="list-disc ml-6">
                    {provider.services.map((service, idx) => (
                      <li key={idx}>
                        {service.name} - ₹{service.price}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="ml-4 text-sm text-gray-600">No services listed</p>
                )}
              </div>
              <button
                onClick={() => handleDelete(provider.id)}
                className="mt-4 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
