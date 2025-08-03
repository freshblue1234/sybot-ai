'use client'

import { Model } from '@/lib/types/models'
import { getCookie, setCookie } from '@/lib/utils/cookies'
import { isReasoningModel } from '@/lib/utils/registry'
import { Check, ChevronsUpDown, Lightbulb } from 'lucide-react'
import Image from 'next/image'
<<<<<<< HEAD
import { useCallback, useEffect, useMemo, useState } from 'react'
import { createModelId } from '../lib/utils'
import { Button } from './ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
=======
import { useEffect, useState } from 'react'
import { createModelId } from '../lib/utils'
import { Button } from './ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
>>>>>>> 41155a42ae5ee50065317213a1704586c96f7cfd
} from './ui/command'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

function groupModelsByProvider(models: Model[]) {
  return models
    .filter(model => model.enabled)
    .reduce((groups, model) => {
      const provider = model.provider
      if (!groups[provider]) {
        groups[provider] = []
      }
      groups[provider].push(model)
      return groups
    }, {} as Record<string, Model[]>)
}

interface ModelSelectorProps {
  models: Model[]
}

export function ModelSelector({ models }: ModelSelectorProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  useEffect(() => {
    const savedModel = getCookie('selectedModel')
    if (savedModel) {
      try {
        const model = JSON.parse(savedModel) as Model
        setValue(createModelId(model))
      } catch (e) {
        console.error('Failed to parse saved model:', e)
      }
    }
  }, [])

<<<<<<< HEAD
  const handleModelSelect = useCallback((id: string) => {
=======
  const handleModelSelect = (id: string) => {
>>>>>>> 41155a42ae5ee50065317213a1704586c96f7cfd
    const newValue = id === value ? '' : id
    setValue(newValue)
    
    const selectedModel = models.find(model => createModelId(model) === newValue)
    if (selectedModel) {
      setCookie('selectedModel', JSON.stringify(selectedModel))
    } else {
      setCookie('selectedModel', '')
    }
    
    setOpen(false)
<<<<<<< HEAD
  }, [value, models])

  const selectedModel = useMemo(() => 
    models.find(model => createModelId(model) === value), 
    [models, value]
  )
  
  const groupedModels = useMemo(() => 
    groupModelsByProvider(models), 
    [models]
  )
=======
  }

  const selectedModel = models.find(model => createModelId(model) === value)
  const groupedModels = groupModelsByProvider(models)
>>>>>>> 41155a42ae5ee50065317213a1704586c96f7cfd

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
<<<<<<< HEAD
          className="h-8 px-3 text-xs rounded-xl shadow-none focus:ring-0 border-border/50 hover:bg-muted/50 transition-all duration-200 lg:h-9 lg:px-4 lg:text-sm"
        >
          {selectedModel ? (
            <div className="flex items-center gap-2">
              <Image
                src={`/providers/logos/${selectedModel.providerId}.svg`}
                alt={selectedModel.provider}
                width={16}
                height={16}
                className="bg-white rounded-full border shadow-sm lg:w-4 lg:h-4"
              />
              <span className="font-medium truncate max-w-16 lg:max-w-20">
                {selectedModel.name}
              </span>
              {isReasoningModel(selectedModel.id) && (
                <Lightbulb size={12} className="text-accent-blue-foreground flex-shrink-0" />
              )}
            </div>
          ) : (
            <span className="text-muted-foreground">Model</span>
          )}
          <ChevronsUpDown className="ml-2 h-3 w-3 shrink-0 opacity-50 lg:h-4 lg:w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 lg:w-96" align="start">
        <Command>
          <CommandInput placeholder="Search models..." className="h-10" />
          <CommandList className="max-h-64">
=======
          className="text-sm rounded-full shadow-none focus:ring-0"
        >
          {selectedModel ? (
            <div className="flex items-center space-x-1">
              <Image
                src={`/providers/logos/${selectedModel.providerId}.svg`}
                alt={selectedModel.provider}
                width={18}
                height={18}
                className="bg-white rounded-full border"
              />
              <span className="text-xs font-medium">{selectedModel.name}</span>
              {isReasoningModel(selectedModel.id) && (
                <Lightbulb size={12} className="text-accent-blue-foreground" />
              )}
            </div>
          ) : (
            'Select model'
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0" align="start">
        <Command>
          <CommandInput placeholder="Search models..." />
          <CommandList>
>>>>>>> 41155a42ae5ee50065317213a1704586c96f7cfd
            <CommandEmpty>No model found.</CommandEmpty>
            {Object.entries(groupedModels).map(([provider, models]) => (
              <CommandGroup key={provider} heading={provider}>
                {models.map(model => {
                  const modelId = createModelId(model)
                  return (
                    <CommandItem
                      key={modelId}
                      value={modelId}
                      onSelect={handleModelSelect}
<<<<<<< HEAD
                      className="flex justify-between items-center py-2"
                    >
                      <div className="flex items-center gap-3">
                        <Image
                          src={`/providers/logos/${model.providerId}.svg`}
                          alt={model.provider}
                          width={20}
                          height={20}
                          className="bg-white rounded-full border shadow-sm"
                        />
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">
                            {model.name}
                          </span>
                          {isReasoningModel(model.id) && (
                            <Lightbulb size={12} className="text-accent-blue-foreground" />
                          )}
                        </div>
=======
                      className="flex justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <Image
                          src={`/providers/logos/${model.providerId}.svg`}
                          alt={model.provider}
                          width={18}
                          height={18}
                          className="bg-white rounded-full border"
                        />
                        <span className="text-xs font-medium">
                          {model.name}
                        </span>
>>>>>>> 41155a42ae5ee50065317213a1704586c96f7cfd
                      </div>
                      <Check
                        className={`h-4 w-4 ${
                          value === modelId ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
