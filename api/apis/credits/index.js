import { decreaseCredits } from './decrease-credits/controller'
import { decreaseCreditsValidator } from './decrease-credits/validators'

export const creditRoutes = {
  decrease: [decreaseCreditsValidator, decreaseCredits]
}
