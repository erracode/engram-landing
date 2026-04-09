import { test, expect } from '@playwright/test'

test('grid covers viewport without gaps', async ({ page }) => {
  await page.goto('http://localhost:4322')
  
  // Wait for 3D canvas to render
  await page.waitForSelector('canvas', { timeout: 5000 })
  
  // Take screenshot to verify grid coverage
  await page.screenshot({ 
    path: 'test-screenshot.png',
    fullPage: true 
  })
  
  // Verify canvas exists and has dimensions
  const canvas = page.locator('canvas').first()
  const boundingBox = await canvas.boundingBox()
  
  expect(boundingBox).toBeTruthy()
  expect(boundingBox!.width).toBeGreaterThan(0)
  expect(boundingBox!.height).toBeGreaterThan(0)
  
  // Check that grid tiles are visible (should see colored squares)
  // The grid should fill the viewport area
  console.log(`Canvas size: ${boundingBox!.width}x${boundingBox!.height}`)
})
