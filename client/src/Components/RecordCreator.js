import React from 'react';
import {Container, TextField} from "@material-ui/core"
const RecordCreator = () =>{
    return(
    <div>
        <Container>
        <TextField
        fullWidth
            type="name"
          id="outlined-textarea"
          label="Name"
          placeholder="Your Name"
          multiline
          variant="outlined"
        />
            <TextField
            fullWidth
            type="email"
          id="outlined-textarea"
          label="Email"
          placeholder="vigneshmanavalan@gmail.com"
          multiline
          variant="outlined"
        />
        
        </Container>
    </div>)
    }

export default RecordCreator