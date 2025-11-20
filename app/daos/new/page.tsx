"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ChevronLeft, Save, Sparkles } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useState } from "react"

export default function NewDAOPage() {
  const [enableSnapshot, setEnableSnapshot] = useState(false)

  return (
    <MainLayout>
      <div className="container mx-auto p-6 max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Crear Nueva DAO</h1>
            <p className="text-muted-foreground mt-1">Configura tu organización descentralizada</p>
          </div>
        </div>

        {/* Info Alert */}
        <Alert className="glass-card border-primary/50">
          <Sparkles className="h-4 w-4 text-primary" />
          <AlertDescription>Una vez creada, podrás invitar miembros y comenzar a gestionar proposals</AlertDescription>
        </Alert>

        {/* Main Form */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Información Básica</CardTitle>
            <CardDescription>Los datos esenciales de tu DAO</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="dao-name">Nombre de la DAO *</Label>
              <Input id="dao-name" placeholder="ej: MetaDAO, CommunityDAO..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea id="description" placeholder="Describe el propósito y misión de tu DAO..." rows={4} />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="website">Sitio Web</Label>
                <Input id="website" type="url" placeholder="https://..." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo">Logo URL</Label>
                <Input id="logo" type="url" placeholder="https://..." />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Snapshot Integration */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Integración con Snapshot</CardTitle>
            <CardDescription>Conecta tu espacio de Snapshot para sincronizar proposals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Habilitar integración Snapshot</Label>
                <p className="text-sm text-muted-foreground">Sincroniza automáticamente proposals aprobadas</p>
              </div>
              <Switch checked={enableSnapshot} onCheckedChange={setEnableSnapshot} />
            </div>

            {enableSnapshot && (
              <div className="space-y-2">
                <Label htmlFor="snapshot-space">Snapshot Space *</Label>
                <Input id="snapshot-space" placeholder="ej: metadao.eth" />
                <p className="text-xs text-muted-foreground">El nombre de tu espacio en Snapshot</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Configuración Inicial de Privacidad</CardTitle>
            <CardDescription>Define la visibilidad por defecto</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Proposals públicas</Label>
                <p className="text-sm text-muted-foreground">Las proposals serán visibles sin autenticación</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Documentos públicos</Label>
                <p className="text-sm text-muted-foreground">Los documentos podrán verse sin iniciar sesión</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Presupuesto público</Label>
                <p className="text-sm text-muted-foreground">El uso del presupuesto será visible públicamente</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Link href="/dashboard">
            <Button variant="outline">Cancelar</Button>
          </Link>
          <Button className="gap-2">
            <Save className="h-4 w-4" />
            Crear DAO
          </Button>
        </div>
      </div>
    </MainLayout>
  )
}
