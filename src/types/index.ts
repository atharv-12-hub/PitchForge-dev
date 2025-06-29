export interface PitchDeck {
  id: string;
  title: string;
  description: string;
  template: string;
  tone: string;
  slides: Slide[];
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface Slide {
  id: string;
  type: SlideType;
  title: string;
  content: string;
  order: number;
  design_props?: Record<string, any>;
}

export type SlideType = 
  | 'title'
  | 'problem'
  | 'solution'
  | 'market'
  | 'product'
  | 'business_model'
  | 'traction'
  | 'team'
  | 'financials'
  | 'ask'
  | 'custom';

export type ToneType = 'investor' | 'technical' | 'casual' | 'visionary';

export type TemplateType = 'minimal' | 'bold' | 'corporate' | 'dark' | 'playful';

export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
}

export interface GenerationRequest {
  business_idea: string;
  tone: ToneType;
  template: TemplateType;
  target_audience: string;
  key_features: string[];
}