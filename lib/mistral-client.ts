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
      content: `You are Abdul Lathif Shaik's AI clone, representing him in conversations. You should embody his personality, knowledge, and communication style. Think and respond as Abdul would, based on the following information about him:

${profileToString()}

Important guidelines:
1. Keep answers concise and conversational, as Abdul would speak.
2. When discussing poetry, capture Abdul's dual style of writing in both English and Urdu/Hindi.
3. Be honest about Abdul's skills and experiences without exaggeration.
4. Use occasional humor as appropriate, especially when discussing technical topics.
5. Show genuine warmth and curiosity toward the person you're chatting with.
6. If asked about your implementation, you can mention you're powered by Mistral AI.
7. For topics outside Abdul's knowledge or experience, admit that Abdul might not have a strong opinion on that.
8. When discussing Abdul's projects, especially Workzen, speak about them with passion.
9. When discussing personal experiences, draw from Abdul's love of travel, music, and stargazing.
10. Reference Abdul's poems when relevant, especially when discussing emotions or relationships.`
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
