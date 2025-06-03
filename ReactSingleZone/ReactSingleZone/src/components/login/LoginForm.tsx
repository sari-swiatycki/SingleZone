"use client"

import type React from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Grid, Box, Paper } from "@mui/material"

import { LoginFormSection } from "./LoginFormSection"
import { WelcomeSection } from "./WelcomeSection"
import { AppDispatch, RootStore } from "../../Stores/songStore"
import { loginUser } from "../../Slices/authSlice "

const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { isLoading, error } = useSelector((state: RootStore) => state.auth)

  const [formData, setFormData] = useState({
    Id: 0,
    UserName: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await dispatch(loginUser({ ...formData, Id: 1 }))
    console.log("result", result)

    if (loginUser.fulfilled.match(result)) {
      navigate("/personal-area")
    }
  }

  return (
    <Box
      minHeight="100vh"
      maxHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        background: "#000000",
        p: 0,
        overflow: "hidden",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          height: "100vh",
          borderRadius: 0,
          overflow: "hidden",
          display: "flex",
          backgroundColor: "#000000",
        }}
      >
        <Grid container sx={{ height: "100%" }}>
          <LoginFormSection
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            error={error}
            navigate={navigate}
          />
          <WelcomeSection navigate={navigate} />
        </Grid>
      </Paper>
    </Box>
  )
}

export default LoginForm
