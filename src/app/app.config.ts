import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as authenticationEffects from './store/authentication-store/authentication.effects';
import { provideHttpClient } from '@angular/common/http';
import { authReducer } from './store/authentication-store/authentication.reducer'; // Import your reducer

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore({
      // Set up your reducers here
      authentication: authReducer // Register the authentication reducer
    }),
    provideEffects([authenticationEffects]), // Register the authentication effects
    provideHttpClient()
  ]
};
