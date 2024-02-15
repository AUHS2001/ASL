import { submitFeedback } from "@/utils/apiCalling";
import { Box, Button, DialogActions, TextField } from "@mui/material";
import React, { useState } from "react";

const WrongFeedback = ({ wrongFeedback,setDialogOpen }) => {

  const [additionalFeedback,setAdditionalFeedback]=useState("")
  const handleWrongFeedback = (e) => {
    e.preventDefault();
    if(wrongFeedback){

      submitFeedback(wrongFeedback.type, wrongFeedback.id,"wrong",additionalFeedback);
      setDialogOpen(false)
    }
  };
  
  return (
    <>
      <Box
       
        component={"form"}
        onSubmit={(e) => handleWrongFeedback(e)}

        // onSubmit={()=>console.log("eeeeee")}
      >
        <TextField
          //   autoFocus
          value={additionalFeedback}
          onChange={(e)=>setAdditionalFeedback(e.target.value)}
          required={true}
          margin="dense"
          id="addtionalFeedback"
          name="AddtionalFeedback"
          placeholder="What was the issue with the response? How could it be improved?"
          type="text"
          fullWidth
          variant="outlined"
          multiline
          rows={3}
          maxRows={5}
          sx={{ margin: "10px 0px" }}
        />
      <DialogActions>
        {/* <Button   variant="contained" >Close</Button> */}

        <Button type="submit" variant="outlined" color="success">
          Submit Feedback
        </Button>
      </DialogActions>
      </Box>
    </>
  );
};

export default WrongFeedback;
