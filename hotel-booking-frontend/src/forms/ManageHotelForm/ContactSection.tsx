
const ContactSection = () => {

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Contact Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <label className="text-gray-700 text-sm font-bold flex-1">
          Phone
          <input
            type="text"
            className="border rounded w-full py-2 px-3 font-normal"
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            type="email"
            className="border rounded w-full py-2 px-3 font-normal"
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Website
          <input
            type="url"
            className="border rounded w-full py-2 px-3 font-normal"
          />
        </label>
      </div>
    </div>
  );
};

export default ContactSection;
