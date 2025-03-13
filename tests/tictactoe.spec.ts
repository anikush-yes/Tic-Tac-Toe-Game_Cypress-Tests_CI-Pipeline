import { test, expect } from '@playwright/test';

test.describe('Tic Tac Toe testing', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://127.0.0.1:5173')
    });

    test('should board be empty and X first player', async ({ page }) => {


        await expect(page.getByTestId('status')).toContainText('Next player: X');
        const squares = await page.locator('.square').all();
        expect(squares).toHaveLength(9);
        for (const square of squares) {
            await expect(square).toBeEmpty();
        }
    });

    test('should players move alternately', async ({ page }) => {

        await page.locator('[data-testid="square-0"]').click();
        await expect(page.locator('[data-testid="square-0"]')).toHaveText('X');
        await expect(page.locator('[data-testid="status"]')).toHaveText('Next player: O');

        await page.locator('[data-testid="square-5"]').click();
        await expect(page.locator('[data-testid="square-5"]')).toHaveText('O');
        await expect(page.locator('[data-testid="status"]')).toHaveText('Next player: X');
    });

    test('should declare winner', async ({ page }) => {


        await page.locator('[data-testid="square-0"]').click(); // X
        await page.locator('[data-testid="square-1"]').click(); // O
        await page.locator('[data-testid="square-3"]').click(); // X
        await page.locator('[data-testid="square-4"]').click(); // O
        await page.locator('[data-testid="square-6"]').click(); // X


        await expect(page.locator('[data-testid="status"]')).toHaveText('Winner: X');
    });

    test('should game reset', async ({ page }) => {



        await page.locator('[data-testid="square-0"]').click(); // X
        await page.locator('[data-testid="square-1"]').click(); // O
        await page.locator('[data-testid="square-3"]').click(); // X
        await page.locator('[data-testid="square-4"]').click(); // O
        await page.locator('[data-testid="square-6"]').click(); // X


        await expect(page.locator('[data-testid="status"]')).toHaveText('Winner: X');


        await page.locator('[data-testid="reset-button"]').click();


        await expect(page.locator('[data-testid="status"]')).toHaveText('Next player: X');


        const squares = await page.locator('.square');
        for (let i = 0; i < await squares.count(); i++) {
            await expect(squares.nth(i)).toBeEmpty();
        }
    });


})