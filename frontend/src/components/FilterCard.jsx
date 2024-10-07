import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'

const data = [
  {
    filterType: "Location",
    array: ["Banglore", "Noida", "Mumbai", "Gurgaon", "Pune", "Hydrabad"]
  },
  {
    filterType: "Skills",
    array: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Devops Engineer", "Machine Learning", "Artifecial Inteligence"]
  },
  {
    filterType: "Experiance",
    array: ["Fresher", "1 Year", "2 year", "3 year", "4 year", "5+ year"]
  },
  {
    filterType: "Salary",
    array: ["0-40k", "45k-1Lakh", "1Lakh-2Lakh", "2Lakh-3Lakh", "3Lakh-5Lakh", "5Lakh-10Lakh", "10Lakh-20Lakh", "20Lakh-30Lakh"]
  }
]
export default function FilterCard() {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch()
  const changeRadioHandler = (value) => {
    setSelectedValue(value)
  }

  useEffect(() => {
    dispatch(setSearchQuery(selectedValue))
  }, [selectedValue])
  return (
    <div className='w-full shadow-xl border p-3 rounded-md'>
      <h1 className='font-xl font-bold'>Filter Jobs</h1>
      <hr className='mt-3' />
      <RadioGroup value={selectedValue} onValueChange={changeRadioHandler}>
        {
          data.map((data, index) => {
            return (
              <div key={index}>
                <Accordion type="single" collapsible>
                  <AccordionItem value={`item-${index}`}>
                    <h1 className='font-bold text-lg'>
                      <AccordionTrigger>{data.filterType}</AccordionTrigger>
                    </h1>
                    {
                      data.array.map((item, idx) => {
                        const itemId = `id${index}-${idx}`;
                        const radioName = `radio-group-${index}`;

                        return (
                          <div key={idx}>
                            <AccordionContent className='flex items-center gap-2 my-1'>
                              <RadioGroupItem value={item} id={itemId} name={radioName} />
                              <Label htmlFor={itemId}>{item}</Label>
                            </AccordionContent>
                          </div>
                        );
                      })
                    }
                  </AccordionItem>
                </Accordion>
              </div>
            );
          })
        }
      </RadioGroup>

    </div>
  )
}
