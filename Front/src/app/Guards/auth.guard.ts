import { CanActivateFn } from '@angular/router';
import { Irole } from '../Interfaces/irole';

export const authGuard: CanActivateFn = (route, state) => {

  const token = localStorage.getItem('token');
  const roleclaim: string = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
  const blockedPaths: string[] = [
    '/admin/home',
    '/admin/products',
    '/products/new',
    '/products/edit',
    '/admin/categories',
    '/admin/brands',
    '/admin/users',
    '/admin/users/new',
    '/admin/orders',
    '/admin/order/details',
    '/admin/reviews',
    '/admin/ContactUs'
  ];

  // Check if the current state.url is in the blockedPaths array
  if (blockedPaths.some(path => state.url === path)) {
    if (token) {
      const json = JSON.parse(window.atob(token.split('.')[1]));

      if (Array.isArray(json[roleclaim]) && json[roleclaim].some(e => e === 'Admin')) {
        return true;
      } else {
        if (json[roleclaim] == 'Admin')
        {
          return true;
        }
        else
        {
          return false
        }
      }

    }
    return false;
  }

  if (state.url === "/login" || state.url === "/register") {
    if (token != null)
      return false;
    else
      return true
  }

  if (state.url === "/profile" || state.url === "/Address" || state.url === "/orders" || state.url === "/cart" || state.url === "/favorite" || state.url === "/phones" || state.url === "/phones/add") {
    if (token != null)
      return true
    else
      return false
  }

  return true
};
