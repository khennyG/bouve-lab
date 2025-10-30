import { redirect } from 'next/navigation'

export default function WelcomePage() {
  // This route has been removed; redirect to the Prompt Library
  redirect('/explore/prompts')
}
