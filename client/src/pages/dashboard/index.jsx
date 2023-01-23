import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import PetsIcon from '@mui/icons-material/Pets';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import SupportIcon from '@mui/icons-material/Support';
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart";
import StatBox from "../../components/StatBox";
import React, {useState, useEffect} from "react";
import axios from "axios";

const Dashboard = () => {
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
    console.log(petcares)

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

           //Api call
  const [pets, setPets] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:5050/petcare/recent')
    .then(response => setPets(response.data))
    .catch(err => console.error(err));
    }, [])

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>


      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title= {petcares[0]}
            subtitle="Pets under care"
            // progress="0.75"
            // increase="+14%"
            icon={
              <PetsIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={adopts[0]}
            subtitle="Adopted Pets"
            // progress="0.50"
            // increase="+21%"
            icon={
              <VolunteerActivismIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={rescues[0]}
            subtitle="Rescued pets"
            // progress="0.30"
            // increase="+5%"
            icon={
              <SupportIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Types of Pets
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Total Number of Pets
          </Typography>
          <Box height="250px" mt="-20px">
            <PieChart isDashboard={true} />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Pets in petcare 
            </Typography>
          </Box>
          {pets.map((pet, i) => (
            <Box
              key={`${pet._id}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {pet.petName}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {pet.petType}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>Special Need? {pet.need}</Box>
              {/* <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${pet.petName}
              </Box> */}
            </Box>
          ))}
        </Box>      
      </Box>
    </Box>
  );
};

export default Dashboard;
