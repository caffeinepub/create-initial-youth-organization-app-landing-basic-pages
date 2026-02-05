# Google AdSense Integration

This document explains how to enable Google AdSense on your deployed site.

## Overview

The site includes optional Google AdSense support. When configured, the AdSense script will be automatically injected into the page `<head>` on every page load. When not configured, no AdSense code is included.

## Setup Instructions

### 1. Get Your AdSense Client ID

1. Sign up for or log in to your [Google AdSense account](https://www.google.com/adsense/)
2. Navigate to **Ads** → **Overview** → **Get code**
3. Copy your AdSense client ID from the script tag. It will look like: `ca-pub-XXXXXXXXXXXXXXXX`

### 2. Configure the Environment Variable

To enable AdSense, you need to set the `VITE_ADSENSE_CLIENT_ID` environment variable with your AdSense client ID.

**For local development:**

Create or edit a `.env` file in the `frontend/` directory:

