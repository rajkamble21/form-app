import React, { useState } from 'react';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' }); // Clear validation errors on change
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = 'Invalid phone number format (10 digits)';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formData); // You can handle form submission logic here
      setFormSubmitted(true); // Set formSubmitted to true after successful submission
    }
  };

  return (
    <div>
      {formSubmitted ? (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="max-w-md w-full bg-white p-6 rounded-md shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-6">Thank you!</h2>
            <p className="text-green-600 text-center mb-4">Form submitted successfully!</p>
            <p className="text-center">Your message has been received. We'll get back to you soon.</p>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <form onSubmit={handleSubmit} className="max-w-md w-full bg-white p-6 rounded-md shadow-lg" noValidate>
            <h2 className="text-2xl font-semibold text-center mb-6">Contact Us</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
              {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
              {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
              {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500 transition-colors duration-300 ease-in-out">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Form;
