
const statisticsData:Statistics[]=[
    {
title:"Total Number of Users Tickets",
value:109826,
percentage_change:11.2,
},
    {
title:"Total Open Tickets",
value:2910,
percentage_change:11.2,
},
    {
title:"Total Closed Tickets",
value:109291,
percentage_change:-11.2,
},
    {
title:"Total Due Tickets",
value:34,
percentage_change:-11.2,
},

]

const ticketManagementData:TicketData[]=[
  {
    name: "April 10",
    count: 25,
    color: "red",
    percentage: 85,
  },
  {
    name: "April 11",
    count: 18,
    color: "blue",
    percentage: 60,
  },
  {
    name: "April 12",
    count: 12,
    color: "green",
    percentage: 40,
  },
  {
    name: "April 13",
    count: 22,
    color: "orange",
    percentage: 75,
  },
  {
    name: "April 14",
    count: 28,
    color: "yellow",
    percentage: 95,
  },
  {
    name: "April 15",
    count: 20,
    color: "purple",
    // color: "hsl(var(--chart-purple))",
    percentage: 68,
  },
  {
    name: "April 16",
    count: 30,
    color: "gray",
    percentage: 100,
  },
];
const pendingData:PendingData[]=[
    {
    name:"Pending Tickets",
    value:13
},
    {
    name:"Pending Approvals",
    value:2
},
]


const averageResponseTime:AverageResponseTime[]=[
    {
    title:"Average Incident Response Time - Me",
    value:"0:04:01",
    percentage_change:11.2

},
    {
    title:"Average Change Response Time - Me",
    value:"0:04:01",
    percentage_change:-11.2

},
]

const approvalTable:TableData={
    header:["Title","Module", "ID", "Created By", "Created On", "Due Date", "Status" ],
    body:[
        ["Request for Application Upgrade to La...", "Change Management", "CHG-76251", "Cynthia Njoku", "24/04/2025", "24/04/2025", "Pending"],
        ["Request for Application Upgrade to La...", "Change Management", "CHG-76251", "Cynthia Njoku", "24/04/2025", "24/04/2025", "Pending"],
        ["Request for Application Upgrade to La...", "Change Management", "CHG-76251", "Cynthia Njoku", "24/04/2025", "24/04/2025", "Pending"],
        ["Request for Application Upgrade to La...", "Change Management", "CHG-76251", "Cynthia Njoku", "24/04/2025", "24/04/2025", "Pending"],
        
    ]
}
const teamIncidentTicket:TableData={
    header:["Title", "ID", "Category","Priority","Created By", "Created On", "Assigned to", "Status" ],
    body:[
        ["Request for Application Upgrade to La...", "CHG-76251", "Onboarding", "Severity 1", "Cynthia Njoku", "24/04/2025", "24/04/2025", "Pending"],
        ["Request for Application Upgrade to La...", "CHG-76251", "Onboarding", "Severity 1", "Cynthia Njoku", "24/04/2025", "24/04/2025", "Pending"],
        ["Request for Application Upgrade to La...", "CHG-76251", "Onboarding", "Severity 1", "Cynthia Njoku", "24/04/2025", "24/04/2025", "Pending"],
        ["Request for Application Upgrade to La...", "CHG-76251", "Onboarding", "Severity 1", "Cynthia Njoku", "24/04/2025", "24/04/2025", "Pending"],
        
    ]
}

const ticketResolutionData:TicketResolutionData[]=[
  { name: "Jan", open: 30, closed: 20 },
  { name: "Feb", open: 45, closed: 35 },
  { name: "Mar", open: 60, closed: 50 },
  { name: "Apr", open: 50, closed: 60 },
];

const dataChangeRequest = [
  { name: "Open", value: 120 },
  { name: "Work in Progress", value: 200 },
  { name: "Closed", value: 150 },
];

const changeRequestData:ChangeRequestData[]=[
  { name: "Jan", Emergency: 34, Normal: 24, Standard :15},
  { name: "Feb", Emergency: 48, Normal: 124, Standard :35},
  { name: "Mar", Emergency: 80, Normal: 284, Standard :60},
  { name: "Apr", Emergency: 50, Normal: 84, Standard :80},
  { name: "May", Emergency: 60, Normal: 74, Standard :90},
  { name: "Jun", Emergency: 20, Normal: 124, Standard :40},
]

export {
  statisticsData, ticketManagementData, pendingData, averageResponseTime, approvalTable, teamIncidentTicket, ticketResolutionData, 
  dataChangeRequest,
changeRequestData
}