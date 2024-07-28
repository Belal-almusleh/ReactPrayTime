import { Grid, Stack,Divider,Select,Box,FormControl,MenuItem,InputLabel } from '@mui/material'
import React, { useState,useEffect } from 'react'
import axios from 'axios';
import PrayName from './PrayName';
import fajr from '../Images/fjr.png'
import duhr from '../Images/dhr.png'
import asr from '../Images/asr.png'
import mghrb from '../Images/mghrb.png'
import isha from '../Images/isha.png'
import moment from 'moment'
const current = moment()
let pray


export default  function MainContent() {
const [ city,setCity] = useState("");
const [today, setToday] =useState("")
const [prayTime, setPrayTime] = useState({})
const [nextPray, setNextPray]= useState("")
const [nextPrayTime, setNextPrayTime] = useState("00:00:00")
const [ remaining, setRemaining] = useState(0)
useEffect(()=>{
  if(city){
    axios.get(`https://api.aladhan.com/v1/timingsByCity?country=JO&city=${city}`).then(
      resp=> {
         pray = new Object(resp.data.data.timings)
        setPrayTime({...prayTime,
                    Fajr:pray.Fajr,
                    Dhuhr:pray.Dhuhr,
                    Asr:pray.Asr,
                    Maghrib:pray.Maghrib,
                    Isha:pray.Isha });
      }
    )
  }
},[city])

useEffect(()=>{
  const currentTime = setInterval(()=>{
    const time = moment();
    setToday(time.format('Y-MM-D || HH:mm:ss'))
  },1000);
  return ()=>clearInterval(currentTime)
})

useEffect(()=>{
  let now = moment()
  let nextTime =moment()
  let timeDifference
  const pray1 = moment(prayTime.Fajr,'HH:mm')
  const pray2 = moment(prayTime.Dhuhr,"HH:mm")
  const pray3 = moment(prayTime.Asr,"HH:mm")
  const pray4 = moment(prayTime.Maghrib,"HH:mm")
  const pray5 = moment(prayTime.Isha,"HH:mm")




  switch (true){
    case now.isBefore(pray1):
      console.log('al-fajer pray')
      setNextPray('Al-Fajr Pray')
      nextTime = pray1
      console.log(nextTime)
      break;
    case(now.isBefore(pray2) && now.isAfter(pray1)):
      console.log('al-dhur pray')
      setNextPray('Al-Dhur Pray')
      nextTime = pray2
      console.log(nextTime)
      break;
    case(now.isBefore(pray3) && now.isAfter(pray2)):
      console.log('al-asr pray')
      setNextPray('Al-Asr Pray')
      nextTime = pray3
      console.log(nextTime)
      break;
    case(now.isBefore(pray4) && now.isAfter(pray3)):
      console.log('al-maghrib pray')
      setNextPray('Al-Maghrib Pray')
      nextTime = pray4
      console.log(nextTime)
      break;
    case(now.isBefore(pray4) && now.isAfter(pray4)):
      console.log('al-isha pray')
      setNextPray('Al-Isha Pray')
      nextTime = pray5
      console.log(nextTime)
      break;
    case now.isAfter(pray5):
      console.log('al-fajr pray')
      setNextPray('Al-Fajr pray')
      nextTime = pray1
      console.log(nextTime)
      break;
    default:
      console.log()    
  }
  if(nextPray ==='Al-Fajr Pray')
    timeDifference = nextTime.diff(now, 'seconds') + (24 * 60 * 60);
  else
    timeDifference = nextTime.diff(now, 'seconds')


  const myTimer = setInterval(()=>{
    const duration = moment.duration(timeDifference, 'seconds');
    setRemaining(duration.asSeconds())
    console.log(remaining, duration.asSeconds())
    const durationFormat = moment.utc(duration.asMilliseconds()).format('HH:mm:ss')
    setNextPrayTime(durationFormat)
  },1000)

  return ()=> clearInterval(myTimer)
},[prayTime,remaining])


  return (
    <div >
    <Grid container>
            <Grid xs={6}>
                <div>
                    <h2>{today || current.format('Y-MM-D || HH:mm:ss') } </h2>
                    <h1>{city || "select your city"}</h1>
                </div>
            </Grid>
            <Grid xs={6}>
                <div>
                    <h4>Next Pray is : {nextPray}</h4>
                    <h1>{nextPrayTime }</h1>
                </div>
            </Grid>
    </Grid>
    <Divider variant='middle' style={{borderColor:"black", margin:"0 5rem",opacity:"0.25"}} />
    <Grid container>
    <Stack direction={"row"} justifyContent={"space-between"} spacing={1} style={{margin:"2.5rem 5rem",}}>
        <PrayName img={fajr} name={"Al-Fajer Pray"}  time={prayTime.Fajr }/>
        <PrayName img={duhr} name={"Al-Duher Pray"} time={prayTime.Dhuhr }/>    
        <PrayName img={asr} name={"Al-Asr Pray"} time={prayTime.Asr }/>
        <PrayName img={mghrb} name={"Al-Maghreb Pray"} time={prayTime.Maghrib }/>
        <PrayName img={isha} name={"Al-Isha Pray"} time={prayTime.Isha }/>
    </Stack>
    <Stack direction={"row"} justifyContent={'center'} sx={{margin:"0 auto"}} style={{minHeight:"50vh"}}>
    <Box sx={{ minWidth: 150 }}>
      <FormControl sx={{width:"150px",margin:"0 auto"}}>
        <InputLabel id="demo-simple-select-label">Select City</InputLabel>
        <Select
            
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={city}
            label="Select City"
            onChange={(e)=>setCity(e.target.value)}
        >
            <MenuItem value={'Amman'}>Amman</MenuItem>
            <MenuItem value={'Zarqa'}>Zarqa</MenuItem>
            <MenuItem value={'Irbid'}>Irbid</MenuItem>
            <MenuItem value={'Aqaba'}>Aqaba</MenuItem>
        </Select>
      </FormControl>
    </Box>
    </Stack>
    </Grid>
    </div>
  )
}


