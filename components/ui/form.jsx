import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import * as React from "react"
import { Controller, FormProvider, useFormContext } from "react-hook-form"

const Form = FormProvider

const FormField = ({ ...props }) => <Controller {...props} />

const FormItem = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-2", className)} {...props} />
))
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef(({ className, ...props }, ref) => (
  <Label ref={ref} className={cn(className)} {...props} />
))
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef(({ ...props }, ref) => (
  <Slot ref={ref} {...props} />
))
FormControl.displayName = "FormControl"

const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
  const { error } = useFormField()
  const body = error ? String(error?.message) : children
  if (!body) return null
  return <p ref={ref} className={cn("text-sm font-medium text-destructive", className)} {...props}>{body}</p>
})
FormMessage.displayName = "FormMessage"

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()
  const fieldState = getFieldState(fieldContext.name, formState)
  return { ...fieldContext, ...itemContext, ...fieldState }
}

const FormFieldContext = React.createContext({})
const FormItemContext = React.createContext({})

export { Form, FormControl, FormField, FormItem, FormLabel, FormMessage }
