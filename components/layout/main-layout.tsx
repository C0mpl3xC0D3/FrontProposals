'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Settings, Users, Plus, Menu, X, Wallet } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Usuarios', href: '/usuarios', icon: Users },
  { name: 'Configuración', href: '/configuracion', icon: Settings },
]

interface MainLayoutProps {
  children: React.ReactNode
  dao?: {
    name: string
    logo?: string
  }
}

export function MainLayout({ children, dao = { name: 'MetaDAO' } }: MainLayoutProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)

  const handleConnectWallet = () => {
    setWalletConnected(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <div className="h-6 w-6 rounded-lg bg-primary-foreground/20" />
              </div>
              <span className="text-xl font-bold">DAOTrack</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navigation.map((item) => {
                const isActive = pathname?.startsWith(item.href)
                return (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      size="sm"
                      className={cn(
                        "gap-2",
                        isActive && "bg-secondary"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Button>
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {walletConnected ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="hidden sm:inline">0x742d...b4b4</span>
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">AJ</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Alice Johnson</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Wallet className="mr-2 h-4 w-4" />
                    Ver Wallet
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setWalletConnected(false)}>
                    Desconectar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={handleConnectWallet} size="sm" className="gap-2">
                <Wallet className="h-4 w-4" />
                <span className="hidden sm:inline">Conectar Wallet</span>
              </Button>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-border md:hidden">
            <nav className="flex flex-col p-4 gap-1">
              {navigation.map((item) => {
                const isActive = pathname?.startsWith(item.href)
                return (
                  <Link key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      size="sm"
                      className={cn("w-full justify-start gap-2", isActive && "bg-secondary")}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Button>
                  </Link>
                )
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
