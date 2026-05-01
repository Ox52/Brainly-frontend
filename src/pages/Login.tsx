import axios from "axios";
import { useRef } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BrainIcon } from "../icons/BrainIcon";
import { Feature } from "../components/ui/Feature";
import { LockIcon, SaveIcon, SearchIcon } from "../icons/LoginIcon";
import { Input } from "../components/ui/input"

import { Button } from "../components/ui/button"

export const Login = () =>{


    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();



    const loginHandler = async ()=>{

        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;


        try{
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/login`,{

              username,
              password  
            });

            const jwt  = response.data.token;
            localStorage.setItem("token",jwt);
            toast.success("Welcome back!");
            navigate("/dashboard");
        }catch(error:any){

            console.error("Login error" ,error.response?.data);
            toast.error("Invalid credentials");


        }
    };

    return(

        <div className=" min-h-screen w-full flex">

            <div className="hidden lg:flex w-1/2 bg-linear-to-br from-purple-700 via-purple-600 to-violet-700 flex-col justify-between p-12 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-15 -left-15 w-64 h-64 bg-violet-900/40 rounded-full blur-3xl" />


            <div className="flex items-center gap-2 relative z-10">
                <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center text-white">
                
                <BrainIcon />
                </div>
                <span className="text-white text-xl font-bold tracking-tight">Brainly</span>
            </div>

            <div className="relative z-10 space-y-6">
                <div className="space-y-3">
                    <h1 className="text-4xl font-extrabold text-white leading-tight">

                    Welcome<br />back.
                    </h1>

                    <p className="text-purple-200 text-base leading-relaxed max-w-sm">

                    Your bookmarks are waiting. Pick up right where you left off.
                    </p>
                </div>


                <div className="space-y-4 pt-2">
            <Feature
              icon={<SaveIcon />}
              label="Everything saved"
              desc="Your YouTube videos and tweets, all in one place"
            />
            <Feature
              icon={<SearchIcon />}
              label="Instantly accessible"
              desc="Find anything you've saved in seconds"
            />
            <Feature
              icon={<LockIcon />}
              label="Private & secure"
              desc="Your second brain belongs only to you"
            />
          </div>
            </div>

            <p className="text-purple-300 text-xs  relative z-10">

            "An idea saved is an idea remembered."
            </p>


            </div>


            <div className="flex-1 flex items-center justify-center bg-gray-50 PX-6 PY-12">
                <div className="w-full max-w-sm  space-y-8 ">

                    <div className="flex  lg:hidden items-center gap-2  justify-center">
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white">
              <BrainIcon />
            </div>
            <span className="text-gray-800 font-bold text-lg">Brainly</span>

                        
                    </div>


                    <div className="space-y-1">

                        <h2 className=" text-2xl font-bold text-gray-900">Login</h2>
                        <p className="text-sm text-gray-500 ">Enter your credentials to access your brain</p>
                    </div>

                    <div className="space-y-4">

                    <Input inputRef={usernameRef} placeholder="e.g. harsh" label="Username" />
                    <Input inputRef={passwordRef} placeholder="Your password" label="Password" type="password" />
                    </div>

                    <div className="space-y-3 pt-1" >


                    <Button
              variant="primary"
              text="Sign in"
              size="md"
              fullWidth={true}
              onClick={loginHandler}
            />

            <p className="text-center text-sm  text-gray-500">

            Don't have an account?


            <span
                className="text-purple-600 font-medium cursor-pointer hover:underline"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </span>
            </p>
                    </div>
                </div>
            </div>
        </div>
    )
}