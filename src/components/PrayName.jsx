
import '../components/comp.css'
import { Card,  CardContent,CardMedia,Typography } from '@mui/material'

function PrayName({name,img,time}) {
  return (
    <div>
        <Card sx={{mxWidth:290,minWidth:250}}>
            <CardMedia sx={{minHeight:280}} image={img} className='pray-image'/>
            <CardContent className='content'>
            <Typography gutterBottom variant="h5" component="div">
             {name}
             </Typography>
             <Typography gutterBottom variant="h5" component="div">
             {time}
             </Typography>
            </CardContent>  
        </Card>
    </div>
  )
}

export default PrayName
