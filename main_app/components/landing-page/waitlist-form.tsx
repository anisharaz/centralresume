import { useState } from "react";
import { ArrowRight, Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { joinWaitlist } from "@/app/actions/general";
import { toast } from "sonner";

const WaitlistForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    const response = await joinWaitlist(email);
    if (response.success) {
      toast.success("You have been added to the waitlist 😇.");
      setEmail("");
    } else {
      toast.error("Something went wrong. Please try again 🥹.");
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
    >
      <div className="relative flex-1">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="h-12 px-4 bg-white/10 backdrop-blur-md text-white border border-white/20 placeholder:text-white/60 rounded-full w-full focus:ring-2 focus:ring-white/30 focus:outline-none"
          required
        />
      </div>
      <Button
        type="submit"
        className="h-12 px-8! text-white rounded-full flex items-center justify-center gap-2 transition-all duration-300 ease-in-out whitespace-nowrap"
      >
        {loading ? <Loader className="animate-spin" /> : "Subscribe"}
        <ArrowRight size={16} />
      </Button>
    </form>
  );
};

export default WaitlistForm;
