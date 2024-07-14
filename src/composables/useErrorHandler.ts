import { useToast } from 'primevue/usetoast'
import { ValiError } from 'valibot'
import { ApiError } from '@/utils/errors'

type IProps = {
  onApiError: (error: ApiError) => void
  onValiError: (error: ValiError<any>) => void
  onUnknownError: (error: Error) => void
}

export function useErrorHandler(props: Partial<IProps> = {}) {
  const toast = useToast()

  function handleError(error: unknown) {
    // ⚠️ Be careful with condition order

    if (error instanceof ApiError) {
      toast.add({
        summary: 'Api error',
        detail: error.message,
        severity: 'error',
        life: 10_000,
      })
      console.warn(error)

      if (props.onApiError) {
        props.onApiError(error)
      }
    }
    else if (error instanceof ValiError) {
      toast.add({
        summary: 'Validation error',
        detail: error.message,
        severity: 'error',
        life: 10_000,
      })
      console.warn(error)

      if (props.onValiError) {
        props.onValiError(error)
      }
    }
    else if (error instanceof Error) {
      toast.add({
        summary: 'Unknown error',
        detail: error.message,
        severity: 'error',
        life: 10_000,
      })

      if (props.onUnknownError) {
        props.onUnknownError(error)
      }
    }
    else {
      toast.add({
        summary: 'Unknown error',
        detail: error,
        severity: 'error',
        life: 10_000,
      })
    }
  }

  return {
    handleError,
  }
}
