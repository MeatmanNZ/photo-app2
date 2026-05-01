const { useState } = React;

function App() {
  const [file, setFile] = useState(null);
  const [service, setService] = useState("");
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const prices = {
    basic: 15,
    color: 25,
    full: 45,
  };

  const total = prices[service] || 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !service || !name || !email) {
      alert("Please complete all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", file);
    formData.append("service", service);
    formData.append("notes", notes);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("_subject", "New Photo Restoration Order");

    try {
      await fetch("https://formsubmit.co/pymnzmail@gmail.com", {
        method: "POST",
        body: formData,
      });

      alert("Order sent successfully! Check your email to confirm submission.");

      setFile(null);
      setService("");
      setNotes("");
      setName("");
      setEmail("");
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-2 text-center">
          Photo Restoration
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Simple, professional restoration service
        </p>

        <div className="mb-6">
          <label className="block mb-2 font-semibold text-lg">
            1. Upload Your Photo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full text-lg"
          />
          {file && (
            <p className="text-sm mt-2 text-green-600">
              Selected: {file.name}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block mb-3 font-semibold text-lg">
            2. Choose Service
          </label>
          <div className="space-y-3">
            {[
              {
                key: "basic",
                label: "Basic Clean",
                desc: "Dust & scratch removal",
                price: "$15",
              },
              {
                key: "color",
                label: "Colour Restoration",
                desc: "Fix fading & colour",
                price: "$25",
              },
              {
                key: "full",
                label: "Full Restoration (Recommended)",
                desc: "Complete repair & enhancement",
                price: "$45",
              },
            ].map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => setService(option.key)}
                className={`w-full p-4 rounded-2xl border text-left transition ${
                  service === option.key
                    ? "bg-blue-600 text-white"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div className="font-bold text-lg">{option.label}</div>
                <div className="text-sm opacity-80">{option.desc}</div>
                <div className="mt-1 font-semibold">{option.price}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-semibold text-lg">
            3. Extra Requests (optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border rounded-xl p-3 text-lg"
            placeholder="Anything specific you'd like done..."
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-semibold text-lg">
            4. Your Details
          </label>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-xl p-3 mb-3 text-lg"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-xl p-3 text-lg"
          />
        </div>

        <div className="mb-6 text-xl font-bold text-center">
          Total: ${total}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 hover:bg-green-700 text-white p-4 rounded-2xl text-xl font-semibold"
        >
          Place Order
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          You will receive a confirmation email after submitting
        </p>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

<script src="app.js"></script>