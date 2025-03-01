import logo from './logo.svg';
import './App.css';
// import TextField from 'ui-components/src/components/TextField/TextField';
// import Graph from 'ui-components/src/components/Graph/Graph';
// import Graph from '../../ui-components/src';
// import Graph from 'ui-components'
import {Button, Card, Field, Fields, Graph, Grid, Input, Label, TitleBar} from 'ui-components';
function App() {
  return (
    <div className="App">
      Web-ui Package
      {/* <div className='' style ={{display: "flex"}}>
      <Graph/>
      <Graph/>
      <Graph/>
      </div> */}
      <div className=''>
      <TitleBar
        title={'Client, Location & Template Mapping'}
        onBackClicked={() => console.log("onBackClicked called")}
        right={[
            <Button key="cta">{'New'}</Button>
        ]}
      />
      <Grid >
     <Card style={{ width: '30%' }}> 
    <Field>
      <Label style={{display: 'flex'}}> Name: </Label>
      <Input label="Name" placeholder="Enter your name" onChange={(e) => console.log("e", e.target.value)} />
    </Field>
    <Field>
    <Label style={{display: 'flex'}}> Phone: </Label>
      <Input label="Phone" placeholder="Enter your phone number" />
    </Field>
    <Field>
    <Button key="cta">{'Save'}</Button>
    </Field>
     </Card>

     <Card style={{ width: '30%' }}> 
    <Field>
      <Label style={{display: 'flex'}}> Name: </Label>
      <Input label="Location Name" placeholder="Enter Location name" />
    </Field>
    <Field>
    <Button key="cta">{'Save'}</Button>
    </Field>
     </Card>


     <Card style={{ width: '30%' }}> 
    <Field>
      <Label style={{display: 'flex'}}> Name: </Label>
      <Input label="Template Name" placeholder="Enter Template name" />
    </Field>
    <Field>
    <Button key="cta">{'Save'}</Button>
    </Field>
     </Card>


     <Card style={{ width: '30%' }}> 
    <Field>
      <Label style={{display: 'flex'}}> Name: </Label>
      <Input label="Tag Name" placeholder="Enter Tag name" />
    </Field>
    <Field>
    <Button key="cta">{'Save'}</Button>
    </Field>
     </Card>
   </Grid>
   
      </div>
    </div>
  );
}

export default App;
