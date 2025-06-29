// Real AI slide generation using Gemini API
export interface Slide {
  id: string;
  title: string;
  content: string;
}

export const generateSlides = async (idea: string, useCase: string = 'startup', theme: string = 'modern'): Promise<Slide[]> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('Gemini API key not found. Please add VITE_GEMINI_API_KEY to your environment variables.');
  }

  const slides: Slide[] = [];
  const slideTypes = ['Problem', 'Solution', 'Market', 'Product', 'Team'];
  
  // Generate each slide sequentially using Gemini API
  for (let i = 0; i < slideTypes.length; i++) {
    const slideType = slideTypes[i];
    
    try {
      const slide = await generateSlideWithGemini(idea, slideType, slides, useCase, theme, apiKey);
      slides.push({
        id: `slide-${i + 1}`,
        title: slideType,
        content: slide.content
      });
      
      // Add a small delay between API calls to avoid rate limiting
      if (i < slideTypes.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } catch (error) {
      console.error(`Error generating ${slideType} slide:`, error);
      
      // Fallback to static content if API fails
      const fallbackSlide = generateFallbackSlide(slideType, idea, useCase);
      slides.push({
        id: `slide-${i + 1}`,
        title: slideType,
        content: fallbackSlide
      });
    }
  }

  return slides;
};

const generateSlideWithGemini = async (
  idea: string, 
  slideType: string, 
  previousSlides: Slide[], 
  useCase: string, 
  theme: string, 
  apiKey: string
): Promise<{ title: string; content: string }> => {
  
  const prompt = `You are a startup pitch assistant. Based on the idea: '${idea}', use case: '${useCase}', theme: '${theme}', and previous slides: ${JSON.stringify(previousSlides)}, generate the next slide for '${slideType}' in this exact JSON format:
{
  "title": "${slideType}",
  "content": "2-3 sentences of compelling, specific content for this ${slideType} slide. Make it investor-ready and tailored to ${useCase} presentations. Be specific with numbers, metrics, and concrete details where possible."
}

Guidelines:
- For Problem: Focus on pain points, market gaps, and urgency
- For Solution: Highlight unique value proposition and key benefits  
- For Market: Include market size, growth rates, and opportunity
- For Product: Describe key features, differentiators, and user experience
- For Team: Emphasize relevant experience, expertise, and track record

Make the content compelling, specific, and appropriate for ${useCase} context.`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  
  if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
    throw new Error('Invalid response format from Gemini API');
  }

  const generatedText = data.candidates[0].content.parts[0].text;
  
  try {
    // Try to parse as JSON first
    const parsedSlide = JSON.parse(generatedText);
    return {
      title: parsedSlide.title || slideType,
      content: parsedSlide.content || generatedText
    };
  } catch (parseError) {
    // If JSON parsing fails, use the raw text as content
    return {
      title: slideType,
      content: generatedText.trim()
    };
  }
};

// Fallback content in case API fails
const generateFallbackSlide = (slideType: string, idea: string, useCase: string): string => {
  const fallbackContent = {
    Problem: `Current solutions in this market are outdated and fail to meet modern user needs. Customers face significant challenges with existing approaches, creating substantial pain points and inefficiencies. This represents a major opportunity for innovation and disruption in the ${useCase} space.`,
    
    Solution: `Our innovative approach directly addresses these market gaps through cutting-edge technology and user-centric design. We provide a comprehensive solution that eliminates key pain points while delivering exceptional value. Our platform is specifically designed for ${useCase} success with measurable results.`,
    
    Market: `The addressable market represents a multi-billion dollar opportunity with strong growth fundamentals and increasing demand. Market trends indicate significant potential for disruption, with early adopters showing strong willingness to adopt new solutions. Our target segment is underserved and ready for innovation.`,
    
    Product: `Our product features advanced capabilities that differentiate us from existing solutions in the market. We offer intuitive user experience, robust functionality, and seamless integration capabilities. The platform is built for scale with enterprise-grade security and reliability.`,
    
    Team: `Our experienced team combines deep industry expertise with proven execution capabilities and strong technical backgrounds. Led by seasoned entrepreneurs with successful track records, supported by advisors with extensive networks and domain knowledge. We have the right team to execute this vision successfully.`
  };

  return fallbackContent[slideType] || `Compelling ${slideType.toLowerCase()} content tailored for your ${useCase} presentation. Our solution addresses key market needs with innovative technology and proven results.`;
};

// Helper functions for backward compatibility
export const extractKeywords = (text: string): string[] => {
  const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 2 && !commonWords.includes(word))
    .slice(0, 10);
};

export const detectBusinessType = (idea: string): string => {
  const lowerIdea = idea.toLowerCase();
  
  if (lowerIdea.includes('ai') || lowerIdea.includes('artificial intelligence')) return 'ai';
  if (lowerIdea.includes('mobile') || lowerIdea.includes('app')) return 'mobile';
  if (lowerIdea.includes('health') || lowerIdea.includes('medical')) return 'health';
  if (lowerIdea.includes('education') || lowerIdea.includes('learning')) return 'education';
  if (lowerIdea.includes('fintech') || lowerIdea.includes('finance')) return 'fintech';
  if (lowerIdea.includes('saas') || lowerIdea.includes('software')) return 'saas';
  
  return 'general';
};