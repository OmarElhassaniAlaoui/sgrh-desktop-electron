
// import { DollarSign } from "lucide-react"
// import { Dot, CircleDot  } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"  

// interface CircleDotProps {
//   className?: string
//   color?: string
// }

type InfoCardProps = {  
  cardTitle?: string , 
  cardContent?: string , 
  state?: string ,
}

export default function InfoCard({ cardTitle, cardContent}: InfoCardProps) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{cardTitle}</CardTitle>
        {/* <CircleDot  
          className="size-5" 
          color={state === 'positive' ? 'green' : 'red'}
        /> */}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{cardContent}</p>
      </CardContent>


    </Card>
  )
}