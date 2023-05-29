import { HttpRequest, HttpHandlerFn } from '@angular/common/http';

export const tokenInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const { user } = JSON.parse(localStorage.getItem('user') as string);
  if (user) {
    return next(
      req.clone({
        setHeaders: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
    );
  }
  return next(req);
};
