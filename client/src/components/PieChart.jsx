import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import React, {useState, useEffect} from "react";
import axios from "axios";

const PieChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //Api call
  const [petcarepets, setPetcarePets] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:5050/petcare/count')
    .then(response => setPetcarePets(response.data))
    .catch(err => console.error(err));
    }, [])
    const petcares = petcarepets.map((pet) => pet.sum)

    const [adoptpets, setAdoptPets] = useState([])
    useEffect(()=>{
      axios.get('http://localhost:5050/adopt/count')
      .then(response => setAdoptPets(response.data))
      .catch(err => console.error(err));
      }, [])
      const adopts = adoptpets.map((pet) => pet.sum)

        const [rescuepets, setRescuePets] = useState([])
        useEffect(()=>{
          axios.get('http://localhost:5050/rescue/count')
          .then(response => setRescuePets(response.data))
          .catch(err => console.error(err));
          }, [])
          const rescues = rescuepets.map((pet) => pet.sum)

          const pieData = []
          const allrescues = {
            id: "rescue",
            label: "rescue",
            value: rescues[0]
          }
          const allpetcares = {
            id: "petcare",
            label: "petcare",
            value: petcares[0]
          }
          const alladopts = {
            id: "adopt",
            label: "adopt",
            value: adopts[0]
          }
          pieData.push(alladopts, allpetcares, allrescues)
  return (
    <ResponsivePie
      data={pieData}
      theme={{
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
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;
