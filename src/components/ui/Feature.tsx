interface FeatureProps {

    icon: React.ReactNode;
    label:string;
    desc:string



}



export const Feature =({ icon , label ,desc }:FeatureProps)=>(


    <div className=" flex items-start gap-3">

    <div className="mt-0.5 w-8  h-8 rounded-lg bg-white/10  flex items-center justify-center shrink-0">
    {icon}
    
    </div>

    <div>


     <p className="text-sm font-semibold text-shite">{label}</p>
     <p className=" text-xs text-purple-200 mt-0.5">{desc}</p>
    </div>


    </div>
)