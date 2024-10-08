"use client"
import React from 'react'
import { Button } from './ui/button'
import { PRODUCT_CATEGORIES } from '@/config'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

type Category = typeof PRODUCT_CATEGORIES[number]

interface NavItemProps {
  category: Category
  handleOpen: () => void
  isOpen: boolean
  isAnyOpen: boolean
}

const NavItem = (props: NavItemProps) => {

  return (
    <div className='flex'>
    <div className='relative flex items-center'>
      <Button className='gap-1.5' onClick={props.handleOpen} variant={props.isOpen ? "secondary" : "ghost"}>
        {props.category.label}
        <ChevronDown className={cn("h-4 w-4 transition-all text-muted-foreground",{
          "-rotate-180": props.isOpen
        }
      )}
      > </ChevronDown>
      </Button>
    </div>
      {props.isOpen ? (
        <div className={cn("absolute inset-x-0 top-full text-sm text-muted-foreground",{
          "animate-in fade-in-10 slide-in-fro-top-5": !props.isAnyOpen,
        }
      )}>
        <div className='absolute inset-0 top-1/2 bg-white shafow' aria-hidden='true'/>
        <div className='relative bg-white'>
          <div className='mx-auto mx-w-7xl px-8'>
            <div className='grid grid-cols-4 gap-x-8 gap-y-10 py16'>
              <div className='col-span-4 col-start-1 grid grid-cols-3 gap-x-8'>
                {props.category.featured.map(elem => {
                  return (
                    <div key={elem.name} className='group relative text-base sm:text-sm'>
                      <div className='relative aspect-video overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75'>
                        <Image src={elem.imageSrc} alt='product image' fill  className='object-cover object-center'/>
                      </div>
                      <Link href={elem.href} className='mt-6 block font-medium text-gray-100'>
                      {elem.name}
                      </Link>
                      <p className='mt-1' aria-hidden='true'>
                        Shop now
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      ): null}
    </div>
  )
}

export default NavItem