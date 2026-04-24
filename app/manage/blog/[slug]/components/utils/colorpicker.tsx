'use client'

import React, { useState } from 'react'
import { HexColorPicker, HexColorInput } from 'react-colorful'

import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    Tabs,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs'
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/components/ui/input-group'

export default function ColorPickerPanel() {
    const [color, setColor] = useState('#7F56D9')
    const [opacity, setOpacity] = useState(100)

    const swatches = [
        '#16a34a',
        '#2563eb',
        '#7c3aed',
        '#db2777',
        '#ea580c',
        '#000000',
        '#ffffff',
    ]

    return (
        <div className="w-full max-w-sm mx-auto p-3 border bg-white dark:bg-black/40 backdrop-blur space-y-3">

            <div className="space-y-3">

                <div className="overflow-hidden flex justify-center items-center">
                    <HexColorPicker className='custom-picker' color={color} onChange={setColor} />
                </div>

                <div className="space-y-2">

                    <div className="flex items-center gap-2">
                        <Slider
                            value={[opacity]}
                            onValueChange={(v) => setOpacity(v[0])}
                            max={100}
                            step={1}
                        />
                        <span className="text-xs w-10 text-right">
                            {opacity}%
                        </span>
                    </div>
                </div>

                <div className="flex gap-2 items-center">

                    <button
                        className="w-6 h-6 border hover:scale-110 transition"
                        style={{ backgroundColor: color }}
                    />

                    <div className="flex-1">
                        <HexColorInput
                            color={color}
                            onChange={setColor}
                            className="w-full border px-2 py-1 text-sm"
                        />
                    </div>

                    <InputGroup className='w-16'>
                        <InputGroupInput
                            value={opacity}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "")
                                setOpacity(value === "" ? 0 : Math.min(100, Number(value)))
                            }}
                            className="text-xs"
                        />
                        <InputGroupAddon align="inline-end">
                            <InputGroupText>%</InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>


                </div>

                <div className="flex items-center gap-2 flex-wrap flex justify-between mt-5">
                    {swatches.map((c) => (
                        <button
                            key={c}
                            onClick={() => setColor(c)}
                            className="w-5 h-5 border hover:scale-110 transition"
                            style={{ backgroundColor: c }}
                        />
                    ))}
                </div>

            </div>
        </div>
    )
}