import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import React, {useState, useEffect} from "react";
import axios from "axios";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //Api call
  const [adoptpets, setAdoptPets] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:5050/adopt/petType')
    .then(response => setAdoptPets(response.data))
    .catch(err => console.error(err));
    }, [])

    const [petcarepets, setPetcarePets] = useState([])
    useEffect(()=>{
      axios.get('http://localhost:5050/petcare/petType')
      .then(response => setPetcarePets(response.data))
      .catch(err => console.error(err));
      }, [])

      const [rescuepets, setRescuePets] = useState([])
      useEffect(()=>{
        axios.get('http://localhost:5050/rescue/petType')
        .then(response => setRescuePets(response.data))
        .catch(err => console.error(err));
        }, [])
        const barData = []
        barData.push({collection: "adopt", ...adoptpets}, 
        {collection: "petcare", ...petcarepets},{collection : "rescue", ...rescuepets})
  return (
    <ResponsiveBar
      data={barData}
      theme={{
        // added
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      keys={["cats", "dogs"]}
      indexBy="collection"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#eed312",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "#eed312",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Department", // changed
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "No. of Pets", // changed
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "#eed312",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      }}
    />
  );
};

export default BarChart;
