import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { ButtonGroup } from '@/components/ui/button-group';
import { RiAlignItemHorizontalCenterLine, RiAlignItemLeftLine, RiAlignItemRightLine, RiArrowDownSLine, RiArrowUpSLine, RiBold, RiItalic, RiUnderline } from '@remixicon/react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import ColorPickerPanel from './colorpicker';

type Props = {}

export default function TypographyPanel({ }: Props) {

    const swatches = [
        '#ef4444',
        '#f59e0b',
        '#10b981',
        '#3b82f6',
        '#8b5cf6',
        '#111827',
    ]

    const FONT_MAP = [
        { label: "H1", value: "h1", size: 32 },
        { label: "H2", value: "h2", size: 28 },
        { label: "H3", value: "h3", size: 24 },
        { label: "H4", value: "h4", size: 20 },
        { label: "H5", value: "h5", size: 16 },
        { label: "H6", value: "h6", size: 14 },
    ]

    return (
        <div className='flex flex-col gap-2 w-full max-w-xs w-auto'>
            <div className='flex flex-row justify-between'>
                <ButtonGroup className='flex'>
                    <Button variant="outline"><RiAlignItemLeftLine /></Button>
                    <Button variant="outline"><RiAlignItemHorizontalCenterLine /></Button>
                    <Button variant="outline"><RiAlignItemRightLine /></Button>
                </ButtonGroup>

                <ButtonGroup className='flex'>

                    <ToggleGroup variant="outline" type="multiple">
                        <ToggleGroupItem value="bold" aria-label="Toggle bold">
                            <RiBold />
                        </ToggleGroupItem>
                        <ToggleGroupItem value="italic" aria-label="Toggle italic">
                            <RiItalic />
                        </ToggleGroupItem>
                        <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
                            <RiUnderline />
                        </ToggleGroupItem>
                    </ToggleGroup>

                </ButtonGroup>
            </div>

            <Select>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Fonts" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="light">Inter</SelectItem>
                        <SelectItem value="dark">Prompt</SelectItem>
                        <SelectItem value="system">Kanit</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <div className='flex flex-row gap-2'>
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue defaultValue={"h1"} placeholder="Font size" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            {FONT_MAP.map((f) => (
                                <SelectItem key={f.value} value={f.value}>
                                    {f.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Button variant={"outline"}><RiArrowUpSLine /></Button>
                <Button variant={"outline"}><RiArrowDownSLine /></Button>
            </div>

            <p className='flex text-xs text-current/50'>Fill</p>

            <div className='max-w-sm'>
                <ColorPickerPanel />
            </div>

        </div>
    )
}