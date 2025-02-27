import { Atom } from '@/components/Atom'
import { MenuItem, MenuItemProps } from '@/components/MenuItem'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export interface MenuProps extends Omit<ComponentProps<'ul'>, 'children'> {
  items: MenuItemProps<any>[]
}

export function Menu({ items, ...props }: MenuProps) {
  return (
    <Atom
      as="ul"
      variant="popover"
      {...props}
    >
      {items.map(({ className, ...buttonProps }, index) => (
        <li key={index}>
          <MenuItem
            className={twMerge('w-full', className)}
            {...buttonProps}
          />
        </li>
      ))}
    </Atom>
  )
}
