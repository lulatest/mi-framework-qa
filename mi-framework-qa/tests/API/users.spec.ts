import { test, expect } from '@playwright/test';

const BASE_URL = 'https://reqres.in/api';

// Interface para tipar la respuesta
interface Usuario {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

test.describe('API - Usuarios', () => {

  test('GET lista de usuarios devuelve 200 y tiene datos', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users?page=1`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data).toBeDefined();
    expect(body.data.length).toBeGreaterThan(0);

    // Verificamos la estructura del primer usuario
    const usuario: Usuario = body.data[0];
    expect(usuario).toHaveProperty('id');
    expect(usuario).toHaveProperty('email');
    expect(usuario).toHaveProperty('first_name');
  });

  test('GET usuario por ID devuelve datos correctos', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/2`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data.id).toBe(2);
    expect(body.data.email).toBeDefined();
  });

  test('GET usuario inexistente devuelve 404', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/9999`);

    expect(response.status()).toBe(404);
  });

  test('POST crea usuario y devuelve 201', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/users`, {
      data: {
        name: 'Luciana',
        job: 'QA Engineer'
      }
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.name).toBe('Luciana');
    expect(body.job).toBe('QA Engineer');
    expect(body.id).toBeDefined();      // el servidor asignó un ID
    expect(body.createdAt).toBeDefined(); // y una fecha de creación
  });

});