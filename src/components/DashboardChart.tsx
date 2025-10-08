"use client"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";



const COLORS = ["#3498db", "#2ecc71", "#f39c12"];


const dataChangeRequest = [
  { name: "Open", value: 120 },
  { name: "Work in Progress", value: 200 },
  { name: "Closed", value: 150 },
];



function HorizontalChart(props:{ticketData:TicketData[]}){

  return     <div className="space-y-8">
        {props.ticketData.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm font-medium w-16">{item.name}</span>
            <div className="flex-1  mx-2">
              <div className="w-full  bg-muted  h-3">
                <div
                  className="h-3 rounded-tr-full rounded-br-full transition-all duration-300"
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
}

function LineCharts({data}:{data:ChangeRequestData[]}){

  return  <div className="lg:col-span-2 outline-0">
        <div className="h-96">
         
          <ResponsiveContainer width="100%" height="100%"
             
>
            <LineChart data={data}  
            >
              {/* Removes vertical grid lines, keeps horizontal */}
              <CartesianGrid vertical={false} strokeDasharray="3 3" />

              {/* Removes axis lines & tick lines */}
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />

              {/* Removes hover vertical line */}
              <Tooltip cursor={false} />

              <Legend />
              <Line
                type="monotone"
                strokeWidth={3}
                dataKey="Emergency"
                stroke="#E95D5D"
              />
              <Line
                type="monotone"
                strokeWidth={3}
                dataKey="Normal"
                stroke="#4ACF7B"
              />
              <Line
                type="monotone"
                strokeWidth={3}
                dataKey="Standard"
                stroke="#4077EB"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
}

function BarCharts({data}:{data:TicketResolutionData[]}){
  return    <div className="lg:col-span-2">
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              // barCategoryGap="0%" // removes category gap
              barGap={0}
              data={data}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="open" fill="#1659E6" />
              <Bar dataKey="closed" fill="#30B7EE" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
}

function BigBarChart(){
  return   <div className="">
        <div>
          <div className="h-80">
           
            <ResponsiveContainer width="100%" height="90%">
              <BarChart
                data={dataChangeRequest}
                barSize={100}
                margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
              >
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#4B5563", fontSize: 12 }}
                />
                <YAxis hide />
                <Tooltip cursor={{ fill: "transparent" }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {dataChangeRequest.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
}




 function DonutChartCard() {
  const data = [
  { name: "Title", value: 400, color: "#FACC15" }, // yellow
  { name: "Title", value: 300, color: "#22C55E" }, // green
  { name: "Title", value: 300, color: "#A855F7" }, // purple
  { name: "Title", value: 200, color: "#EF4444" }, // red
];

  return (
    <div className="w-full">
    

      {/* Chart */}
      <div className="relative flex w-full justify-center items-center">
        <ResponsiveContainer width={250} height={200}>
          <PieChart>
            <Pie
              data={data}
              innerRadius={80}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              stroke="none" // removes outline
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="absolute text-center">
          <div className="text-2xl font-bold">$239,991</div>
          <div className="text-gray-500 text-sm">Total Spent</div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 text-sm text-gray-700"
          >
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            ></span>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}


export {HorizontalChart, LineCharts, BarCharts, BigBarChart, DonutChartCard}

