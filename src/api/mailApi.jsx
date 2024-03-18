import React from "react";
import { mailApi } from "./apiClient";
export async function sendEmail(data) {
  try {
    const response = await mailApi.post("/register",data);
    return response;
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
