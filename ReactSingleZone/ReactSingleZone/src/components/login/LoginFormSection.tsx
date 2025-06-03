"use client"

import type React from "react"
import { useState } from "react"
import { Grid, Box, Button, TextField, Typography, CircularProgress, IconButton, InputAdornment } from "@mui/material"
import { Visibility, VisibilityOff, Person, Lock } from "@mui/icons-material"

interface LoginFormSectionProps {
  formData: {
    Id: number
    UserName: string
    password: string
  }
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.FormEvent) => void
  isLoading: boolean
  error: string | null
  navigate: (path: string) => void
}

export const LoginFormSection: React.FC<LoginFormSectionProps> = ({
  formData,
  handleChange,
  handleSubmit,
  isLoading,
  error,
  navigate,
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Grid
      item
      xs={12}
      md={6}
      sx={{
        backgroundColor: "#000000",
        p: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box sx={{ maxWidth: 380, mx: "auto", width: "100%" }}>
        <Typography
          variant="h4"
          textAlign="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#ffffff",
            mb: 0.5,
          }}
        >
          Welcome Back
        </Typography>

        <Typography
          variant="body2"
          textAlign="center"
          sx={{
            color: "#888888",
            mb: 3,
            fontSize: "0.9rem",
          }}
        >
          Sign in to continue your musical journey
        </Typography>

        {error && (
          <Box
            sx={{
              p: 1.5,
              mb: 2,
              backgroundColor: "#1a0000",
              borderRadius: 2,
              border: "1px solid #ff3333",
            }}
          >
            <Typography color="error" fontSize="0.85rem" textAlign="center">
              {error}
            </Typography>
          </Box>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="UserName"
            value={formData.UserName}
            onChange={handleChange}
            fullWidth
            margin="dense"
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person sx={{ color: "#666" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#111111",
                "&:hover fieldset": {
                  borderColor: "#333",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#00bcd4",
                },
              },
              input: {
                color: "#ffffff",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#333",
              },
              "& .MuiInputLabel-root": {
                color: "#888",
              },
              "& .Mui-focused .MuiInputLabel-root": {
                color: "#00bcd4",
              },
            }}
          />

          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="dense"
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: "#666" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end" sx={{ color: "#666" }}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#111111",
                "&:hover fieldset": {
                  borderColor: "#333",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#00bcd4",
                },
              },
              input: {
                color: "#ffffff",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#333",
              },
              "& .MuiInputLabel-root": {
                color: "#888",
              },
              "& .Mui-focused .MuiInputLabel-root": {
                color: "#00bcd4",
              },
            }}
          />

          <Box sx={{ mb: 2, textAlign: "right" }}>
            <Button
              variant="text"
              size="small"
              sx={{
                color: "#00bcd4",
                textDecoration: "underline",
                fontSize: "0.8rem",
                "&:hover": {
                  backgroundColor: "rgba(0, 188, 212, 0.1)",
                },
              }}
            >
              Forgot Password?
            </Button>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              py: 1.3,
              fontWeight: "bold",
              fontSize: "1rem",
              borderRadius: 2,
              background: "linear-gradient(45deg, #1a1a1a 30%, #333333 90%)",
              color: "#ffffff",
              border: "1px solid #00bcd4",
              "&:hover": {
                background: "linear-gradient(45deg, #333333 30%, #1a1a1a 90%)",
                boxShadow: "0 8px 25px rgba(0, 188, 212, 0.3)",
              },
              "&:disabled": {
                background: "#333",
                color: "#666",
                border: "1px solid #333",
              },
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={22} color="inherit" onClick={() => navigate("register/")} />
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <Typography
          variant="body2"
          textAlign="center"
          sx={{
            mt: 2,
            color: "#666",
            fontSize: "0.75rem",
          }}
        >
          By signing in, you agree to our{" "}
          <Button
            variant="text"
            size="small"
            sx={{
              p: 0,
              minWidth: "auto",
              color: "#00bcd4",
              textDecoration: "underline",
              fontSize: "0.75rem",
            }}
          >
            Terms
          </Button>{" "}
          and{" "}
          <Button
            variant="text"
            size="small"
            sx={{
              p: 0,
              minWidth: "auto",
              color: "#00bcd4",
              textDecoration: "underline",
              fontSize: "0.75rem",
            }}
          >
            Privacy Policy
          </Button>
        </Typography>
      </Box>
    </Grid>
  )
}
