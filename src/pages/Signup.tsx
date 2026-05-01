import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BrainIcon } from "../icons/BrainIcon";
import { Feature } from "../components/ui/Feature";
import { YouTubeIcon } from "../icons/YoutubeIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export const Signup = () => {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const signupHandler = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/signup`, {
        username,
        password,
      });
      toast.success("Account created successfully");
      navigate("/login");
    } catch (error: any) {
      console.error("Signup error:", error.response?.data ?? error.message);
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        (error?.code === "ERR_NETWORK"
          ? "Network error. Check VITE_API_URL and backend CORS."
          : "Signup failed. Please try again.");
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 bg-linear-to-br from-purple-700 to-violet-700 flex-col justify-between p-12 relative overflow-hidden">
        
     
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-15 -left-15 w-64 h-64 bg-violet-900/40 rounded-full blur-3xl" />

        {/* LOGO */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center text-white">
            <BrainIcon />
          </div>
          <span className="text-white text-xl font-bold tracking-tight">
            Brainly
          </span>
        </div>

        {/* TEXT + FEATURES */}
        <div className="relative z-10 space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl font-extrabold text-white leading-tight">
              Your second
              <br />
              brain, organised.
            </h1>

            <p className="text-purple-200 text-base leading-relaxed max-w-sm">
              Save YouTube videos and tweets you love. Come back to them anytime
              — without the endless scrolling.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <Feature
              icon={<YouTubeIcon />}
              label="YouTube bookmarks"
              desc="Save videos with thumbnails for quick reference"
            />

            <Feature
              icon={<TwitterIcon />}
              label="Tweet collections"
              desc="Keep threads and insights you want to revisit"
            />

            <Feature
              icon={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              }
              label="Always accessible"
              desc="Your personal knowledge base, available anytime"
            />
          </div>
        </div>

        {/* FOOTER */}
        <p className="text-purple-300 text-xs relative z-10">
          "The palest ink is better than the best memory."
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-6 py-12">
        <div className="w-full max-w-sm space-y-8">

          {/* MOBILE LOGO */}
          <div className="flex lg:hidden items-center gap-2 justify-center">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white">
              <BrainIcon />
            </div>
            <span className="text-gray-800 font-bold text-lg">Brainly</span>
          </div>

          {/* HEADING */}
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-900">
              Create your account
            </h2>
            <p className="text-sm text-gray-500">
              Start building your second brain today
            </p>
          </div>

          {/* INPUTS */}
          <div className="space-y-4">
            <Input
              inputRef={usernameRef}
              placeholder="e.g harsh"
              label="Username"
            />
            <Input
              inputRef={passwordRef}
              placeholder="Min. 8 characters"
              label="Password"
              type="password"
            />
          </div>

          {/* BUTTON */}
          <div className="space-y-3 pt-1">
            <Button
              variant="primary"
              text="Create account"
              size="md"
              fullWidth={true}
              onClick={signupHandler}
            />

            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <span
                className="text-purple-600 font-medium cursor-pointer hover:underline"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </div>

          {/* TERMS */}
          <p className="text-center text-xs text-gray-400">
            By signing up you agree to our{" "}
            <span className="underline cursor-pointer">Terms</span> and{" "}
            <span className="underline cursor-pointer">
              Privacy Policy
            </span>.
          </p>
        </div>
      </div>
    </div>
  );
};