# Mistral AI Integration for Portfolio Chatbot

This document explains how to set up and use the Mistral AI integration for the AI chatbot on your portfolio website.

## Overview

The chatbot has been updated to use Mistral AI's API, which provides a more personalized and accurate representation of you based on the personal information and profile data included in the implementation.

## Setup Instructions

### 1. Get a Mistral AI API Key

1. Visit [Mistral AI Platform](https://console.mistral.ai/) and create an account
2. Once logged in, navigate to the API section
3. Generate a new API key
4. Copy the API key for the next step

### 2. Configure the API Key

Add your Mistral AI API key to your environment variables:

1. Create a `.env.local` file in the root directory of your project (if it doesn't exist)
2. Add the following line to the file:
   ```
   NEXT_PUBLIC_MISTRAL_API_KEY=your_mistral_api_key_here
   ```
3. Replace `your_mistral_api_key_here` with the API key you obtained from Mistral AI

### 3. Restart Your Application

After setting the API key, restart your Next.js development server:

```bash
pnpm dev
```

## How the Integration Works

The Mistral AI integration uses several components:

1. **Personal Profile Data**: Your profile information, including professional background, interests, poetry, and personality traits, is stored in `/lib/abdul-profile.ts`

2. **Mistral Client**: The `/lib/mistral-client.ts` file handles the connection to the Mistral AI API and formats your profile data as context for the AI

3. **Chatbot Interface**: The chatbot component now sends user messages to Mistral AI and displays the responses

## Customizing Your AI Personality

To update or modify your AI personality, edit the data in `/lib/abdul-profile.ts`. The file is organized into sections:

- Basic information and contact details
- Professional background and skills
- Personal interests and characteristics
- Poetry samples
- Communication style

Changes to this file will affect how the AI responds to user queries.

## Features

- **Advanced AI Responses**: Mistral AI provides more natural and contextually relevant responses
- **Personality Mirroring**: The AI attempts to match your communication style and personality
- **Multi-language Poetry Support**: The AI understands your poetry in both English and Urdu/Hindi
- **Technical Knowledge**: The AI can discuss your technical skills and projects accurately
- **Fallback Responses**: If the API is unavailable, the chatbot uses predefined fallback responses

## Troubleshooting

If you encounter issues with the Mistral AI integration:

1. **Check Your API Key**: Ensure your Mistral AI API key is correctly set in the `.env.local` file
2. **Verify Network Connection**: Make sure your application has internet access to reach the Mistral AI API
3. **Check Browser Console**: Look for error messages in your browser's developer console
4. **API Limits**: Be aware that Mistral AI may have rate limits on API calls

## Security Notes

- Your API key should be kept secure and not shared publicly
- The environment variable is prefixed with `NEXT_PUBLIC_` because the API calls are made from the client side
- Consider implementing more secure approaches for production deployments

For more information about Mistral AI and its capabilities, visit [Mistral AI's documentation](https://docs.mistral.ai/).
