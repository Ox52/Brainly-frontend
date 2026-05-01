export type Tag = 

|"Productivity"
|"Tech & Tools"
|"Mindset"
|"Learning & Skills"
|"Workflows"
|"Inspiration"

export const  TAGS: Tag[] =[


    "Productivity",
    "Tech & Tools",
    "Mindset",
    "Learning & Skills",
    "Workflows",
    "Inspiration",


];

export const TAG_STYLES: Record<Tag, {bg:string , text:string, dot:string; activeBg:string}>={

    "Productivity":      { bg: "bg-green-50",  text: "text-green-700",  dot: "bg-green-400",  activeBg: "bg-green-500" },
    "Tech & Tools":      { bg: "bg-blue-50",   text: "text-blue-700",   dot: "bg-blue-400",   activeBg: "bg-blue-500" },
    "Mindset":           { bg: "bg-pink-50",   text: "text-pink-700",   dot: "bg-pink-400",   activeBg: "bg-pink-500" },
    "Learning & Skills": { bg: "bg-orange-50", text: "text-orange-700", dot: "bg-orange-400", activeBg: "bg-orange-500" },
    "Workflows":         { bg: "bg-purple-50", text: "text-purple-700", dot: "bg-purple-400", activeBg: "bg-purple-500" },
    "Inspiration":       { bg: "bg-teal-50",   text: "text-teal-700",   dot: "bg-teal-400",   activeBg: "bg-teal-500" },
}