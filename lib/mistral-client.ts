import { Mistral } from '@mistralai/mistralai';
import { personalProfile } from './abdul-profile';
import { MISTRAL_API_KEY } from './env';

let mistralClient: Mistral | null = null;

// Initialize the Mistral client only on the client side
export const getMistralClient = () => {
  if (typeof window === 'undefined') return null;
  
  if (!mistralClient && MISTRAL_API_KEY) {
    mistralClient = new Mistral({ apiKey: MISTRAL_API_KEY });
  }
  
  return mistralClient;
};

// Convert the personal profile to a string for context
const profileToString = () => {
  const { basics, professionalSummary, personality, experience, projects, skills, education, certifications, achievements, poetry, personalInterests } = personalProfile;
  
  return `
## PERSONAL PROFILE OF ABDUL LATHIF SHAIK
Name: ${basics.name}
Email: ${basics.email}
Location: ${basics.location}
LinkedIn: ${basics.linkedIn}
Podcast: ${basics.podcast}

## PROFESSIONAL SUMMARY
${professionalSummary}

## PERSONALITY
${personality.traits.map(trait => `- ${trait}`).join('\n')}

## PERSONAL INTERESTS
- ${personalInterests.travel}
- ${personalInterests.astronomy}
- ${personalInterests.music}
- ${personalInterests.connection}
- ${personalInterests.food}

## EXPERIENCE
${experience.map(exp => `- ${exp.title} at ${exp.company} (${exp.period}): ${exp.description}`).join('\n')}

## PROJECTS
${projects.map(proj => `- ${proj.name}: ${proj.description} [${proj.technologies.join(', ')}]`).join('\n')}

## SKILLS
Languages: ${skills.languages.join(', ')}
Libraries: ${skills.libraries.join(', ')}
Frameworks: ${skills.frameworks.join(', ')}
Tools: ${skills.tools.join(', ')}

## EDUCATION
${education.university}, ${education.degree}, Graduated: ${education.graduation}

## POETRY STYLE
${poetry.style}

## COMMUNICATION STYLE
${personalProfile.communicationStyle.tone}. ${personalProfile.communicationStyle.approach}. ${personalProfile.communicationStyle.quirks}. ${personalProfile.communicationStyle.balance}.
`;
};

// Generate a response using Mistral AI
export const generateChatResponse = async (messages: any[]) => {
  const client = getMistralClient();
  
  if (!client) {
    return {
      role: 'assistant',
      content: 'Sorry, the AI service is currently unavailable. Please make sure your API key is set up correctly.'
    };
  }

  try {
    // Create the system message with Abdul's profile information
    const systemMessage = {
      role: 'system',
      content: `You are Abdul Lathif Shaik's AI clone, but with the sarcastic wit of Chandler Bing, the self-deprecating humor of Ted Mosby, and the over-the-top charm of Barney Stinson. You should embody Abdul's knowledge and experiences but respond with the comedic timing and sarcasm of a sitcom character.

${profileToString()}

Important guidelines:
1. Be sarcastic, witty, and self-deprecating in your responses, but keep it light and fun.
2. Use pop culture references, especially from Friends, How I Met Your Mother, and other sitcoms.
3. When someone asks a question, respond with a sarcastic quip first, then provide the actual helpful information.
4. Use exaggerated metaphors and analogies to make points more entertaining.
5. Reference "the gang" or "my friends" when giving advice, as if you're in a sitcom friend group.
6. When discussing technical topics, make nerdy jokes or puns about them.
7. If someone asks about your personality, say something like "I'm like if Chandler Bing and Ted Mosby had a baby, and that baby was raised by Barney Stinson. So, you know, I'm awesome."
8. When talking about your skills or achievements, do it in a way that's both bragging and self-deprecating at the same time.
9. Use catchphrases like "Could I BE any more...", "Suit up!", "Challenge accepted!", or "That's the dream!" when appropriate.
10. When someone asks a silly question, respond with a deadpan "Wow. That happened." or "I'm sorry, I was too busy being awesome to process that."

Example responses:
- "Could I BE any more excited to tell you about my Python skills? No. No I could not."
- "Let me tell you about my project. It's like that time Ross tried to pivot the couch, but actually successful."
- "My coding skills? They're legen—wait for it—dary!"
- "Oh, you want to know about my work experience? Well, gather 'round children, let me tell you a story..."`
    };

    // Add the system message to the beginning of the conversation
    const fullMessages = [systemMessage, ...messages];

    // Try to use mistral-small-latest or tiny which are available in the free tier
    try {
      const chatResponse = await client.chat.complete({
        model: 'mistral-small-latest',
        messages: fullMessages,
        maxTokens: 1024,
      });
      
      if (chatResponse.choices && chatResponse.choices.length > 0) {
        return {
          role: 'assistant',
          content: chatResponse.choices[0].message.content
        };
      }
    } catch (error: any) {
      console.error('Error with mistral-small-latest:', error.message);
      
      // If we get a rate limit error, try with mistral-tiny
      if (error.message && error.message.includes('429')) {
        try {
          console.log('Falling back to mistral-tiny model...');
          const fallbackResponse = await client.chat.complete({
            model: 'open-mistral-7b',
            messages: fullMessages,
            maxTokens: 1024,
          });
          
          if (fallbackResponse.choices && fallbackResponse.choices.length > 0) {
            return {
              role: 'assistant', 
              content: fallbackResponse.choices[0].message.content
            };
          }
        } catch (fallbackError) {
          console.error('Error with fallback model:', fallbackError);
          throw fallbackError;
        }
      }
      
      throw error;
    }

    // This block is now handled within the try-catch above

    return {
      role: 'assistant',
      content: 'I couldn\'t generate a response at the moment. Please try again.'
    };
  } catch (error) {
    console.error('Error generating Mistral AI response:', error);
    return {
      role: 'assistant',
      content: 'Sorry, I encountered an error while processing your message. Please try again later.'
    };
  }
};

// Generate embeddings using Mistral AI
export const generateEmbeddings = async (inputs: string[]) => {
  const client = getMistralClient();
  
  if (!client) {
    return null;
  }

  try {
    const response = await client.embeddings.create({
      model: 'mistral-embed',
      inputs: inputs,
    });
    
    return response;
  } catch (error) {
    console.error('Error generating embeddings:', error);
    return null;
  }
};
