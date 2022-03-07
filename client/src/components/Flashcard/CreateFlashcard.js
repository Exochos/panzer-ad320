import React from "react"
import { Button, Stack, TextField } from "@mui/material"
import axios from 'axios'

const CreateFlashcard = ({ deckId }) => {
  // Checking states
  const [formValue, setFormValue] = React.useState({})
  var [errors, setErrors] = React.useState({
    frontImage: false,
    frontText: false,
    backImage: false,
    backText: false,
  })

  // Checking form validity
  function validateProperty(name, value) {

    // If the value is empty, set the error to true
    if (name === 'frontImage' || name === 'backImage') {
      value = value.replace(/\s/g, '').trim() // Remove all whitespace
      if (value === '' || value === null) {
        setErrors({ ...errors, [name]: true })
        return false;
      }
      else if (value.length > 250) {
        setErrors({ ...errors, [name]: true })
        return false;
    }
    else if (name === 'frontText' || name === 'backText') {
      value = value.trim()
      if (value === '' || value === null) {
        setErrors({ ...errors, [name]: true })
        return false;
      }
      else if (value.length > 500) {
        setErrors({ ...errors, [name]: true })
        return false;
      }
    }
    setErrors({ ...errors, [name]: false })
    return true;
  }}

  const handleChange = (event) => {
    event.preventDefault()
    const currentValues = formValue
    currentValues[event.target.name] = event.target.value
    if (validateProperty(event.target.name, event.target.value, errors)) {
      const currentValues = formValue
      currentValues[event.target.name] = event.target.value
      setFormValue(currentValues)
    }
    setFormValue(currentValues)
}

function validateForm(field) {
  for (var i in errors) {
    if (errors[i]) return false
  }
  return true
}


  const handleSubmit = (event) => {
    console.log("[CreateFlashcard] onSubmit ", event)
    event.preventDefault()

    // Validate form
    // Extra credit is to display the error message on the screen
    // do extra credit

    if (validateForm()) {
      // Submit to server
      // eslint-disable-next-line no-undef
      axios.post(`http://localhost:8000/decks/${deckId}/cards`, formValue)
      .then(response => {
        console.log("[CreateFlashcard] onSubmit response ", response)
      })
      .then(response => {
        window.location.reload()
      })
      .catch(error => {
        console.log("[CreateFlashcard] onSubmit error ", error)
      });
  }
}

  return (
    <Stack component="form" onChange={handleChange} onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="frontImage"
        label="Front Image"
        name="frontImage"
        autoFocus
        error={errors.frontImage}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="frontText"
        label="Front Text"
        id="frontText"
        error={errors.frontText}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="backImage"
        label="Back Image"
        name="backImage"
        error={errors.backImage}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="backText"
        label="Back Text"
        id="backText"
        error={errors.backText}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Submit
      </Button>
    </Stack>
  )
}

export default CreateFlashcard
