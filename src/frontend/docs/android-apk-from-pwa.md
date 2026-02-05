# Creating an Android APK from Your PWA

This guide explains how to wrap your deployed Progressive Web App (PWA) into an Android APK using Trusted Web Activity (TWA) technology.

## What is a Trusted Web Activity?

A Trusted Web Activity (TWA) is a way to package your PWA as an Android app that runs in a Chrome Custom Tab without any browser UI. The app appears as a native Android application while actually displaying your web content.

## Prerequisites

Before you begin, ensure you have:

1. **Your deployed PWA URL** - The live URL where your app is hosted (e.g., `https://your-canister-id.ic0.app` or your custom domain)
2. **Node.js and npm** installed on your computer
3. **Android Studio** (optional, but recommended for testing)
4. **Java Development Kit (JDK)** version 8 or higher

## Step 1: Install Bubblewrap

Bubblewrap is Google's recommended tool for generating Android apps from PWAs.

