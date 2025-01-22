import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  // ChevronDown,
  ChevronRight,
  Home,
  Settings,
  Users,
  Mail,
  MessageSquare,
  PieChart,
  FileText,
  ShoppingCart,
  BarChart,
  Layers,
  HelpCircle,
  ChevronLeftCircle,
  ChevronRightCircle,
  X,
  LogOut,
  Bell,
  Lock,
  Palette
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type MenuItem = {
  icon: React.ReactNode
  title: string
  href?: string
  submenu?: MenuItem[]
}

const menuItems: MenuItem[] = [
  { icon: <Home className="h-4 w-4" />, title: 'Dashboard', href: '/' },
  {
    icon: <Users className="h-4 w-4" />,
    title: 'User Management',
    submenu: [
      { icon: <FileText className="h-4 w-4" />, title: 'User List', href: '/users' },
      { icon: <FileText className="h-4 w-4" />, title: 'Roles', href: '/roles' },
      { icon: <FileText className="h-4 w-4" />, title: 'Permissions', href: '/permissions' },
    ],
  },
  {
    icon: <ShoppingCart className="h-4 w-4" />,
    title: 'E-commerce',
    submenu: [
      { icon: <FileText className="h-4 w-4" />, title: 'Products', href: '/products' },
      { icon: <FileText className="h-4 w-4" />, title: 'Orders', href: '/orders' },
      { icon: <FileText className="h-4 w-4" />, title: 'Customers', href: '/customers' },
    ],
  },
  {
    icon: <BarChart className="h-4 w-4" />,
    title: 'Analytics',
    submenu: [
      { icon: <PieChart className="h-4 w-4" />, title: 'Sales', href: '/analytics/sales' },
      { icon: <BarChart className="h-4 w-4" />, title: 'Traffic', href: '/analytics/traffic' },
    ],
  },
  {
    icon: <Layers className="h-4 w-4" />,
    title: 'Content',
    submenu: [
      { icon: <FileText className="h-4 w-4" />, title: 'Pages', href: '/pages' },
      { icon: <MessageSquare className="h-4 w-4" />, title: 'Blog', href: '/blog' },
    ],
  },
  { icon: <Mail className="h-4 w-4" />, title: 'Email', href: '/email' },
  { icon: <MessageSquare className="h-4 w-4" />, title: 'Chat', href: '/chat' },
  {
    icon: <Settings className="h-4 w-4" />,
    title: 'Settings',
    submenu: [
      { icon: <Bell className="h-4 w-4" />, title: 'Notifications', href: '/settings/notifications' },
      { icon: <Lock className="h-4 w-4" />, title: 'Security', href: '/settings/security' },
      { icon: <Palette className="h-4 w-4" />, title: 'Appearance', href: '/settings/appearance' },
    ],
  },
  { icon: <HelpCircle className="h-4 w-4" />, title: 'Help & Support', href: '/support' },
]

function MenuItem({ item, isCollapsed, depth = 0, onSelect }: { item: MenuItem; isCollapsed: boolean; depth?: number; onSelect: (item: MenuItem) => void }) {
  const hasSubmenu = item.submenu && item.submenu.length > 0

  if (isCollapsed && depth === 0) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-center"
              onClick={() => onSelect(item)}
            >
              {item.icon}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            {item.title}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <Button
      variant="ghost"
      className={`w-full justify-start ${depth > 0 ? 'pl-8' : ''}`}
      onClick={() => onSelect(item)}
    >
      {item.icon}
      {!isCollapsed && <span className="ml-2">{item.title}</span>}
      {hasSubmenu && !isCollapsed && (
        <ChevronRight className="ml-auto h-4 w-4" />
      )}
    </Button>
  )
}

function UserInfo({ isCollapsed }: { isCollapsed: boolean }) {
  return (
    <div className={`p-4 border-t ${isCollapsed ? 'flex justify-center' : ''}`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-full justify-start p-0">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-avatar.jpg" alt="User avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="ml-2 text-left">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">john@example.com</p>
              </div>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default function Component() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null)

  const handleItemSelect = (item: MenuItem) => {
    if (item.submenu) {
      setSelectedItem(item)
    } else {
      setActiveItem(item)
      setSelectedItem(null)
    }
  }

  const handleSubItemSelect = (item: MenuItem) => {
    setActiveItem(item)
  }

  const handleCloseSubmenu = () => {
    setSelectedItem(null)
  }

  return (
    <div className="flex h-screen">
      <div className={`bg-background border-r transition-all duration-300 flex flex-col ${isCollapsed ? 'w-16' : 'w-64'}`}>
        <div className="p-4 border-b flex justify-between items-center">
          {!isCollapsed && <h2 className="text-lg font-semibold">Admin Dashboard</h2>}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRightCircle className="h-4 w-4" /> : <ChevronLeftCircle className="h-4 w-4" />}
          </Button>
        </div>
        <ScrollArea className="flex-grow">
          <div className="p-3">
            {menuItems.map((item, index) => (
              <MenuItem 
                key={index} 
                item={item} 
                isCollapsed={isCollapsed} 
                onSelect={handleItemSelect}
              />
            ))}
          </div>
        </ScrollArea>
        <UserInfo isCollapsed={isCollapsed} />
      </div>
      {selectedItem && selectedItem.submenu && (
        <div className="bg-background border-r w-64 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{selectedItem.title}</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCloseSubmenu}
              aria-label="Close submenu"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {selectedItem.submenu.map((subItem, index) => (
              <MenuItem 
                key={index} 
                item={subItem} 
                isCollapsed={false} 
                onSelect={handleSubItemSelect}
              />
            ))}
          </div>
        </div>
      )}
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold">Content Area</h1>
        {activeItem ? (
          <div>
            <p className="mt-4">Active item: {activeItem.title}</p>
            <p className="mt-2">Path: {activeItem.href}</p>
          </div>
        ) : (
          <p className="mt-4">No item selected</p>
        )}
      </div>
    </div>
  )
}