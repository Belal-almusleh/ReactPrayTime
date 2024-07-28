import { Container } from '@mui/material';
import './App.css';
import MainContent from './components/MainContent';

export default function App() {
  return (
    <div className="App" >
        <Container maxWidth={"xl"} >
        <MainContent/>
        </Container>
    </div>
  );
};
