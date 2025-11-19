'use client'

import { MainLayout } from '@/components/layout/main-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, Check } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ConfiguracionPage() {
  return (
    <MainLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
          <p className="text-muted-foreground mt-1">
            Gestiona la configuración de tu DAO y las integraciones
          </p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="integraciones">Integraciones</TabsTrigger>
            <TabsTrigger value="privacidad">Privacidad</TabsTrigger>
            <TabsTrigger value="permisos">Permisos</TabsTrigger>
          </TabsList>

          {/* General Tab */}
          <TabsContent value="general" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Información de la DAO</CardTitle>
                <CardDescription>
                  Información básica de tu organización
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="dao-name">Nombre de la DAO</Label>
                  <Input id="dao-name" defaultValue="MetaDAO" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe tu DAO..."
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Sitio Web</Label>
                  <Input 
                    id="website" 
                    type="url" 
                    placeholder="https://..."
                  />
                </div>
                <Button className="gap-2">
                  <Check className="h-4 w-4" />
                  Guardar Cambios
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integraciones Tab */}
          <TabsContent value="integraciones" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Snapshot</CardTitle>
                    <CardDescription>
                      Conecta con Snapshot para importar proposals aprobadas automáticamente
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                    Conectada
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="snapshot-space">Snapshot Space</Label>
                  <Input id="snapshot-space" defaultValue="metadao.eth" disabled />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sincronización automática</Label>
                    <p className="text-sm text-muted-foreground">
                      Importar proposals automáticamente cuando sean aprobadas
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Button variant="outline">Actualizar Integración</Button>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Discord</CardTitle>
                    <CardDescription>
                      Envía notificaciones a tu servidor de Discord
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-muted text-muted-foreground">
                    No conectado
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="outline">Conectar Discord</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacidad Tab */}
          <TabsContent value="privacidad" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Configuración de Visibilidad</CardTitle>
                <CardDescription>
                  Controla qué información es pública
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Proposals públicas por defecto</Label>
                    <p className="text-sm text-muted-foreground">
                      Las nuevas proposals serán visibles públicamente sin iniciar sesión
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Mostrar documentos públicamente</Label>
                    <p className="text-sm text-muted-foreground">
                      Los documentos marcados como públicos serán accesibles sin autenticación
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Mostrar presupuesto públicamente</Label>
                    <p className="text-sm text-muted-foreground">
                      El presupuesto gastado y aprobado será visible en la vista pública
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Button className="gap-2">
                  <Check className="h-4 w-4" />
                  Guardar Cambios
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Permisos Tab */}
          <TabsContent value="permisos" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Control de Permisos</CardTitle>
                <CardDescription>
                  Gestiona los permisos de los diferentes roles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Aprobar nuevas tareas</Label>
                    <p className="text-sm text-muted-foreground">
                      Las tareas creadas por Contributors requieren aprobación de Admin
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Permitir invitaciones de Contributores</Label>
                    <p className="text-sm text-muted-foreground">
                      Los Contributors pueden invitar nuevos miembros con rol Viewer
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Edición de presupuesto</Label>
                    <p className="text-sm text-muted-foreground">
                      Solo Admins pueden editar el presupuesto de tareas
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Alert className="bg-yellow-500/10 border-yellow-500/20">
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                  <AlertDescription className="text-yellow-500">
                    Los cambios en permisos afectan a todos los usuarios inmediatamente
                  </AlertDescription>
                </Alert>

                <Button className="gap-2">
                  <Check className="h-4 w-4" />
                  Guardar Cambios
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
