import React from 'react'
import SectionWrapper from '../reusables/section-wrapper'
import { Typography } from '../ui/typography'

type Props = {}

const FooterSection = (props: Props) => {
  return (
    <div className="bg-foreground text-background">
      <SectionWrapper className="py-16 flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex flex-col gap-2">
          <Typography variant="h3" className="text-background">
            Sazón
          </Typography>
          <Typography variant="small" className="text-background/80 mt-2">
            Bringing the vibrant flavors of Mexico to Nairobi, one dish at a time.
          </Typography>
          
        </div>
        <div className="flex flex-col gap-2">
          <Typography variant="h3" className="text-background">
            Quick Links
          </Typography>
          <ul>
            <li>
              <Typography variant="small" className="text-background/80 mt-1">
                Home
              </Typography>
            </li>
            <li>
              <Typography variant="small" className="text-background/80 mt-1">
                Menu
              </Typography>
            </li>
            <li>
              <Typography variant="small" className="text-background/80 mt-1">
                About Us
              </Typography>
            </li>
            <li>
              <Typography variant="small" className="text-background/80 mt-1">
                Contact
              </Typography>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <Typography variant="h3" className="text-background">
            Contact Us
          </Typography>
          <Typography variant="small" className="text-background/80 mt-1">
            Email: info@sazon.com
          </Typography>
          <Typography variant="small" className="text-background/80 mt-1">
            Phone: +254 700 000 000
          </Typography>
        </div>
        <div className="flex flex-col gap-2">
          <Typography variant="h3" className="text-background">
            Follow Us
          </Typography>
          <Typography variant="small" className="text-background/80 mt-1">
            Facebook
          </Typography>
          <Typography variant="small" className="text-background/80 mt-1">
            Instagram
          </Typography>
          <Typography variant="small" className="text-background/80 mt-1">
            Twitter
          </Typography>
        </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-2 items-center justify-between border-t border-background/20 pt-4">
          <Typography variant="small" className="text-background/80">
            &copy; {new Date().getFullYear()} Sazón. All rights reserved.
          </Typography>
          <Typography variant="small" className="text-background/80">
            Designed with ❤️ by Enoch Garoli
          </Typography>
        </div>
      </SectionWrapper>
    </div>
  )
}

export default FooterSection