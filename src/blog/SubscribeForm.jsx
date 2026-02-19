import { useState } from "react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email.trim()) {
      setStatus("Please add your email.");
      return;
    }
    setStatus("Thanks for subscribing.");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@company.com"
        className="w-full rounded-md border border-slate-300 px-3 py-2"
      />
      <button
        type="submit"
        className="rounded-md bg-[#4a90e2] px-4 py-2 font-semibold text-white"
      >
        Subscribe
      </button>
      {status ? <p className="text-sm text-slate-600">{status}</p> : null}
    </form>
  );
}
