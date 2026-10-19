import { test, expect } from '@playwright/test';

test('la API devuelve los 4 productos', async ({ request }) => {
  const respuesta = await request.get('/api/productos');

  expect(respuesta.ok()).toBeTruthy();

  const productos = await respuesta.json();

  expect(productos).toHaveLength(4);
  expect(productos[0]).toHaveProperty('precio');
});

test('todos los productos tienen nombre y precio mayor que cero', async ({ request }) => {
  const respuesta = await request.get('/api/productos');

  expect(respuesta.ok()).toBeTruthy();

  const productos = await respuesta.json();

  expect(Array.isArray(productos)).toBeTruthy();
  expect(productos.length).toBeGreaterThan(0);

  for (const producto of productos) {
    expect(typeof producto.nombre).toBe('string');
    expect(producto.nombre.trim().length).toBeGreaterThan(0);

    expect(typeof producto.precio).toBe('number');
    expect(Number.isFinite(producto.precio)).toBeTruthy();
    expect(producto.precio).toBeGreaterThan(0);
  }
});
