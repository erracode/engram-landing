import { z } from 'astro:content'

export default z.object({
  title: z.string(),
  description: z.string(),
  order: z.number().optional(),
  tags: z.array(z.string()).optional(),
})
