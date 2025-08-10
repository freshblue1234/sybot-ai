'use client'

import {
    Copy,
    Eye,
    EyeOff,
    Palette,
    Pause,
    Play,
    Settings,
    Zap
} from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Separator } from './ui/separator'
import {
    ButtonSpinner,
    DataSpinner,
    ErrorSpinner,
    FullScreenSpinner,
    InlineSpinner,
    LoadingSpinner,
    OverlaySpinner,
    Spinner,
    SuccessSpinner
} from './ui/spinner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

export function SpinnerDemo() {
  const [showFullScreen, setShowFullScreen] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)
  const [customText, setCustomText] = useState('Loading...')
  const [customSize, setCustomSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'>('md')
  const [customVariant, setCustomVariant] = useState<'default' | 'dots' | 'pulse' | 'logo' | 'ring' | 'bars' | 'grid' | 'wave'>('default')
  const [customColor, setCustomColor] = useState<'primary' | 'secondary' | 'muted' | 'white' | 'success' | 'warning' | 'error'>('muted')
  const [customSpeed, setCustomSpeed] = useState<'slow' | 'normal' | 'fast'>('normal')
  const [showCode, setShowCode] = useState(false)

  const variants = ['default', 'dots', 'pulse', 'logo', 'ring', 'bars', 'grid', 'wave'] as const
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const
  const colors = ['primary', 'secondary', 'muted', 'white', 'success', 'warning', 'error'] as const
  const speeds = ['slow', 'normal', 'fast'] as const

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Code copied to clipboard!')
  }

  const generateCode = () => {
    return `<Spinner 
  variant="${customVariant}"
  size="${customSize}"
  color="${customColor}"
  speed="${customSpeed}"
  text="${customText}"
/>`
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/60 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Enhanced Spinner Component
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A comprehensive collection of loading spinners with multiple variants, sizes, colors, and speeds. 
          Built with accessibility in mind and optimized for performance.
        </p>
        <div className="flex items-center justify-center gap-2">
          <Badge variant="secondary">8 Variants</Badge>
          <Badge variant="secondary">6 Sizes</Badge>
          <Badge variant="secondary">7 Colors</Badge>
          <Badge variant="secondary">3 Speeds</Badge>
        </div>
      </div>

      <Tabs defaultValue="variants" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="variants">Variants</TabsTrigger>
          <TabsTrigger value="customize">Customize</TabsTrigger>
          <TabsTrigger value="specialized">Specialized</TabsTrigger>
          <TabsTrigger value="interactive">Interactive</TabsTrigger>
        </TabsList>

        <TabsContent value="variants" className="space-y-6">
          {/* Basic Spinner Variants */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Spinner Variants
              </CardTitle>
              <CardDescription>Different animation styles for various use cases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {variants.map((variant) => (
                  <div key={variant} className="flex flex-col items-center space-y-3 p-4 rounded-lg border hover:shadow-md transition-shadow">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <Spinner variant={variant} size="lg" />
                    </div>
                    <Badge variant="secondary" className="capitalize">{variant}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Size Variations */}
          <Card>
            <CardHeader>
              <CardTitle>Size Variations</CardTitle>
              <CardDescription>Different sizes for different contexts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center space-x-8">
                {sizes.map((size) => (
                  <div key={size} className="flex flex-col items-center space-y-2">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <Spinner size={size} />
                    </div>
                    <Badge variant="outline" className="capitalize">{size}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Color Variations */}
          <Card>
            <CardHeader>
              <CardTitle>Color Variations</CardTitle>
              <CardDescription>Different colors for different states and themes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {colors.map((color) => (
                  <div key={color} className="flex flex-col items-center space-y-2">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <Spinner color={color} size="lg" />
                    </div>
                    <Badge variant="secondary" className="capitalize">{color}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Speed Variations */}
          <Card>
            <CardHeader>
              <CardTitle>Speed Variations</CardTitle>
              <CardDescription>Different animation speeds</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center space-x-8">
                {speeds.map((speed) => (
                  <div key={speed} className="flex flex-col items-center space-y-2">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <Spinner speed={speed} size="lg" />
                    </div>
                    <Badge variant="outline" className="capitalize">{speed}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customize" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customization Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Customization
                </CardTitle>
                <CardDescription>Customize your spinner with these options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="text">Text</Label>
                  <Input
                    id="text"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder="Loading..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="variant">Variant</Label>
                  <Select value={customVariant} onValueChange={(value: any) => setCustomVariant(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {variants.map((variant) => (
                        <SelectItem key={variant} value={variant}>
                          {variant.charAt(0).toUpperCase() + variant.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="size">Size</Label>
                    <Select value={customSize} onValueChange={(value: any) => setCustomSize(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {sizes.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size.toUpperCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="color">Color</Label>
                    <Select value={customColor} onValueChange={(value: any) => setCustomColor(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {colors.map((color) => (
                          <SelectItem key={color} value={color}>
                            {color.charAt(0).toUpperCase() + color.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="speed">Speed</Label>
                  <Select value={customSpeed} onValueChange={(value: any) => setCustomSpeed(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {speeds.map((speed) => (
                        <SelectItem key={speed} value={speed}>
                          {speed.charAt(0).toUpperCase() + speed.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Preview</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowCode(!showCode)}
                    >
                      {showCode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(generateCode())}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {showCode ? (
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm overflow-x-auto">
                      <code>{generateCode()}</code>
                    </pre>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-32 bg-muted/50 rounded-lg">
                    <Spinner
                      variant={customVariant}
                      size={customSize}
                      color={customColor}
                      speed={customSpeed}
                      text={customText}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="specialized" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Specialized Spinners</CardTitle>
              <CardDescription>Pre-configured spinners for specific use cases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center space-y-2 p-4 rounded-lg border hover:shadow-md transition-shadow">
                  <ButtonSpinner />
                  <Badge variant="secondary">Button Spinner</Badge>
                </div>
                <div className="flex flex-col items-center space-y-2 p-4 rounded-lg border hover:shadow-md transition-shadow">
                  <DataSpinner />
                  <Badge variant="secondary">Data Spinner</Badge>
                </div>
                <div className="flex flex-col items-center space-y-2 p-4 rounded-lg border hover:shadow-md transition-shadow">
                  <SuccessSpinner />
                  <Badge variant="secondary">Success Spinner</Badge>
                </div>
                <div className="flex flex-col items-center space-y-2 p-4 rounded-lg border hover:shadow-md transition-shadow">
                  <ErrorSpinner />
                  <Badge variant="secondary">Error Spinner</Badge>
                </div>
                <div className="flex flex-col items-center space-y-2 p-4 rounded-lg border hover:shadow-md transition-shadow">
                  <InlineSpinner />
                  <Badge variant="secondary">Inline Spinner</Badge>
                </div>
                <div className="flex flex-col items-center space-y-2 p-4 rounded-lg border hover:shadow-md transition-shadow">
                  <LoadingSpinner variant="ring" color="primary" />
                  <Badge variant="secondary">Custom Loading</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interactive" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Examples</CardTitle>
              <CardDescription>Try out different spinner configurations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => setShowFullScreen(true)}>
                  <Play className="w-4 h-4 mr-2" />
                  Show Full Screen Spinner
                </Button>
                <Button onClick={() => setShowOverlay(true)} variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Show Overlay Spinner
                </Button>
                <Button variant="secondary">
                  <ButtonSpinner />
                  <span className="ml-2">Loading Button</span>
                </Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-semibold">Custom Spinner Examples</h4>
                <div className="flex items-center space-x-4">
                  <Spinner variant="wave" color="success" text="Processing..." />
                  <Spinner variant="grid" color="warning" text="Analyzing..." />
                  <Spinner variant="bars" color="error" text="Error..." />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Accessibility Features */}
          <Card>
            <CardHeader>
              <CardTitle>Accessibility Features</CardTitle>
              <CardDescription>Built-in accessibility support with ARIA labels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Spinner ariaLabel="Loading user data" />
                  <span>With custom ARIA label</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Spinner variant="dots" ariaLabel="Processing payment" />
                  <span>Payment processing spinner</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Spinner variant="ring" ariaLabel="Uploading files" />
                  <span>File upload spinner</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Full Screen Spinner */}
      {showFullScreen && (
        <FullScreenSpinner 
          text="Loading application..." 
          variant="ring" 
          color="primary"
        />
      )}

      {/* Overlay Spinner */}
      {showOverlay && (
        <div className="relative h-64 border rounded-lg">
          <OverlaySpinner 
            text="Loading content..." 
            variant="dots" 
            color="secondary"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-muted-foreground">Content area with overlay spinner</p>
          </div>
        </div>
      )}

      {/* Close buttons for modals */}
      {showFullScreen && (
        <div className="fixed top-4 right-4 z-[60]">
          <Button onClick={() => setShowFullScreen(false)} variant="destructive">
            <Pause className="w-4 h-4 mr-2" />
            Close Full Screen
          </Button>
        </div>
      )}

      {showOverlay && (
        <div className="flex justify-center mt-4">
          <Button onClick={() => setShowOverlay(false)} variant="outline">
            <EyeOff className="w-4 h-4 mr-2" />
            Close Overlay
          </Button>
        </div>
      )}
    </div>
  )
}
