import React, { useState, useEffect, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from 'lucide-react';

interface MeasurementValues {
  [key: string]: string; // Store values as strings, as inputs provide strings
}

interface MeasurementInputFieldGroupProps {
  onMeasurementsChange: (measurements: MeasurementValues, unit: 'cm' | 'in') => void;
  initialMeasurements?: MeasurementValues;
  initialUnit?: 'cm' | 'in';
}

const measurementFieldsConfig = [
  { id: 'neck', label: 'Neck Circumference', tooltip: 'Measure around the base of your neck, where a collar would sit.' },
  { id: 'chest', label: 'Chest Circumference', tooltip: 'Measure around the fullest part of your chest, under the armpits, keeping the tape horizontal.' },
  { id: 'waist', label: 'Waist Circumference', tooltip: 'Measure around your natural waistline, typically the narrowest part of your torso.' },
  { id: 'hips', label: 'Hip Circumference', tooltip: 'Measure around the fullest part of your hips and seat, keeping the tape horizontal.' },
  { id: 'sleeveLength', label: 'Sleeve Length', tooltip: 'With arm relaxed at your side and slightly bent, measure from the shoulder point, down the arm, to the wrist bone.' },
  { id: 'shoulderWidth', label: 'Shoulder Width', tooltip: 'Measure across the back from the tip of one shoulder (acromion bone) to the tip of the other.' },
  { id: 'inseam', label: 'Inseam', tooltip: 'Measure from the crotch seam to the desired trouser length along the inside of the leg.' },
  { id: 'outseam', label: 'Outseam', tooltip: 'Measure from the natural waistline down the outside of the leg to the desired trouser length.' },
  { id: 'thigh', label: 'Thigh Circumference', tooltip: 'Measure around the fullest part of one thigh, typically about 1 inch below the crotch.' },
  { id: 'bicep', label: 'Bicep Circumference', tooltip: 'Measure around the fullest part of one bicep with the arm relaxed at your side.' },
];

const MeasurementInputFieldGroup: React.FC<MeasurementInputFieldGroupProps> = ({
  onMeasurementsChange,
  initialMeasurements = {},
  initialUnit = 'cm',
}) => {
  const [measurements, setMeasurements] = useState<MeasurementValues>(initialMeasurements);
  const [unit, setUnit] = useState<'cm' | 'in'>(initialUnit);

  console.log('MeasurementInputFieldGroup loaded');

  useEffect(() => {
    setMeasurements(initialMeasurements);
  }, [initialMeasurements]);

  useEffect(() => {
    setUnit(initialUnit);
  }, [initialUnit]);

  // Debounced or direct call to onMeasurementsChange
  useEffect(() => {
    onMeasurementsChange(measurements, unit);
  }, [measurements, unit, onMeasurementsChange]);

  const handleInputChange = useCallback((fieldId: string, value: string) => {
    setMeasurements(prev => ({ ...prev, [fieldId]: value }));
  }, []);

  const handleUnitChange = useCallback((newUnit: string) => {
    if (newUnit === 'cm' || newUnit === 'in') {
      setUnit(newUnit as 'cm' | 'in');
    }
  }, []);

  return (
    <TooltipProvider>
      <div className="space-y-8 p-4 border rounded-lg shadow-sm bg-background">
        <div>
          <Label className="text-lg font-semibold mb-2 block">Measurement Unit</Label>
          <RadioGroup value={unit} onValueChange={handleUnitChange} className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cm" id="unit-cm" />
              <Label htmlFor="unit-cm" className="cursor-pointer">Centimeters (cm)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="in" id="unit-in" />
              <Label htmlFor="unit-in" className="cursor-pointer">Inches (in)</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
          {measurementFieldsConfig.map(field => (
            <div key={field.id} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor={field.id} className="text-sm font-medium">
                  {field.label}
                </Label>
                <Tooltip delayDuration={200}>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6 p-0 ml-2 data-[state=delayed-open]:bg-muted data-[state=instant-open]:bg-muted">
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top" align="center" className="max-w-xs text-sm">
                    <p>{field.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id={field.id}
                type="number"
                value={measurements[field.id] || ''}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                placeholder={`e.g., ${unit === 'cm' ? (field.id === 'chest' ? '90' : '30') : (field.id === 'chest' ? '36' : '12')}`}
                min="0"
                step="0.1" // Allow for finer adjustments
                className="text-base"
              />
            </div>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default MeasurementInputFieldGroup;