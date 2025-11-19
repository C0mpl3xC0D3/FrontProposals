'use client'

import { MainLayout } from '@/components/layout/main-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, DollarSign, CheckCircle2, Plus, ExternalLink, Clock } from 'lucide-react'
import Link from 'next/link'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const proposals = [
  {
    id: '1',
    title: 'Q4 Community Meetup & Workshop Series',
    dao: 'MetaDAO',
    status: 'in-progress',
    progress: 65,
    budgetUsed: 15000,
    budgetTotal: 50000,
    snapshotId: 'proposal-123',
  },
  {
    id: '2',
    title: 'Treasury Diversification Strategy 2025',
    dao: 'MetaDAO',
    status: 'in-progress',
    progress: 30,
    budgetUsed: 5000,
    budgetTotal: 100000,
    snapshotId: 'proposal-456',
  },
]

const stats = [
  {
    title: 'Proposals Activas',
    value: '2',
    icon: TrendingUp,
    color: 'text-blue-500',
  },
  {
    title: 'Presupuesto Total',
    value: '$150,000',
    icon: DollarSign,
    color: 'text-green-500',
  },
  {
    title: 'Completadas',
    value: '0',
    icon: CheckCircle2,
    color: 'text-purple-500',
  },
]

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Gestiona y da seguimiento a tus proposals activas
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select defaultValue="metadao">
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="metadao">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-primary" />
                    MetaDAO
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <Link href="/proposals/new">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nueva Proposal
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.title} className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={cn("h-5 w-5", stat.color)} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Proposals Activas */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Proposals Activas</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            {proposals.map((proposal) => (
              <Card key={proposal.id} className="glass-card hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1 flex-1">
                      <CardTitle className="text-lg leading-tight">
                        {proposal.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{proposal.dao}</span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="gap-1">
                      <Clock className="h-3 w-3" />
                      In progress
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progreso</span>
                      <span className="font-semibold">{proposal.progress}%</span>
                    </div>
                    <Progress value={proposal.progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between text-sm pt-2 border-t border-border">
                    <div>
                      <span className="text-muted-foreground">Presupuesto</span>
                      <p className="font-semibold">
                        ${proposal.budgetUsed.toLocaleString()} / ${proposal.budgetTotal.toLocaleString()}
                      </p>
                    </div>
                    <Link href={`/proposals/${proposal.id}`}>
                      <Button variant="outline" size="sm">
                        Ver Proposal
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
