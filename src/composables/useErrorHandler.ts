import { useToast } from 'primevue/usetoast'
import { ValiError } from 'valibot'

export const useErrorHandler = () => {
  const toast = useToast()

  function handleError(error: unknown) {
    // ⚠️ Be careful with condition order

    if (error instanceof ApiError) {
      toast.add({
        summary: 'Api error',
        detail: error.message,
        severity: 'error'
      })
    } else if (error instanceof ValiError) {
      toast.add({
        summary: 'Validation error',
        detail: error.message,
        severity: 'error'
      })
    } else if (error instanceof Error) {
      toast.add({
        summary: 'Unknown error',
        detail: error.message,
        severity: 'error'
      })
    } else {
      toast.add({
        summary: 'Unknown error',
        detail: error,
        severity: 'error'
      })
    }
  }

  return {
    handleError
  }
}
