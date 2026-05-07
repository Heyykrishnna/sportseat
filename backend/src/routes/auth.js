import { Router } from 'express'
import { z } from 'zod'
import { supabaseAdmin } from '../lib/supabase.js'

export const authRouter = Router()

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  displayName: z.string().optional(),
})

authRouter.post('/signup', async (req, res) => {
  const parsed = authSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid data', issues: parsed.error.issues })
  }

  const { email, password, displayName } = parsed.data

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { display_name: displayName },
  })

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  return res.status(201).json({ 
    message: 'User created successfully', 
    user: {
      id: data.user.id,
      email: data.user.email,
      displayName: data.user.user_metadata.display_name,
    }
  })
})

authRouter.post('/login', async (req, res) => {
  const parsed = authSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid data', issues: parsed.error.issues })
  }

  const { email, password } = parsed.data

  const { data, error } = await supabaseAdmin.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return res.status(401).json({ error: error.message })
  }

  return res.json({ 
    message: 'Login successful', 
    session: data.session, 
    user: {
      id: data.user.id,
      email: data.user.email,
      displayName: data.user.user_metadata.display_name,
    }
  })
})
