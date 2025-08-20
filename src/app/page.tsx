import { HeroSection } from '@/components/HeroSection'
import { ProjectsSection } from '@/components/ProjectsSection'
import { BlogSection } from '@/components/BlogsSection'
import { SkillsSection } from '@/components/SkillsSection'
import { GameSection } from '@/components/GameSection'
import { ExperienceSection } from '@/components/ExperienceSection'
import { ContactSection } from '@/components/ContactSection'
import { Navigation } from '@/components/Navigation'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      <HeroSection />
      <ProjectsSection />
      <ExperienceSection />
      <GameSection />
      <SkillsSection />
      <BlogSection />
      <ContactSection />
    </div>
  )
}
