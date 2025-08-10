'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useSettings } from '@/lib/hooks/use-settings'
import { Settings as SettingsIcon } from 'lucide-react'
import { useState } from 'react'

export function SettingsPanel() {
  const { settings, updateSettings, resetSettings } = useSettings()
  const [open, setOpen] = useState(false)

  // Load available models (this would typically come from an API)
  const [availableModels, setAvailableModels] = useState<
    Array<{ id: string; name: string }>
  >([
    { id: 'gpt-4o', name: 'GPT-4o' },
    { id: 'gpt-4o-mini', name: 'GPT-4o mini' },
    { id: 'claude-3-5-sonnet-latest', name: 'Claude 3.5 Sonnet' },
    { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash' }
  ])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <SettingsIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Settings</h4>
            <p className="text-sm text-muted-foreground">
              Manage your preferences and settings
            </p>
          </div>

          <div className="grid gap-4">
            {/* Model Settings */}
            <div className="space-y-2">
              <Label>Default Model</Label>
              <Select
                value={settings.defaultModelId}
                onValueChange={value =>
                  updateSettings({ defaultModelId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  {availableModels.map(model => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* UI Settings */}
            <div className="space-y-3">
              <h5 className="font-medium text-sm">UI Preferences</h5>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-reasoning">Show Reasoning</Label>
                  <Switch
                    id="show-reasoning"
                    checked={settings.showReasoning}
                    onCheckedChange={checked =>
                      updateSettings({ showReasoning: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-search">Show Search Results</Label>
                  <Switch
                    id="show-search"
                    checked={settings.showSearchResults}
                    onCheckedChange={checked =>
                      updateSettings({ showSearchResults: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-video">Show Video Results</Label>
                  <Switch
                    id="show-video"
                    checked={settings.showVideoResults}
                    onCheckedChange={checked =>
                      updateSettings({ showVideoResults: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-related">Show Related Questions</Label>
                  <Switch
                    id="show-related"
                    checked={settings.showRelatedQuestions}
                    onCheckedChange={checked =>
                      updateSettings({ showRelatedQuestions: checked })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Export Settings */}
            <div className="space-y-2">
              <Label>Export Format</Label>
              <Select
                value={settings.exportFormat}
                onValueChange={(value: 'json' | 'txt' | 'md') =>
                  updateSettings({ exportFormat: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="txt">Text</SelectItem>
                  <SelectItem value="md">Markdown</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Reset Button */}
            <Button
              variant="outline"
              onClick={resetSettings}
              className="w-full"
            >
              Reset to Defaults
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
