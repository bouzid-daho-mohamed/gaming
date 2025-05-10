export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          price: number
          category: string
          image: string
          featured: boolean
          is_new: boolean
          colors: string[]
          sizes: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price: number
          category: string
          image: string
          featured?: boolean
          is_new?: boolean
          colors?: string[]
          sizes?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          price?: number
          category?: string
          image?: string
          featured?: boolean
          is_new?: boolean
          colors?: string[]
          sizes?: string[]
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}