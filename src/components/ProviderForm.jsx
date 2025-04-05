import React, { useState } from "react";
import { supabase } from "../supabase";

export default function ProviderForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    services: {
      washOnly: { selected: false, price: "" },
      ironOnly: { selected: false, price: "" },
      washAndIron: { selected: false, price: "" },
      dryClean: { selected: false, price: "" },
    },
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Business name is required";
    } else if (/[0-9]/.test(formData.name)) {
      newErrors.name = "Business name cannot contain numbers";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (formData.phone.length !== 10) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!formData.address) newErrors.address = "Address is required";

    const selectedServices = Object.values(formData.services).filter(s => s.selected);
    if (selectedServices.length === 0) newErrors.services = "At least one service must be selected";
    selectedServices.forEach(service => {
      if (!service.price || isNaN(service.price)) {
        newErrors.services = "Each selected service must have a valid price";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "").slice(0, 10);
      setFormData({ ...formData, phone: numericValue });
    } else if (name === "name") {
      const alphaValue = value.replace(/[^a-zA-Z\s]/g, "");
      setFormData({ ...formData, name: alphaValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setErrors({ ...errors, [name]: "" });
  };

  const handleServiceChange = (serviceName, field, value) => {
    setFormData({
      ...formData,
      services: {
        ...formData.services,
        [serviceName]: {
          ...formData.services[serviceName],
          [field]: field === "selected" ? value : value,
        },
      },
    });
    setErrors({ ...errors, services: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const servicesToSubmit = Object.keys(formData.services)
      .filter(key => formData.services[key].selected)
      .map(key => ({ name: key, price: parseFloat(formData.services[key].price) }));

    const { data, error } = await supabase.from("laundryShops").insert([
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        services: servicesToSubmit
      }
    ]);

    if (error) {
      console.error("Error submitting form:", error);
      setSuccessMessage("");
    } else {
      setSuccessMessage("Provider registered successfully!");
      setTimeout(() => setSuccessMessage(""), 3000); // Hide after 3 second
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        services: {
          washOnly: { selected: false, price: "" },
          ironOnly: { selected: false, price: "" },
          washAndIron: { selected: false, price: "" },
          dryClean: { selected: false, price: "" },
        }
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 sm:p-8 bg-white rounded-2xl shadow-xl w-full">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Register Your Laundry Service</h2>
      {successMessage && (
        <p className="text-green-600 text-center font-semibold mb-4">{successMessage}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Business Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block font-medium">Email (optional)</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block font-medium">Address</label>
          <select
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select an area</option>
            <option value="HBR Layout">HBR Layout</option>
            <option value="Hebbal">Hebbal</option>
            <option value="Whitefield">Whitefield</option>
          </select>
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>

        <div>
          <label className="block font-medium mb-2">Services & Pricing</label>
          {["washOnly", "ironOnly", "washAndIron", "dryClean"].map((key) => {
            const labels = {
              washOnly: "Wash Only",
              ironOnly: "Iron Only",
              washAndIron: "Wash & Iron",
              dryClean: "Dry Clean"
            };
            return (
              <div key={key} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.services[key].selected}
                    onChange={(e) => handleServiceChange(key, "selected", e.target.checked)}
                  />
                  <label className="w-32">{labels[key]}</label>
                </div>
                <input
                  type="number"
                  placeholder="Price"
                  value={formData.services[key].price}
                  onChange={(e) => handleServiceChange(key, "price", e.target.value)}
                  className="w-full sm:flex-1 px-2 py-1 border rounded-md"
                />
              </div>
            );
          })}
          {errors.services && <p className="text-red-500 text-sm mt-1">{errors.services}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:scale-105 transition-transform"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
