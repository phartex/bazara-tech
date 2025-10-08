type NavLinkProps= {
  title: string;
  url: string;
}
type Statistics={
    title:string
    value:number
    percentage_change:number
}

interface TicketData {
  name: string;
  count: number;
  color?: string;
  percentage?: number;
}
interface PendingData{
 name:string
 value:number
}
type AverageResponseTime={
    title:string
    value:string
    percentage_change:number
}
type TableData={
  header:string[], body:string[][]
}
type TicketResolutionData={
name:string
open:number
closed:number
}
type ChangeRequestData={
  name:string
  Emergency:number
  Normal:number
  Standard:number
}