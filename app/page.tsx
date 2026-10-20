import { Scene } from "@/components/experience/scene"
import { About } from "@/components/sections/about"
import { Contact } from "@/components/sections/contact"
import { Hero } from "@/components/sections/hero"
import { Services } from "@/components/sections/services"
import { Stack } from "@/components/sections/stack"
import { Work } from "@/components/sections/work"
import { Cursor } from "@/components/ui-kit/cursor"
import { Loader } from "@/components/ui-kit/loader"
import { Navigation } from "@/components/ui-kit/navigation"
import { SmoothScroll } from "@/components/ui-kit/smooth-scroll"

export default function Page() {
  return (
    <>
      <SmoothScroll />
      <Scene />
      <Loader />
      <Cursor />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <About />
        <Services />
        <Stack />
        <Work />
        <Contact />
      </main>
    </>
  )
}
