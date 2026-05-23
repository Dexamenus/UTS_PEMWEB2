import type { ReactNode } from "react";

interface CompetitionCardProps {
    children?: ReactNode;
    name: string;
    description: string;
    imageUrl: string;
}

export const CompetitionCard: React.FC<CompetitionCardProps> = ({
    children,
    name,
    description,
    imageUrl,
}) => {
    return(
        <div className=" cursor-pointer flex flex-col bg-white rounded-2xl shadow-lg h-full overflow-hidden">
            <div className="relative w-full flex justify-center items-center">
                <img 
                    src={imageUrl} 
                    alt={name}
                    className="w-full h-full object-cover" />
            </div>
            <div className="p-4 flex flex-col grow"> 
                <h3 className="text-xl font-bold mb-3 text-slate-600">{name}</h3>
                <p className="text-sm text-slate-600">{description}</p>
                
               
            </div>
           
            <div className="mb-4 ml-4 rounded-full" >
                {children}
            </div>
        </div>
        
    );
};  