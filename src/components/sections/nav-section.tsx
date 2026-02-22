import SectionWrapper from '../reusables/section-wrapper'
import { Typography } from '../ui/typography'
import { Button } from '../ui/button'
import { AlignJustify } from 'lucide-react'

const NavSection = () => {
  return (
    <div className="fixed z-1000 top-0 left-0 right-0 bg-background backdrop-blur-md">
      <SectionWrapper className="py-4 flex items-center justify-between">
      <Typography variant="h3" className="text-foreground">
        Sazón
      </Typography>
      <div className="hidden lg:flex items-center gap-6">
        <Typography variant="small" className="text-foreground/80">
          Home
        </Typography>
        <Typography variant="small" className="text-foreground/80">
          Menu
        </Typography>
        <Typography variant="small" className="text-foreground/80">
          About Us
        </Typography>
        <Typography variant="small" className="text-foreground/80">
          Contact
        </Typography>
      </div>
      <div className="hidden lg:flex items-center gap-4">
        <Button type="button" variant="outline" className='rounded-full' size="lg">
          Directions
        </Button>
        <Button type="button" className="rounded-full" size="lg">
          Order Online
        </Button>
       </div>
       <Button type="button" className="rounded-lg lg:hidden">
          <AlignJustify className='p-1 size-6'/>
        </Button>
      </SectionWrapper>
    </div>
  )
}

export default NavSection