import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// import { AuthGuard } from './guard/auth.guard';
// import { NoAuthGuard } from './guard/no-auth.guard';
// import { throwIfAlreadyLoaded } from './guard/module-import.guard';

// import { TokenInterceptor } from './interceptor/token.interceptor';

@NgModule({
  imports: [HttpClientModule],
  providers: [],
})
export class CoreModule {}
