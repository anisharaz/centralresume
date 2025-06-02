import { contactUs } from "@/app/actions/general";
import { Mail, MessageSquare, Send, User } from "lucide-react";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setResponseMessage("Please fill in all fields.");
      setIsSuccess(false);
      return;
    }

    setIsLoading(true);
    setResponseMessage("");

    try {
      const result = await contactUs(name.trim(), email.trim(), message.trim());
      setResponseMessage(result.message);
      setIsSuccess(result.success);

      if (result.success) {
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (error) {
      setResponseMessage("Something went wrong. Please try again later.");
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-white flex items-center gap-2">
          <User className="w-4 h-4" />
          Name
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-white flex items-center gap-2">
          <Mail className="w-4 h-4" />
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-white flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          Message
        </Label>
        <textarea
          id="message"
          placeholder="Tell us how we can help you..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          disabled={isLoading}
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Send Message
          </>
        )}
      </Button>

      {responseMessage && (
        <div
          className={cn(
            "p-3 rounded-md text-sm",
            isSuccess
              ? "bg-green-500/20 text-green-100 border border-green-500/30"
              : "bg-red-500/20 text-red-100 border border-red-500/30"
          )}
        >
          {responseMessage}
        </div>
      )}
    </form>
  );
}
