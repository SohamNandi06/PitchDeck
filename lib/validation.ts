import { z } from 'zod'

export const formSchema = z
  .object({
    title: z.string().min(3).max(100),
    description: z.string().min(20).max(500),
    category: z.string().min(3).max(20),
    link: z.string().url(),
    pitch: z.string().min(10),
  })
  .superRefine(async (data, ctx) => {
    try {
      const res = await fetch(data.link, { method: 'HEAD' })
      const contentType = res.headers.get('content-type')
      if (!contentType?.startsWith('image/')) {
        ctx.addIssue({
          path: ['link'],
          code: z.ZodIssueCode.custom,
          message: 'The link must point to an image.',
        })
      }
    } catch {
      ctx.addIssue({
        path: ['link'],
        code: z.ZodIssueCode.custom,
        message: 'Invalid or unreachable image URL.',
      })
    }
  })
