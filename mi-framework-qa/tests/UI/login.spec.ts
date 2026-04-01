import { test } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test.describe('Login', () => {

  test('login exitoso con credenciales válidas', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('tomsmith', 'SuperSecretPassword!');
    await loginPage.expectSuccessMessage();
  });

  test('login fallido con contraseña incorrecta', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('tomsmith', 'contraseña-incorrecta');
    await loginPage.expectErrorMessage();
  });

  test('login fallido con usuario incorrecto', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('usuariofalso', 'SuperSecretPassword!');
    await loginPage.expectErrorMessage();
  });

});