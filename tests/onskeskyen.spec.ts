import { test, expect } from '../fixtures/auth.fixture';
import { TEST_DATA } from '../testdata/test-data';

test('Complete wishlist lifecycle: create, update, archive and delete', async ({ authenticatedPage }) => {
  // Navigate to overview page
  await authenticatedPage.goto('da/overview');
  
  // Create new wishlist
  await authenticatedPage.locator('[data-testid="plus-button"]').nth(1).click();
  await authenticatedPage.locator('#login-user_title').fill(TEST_DATA.wishlist.title);
  await authenticatedPage.locator('button[data-testid="createWishlistSubmitButton"]').click();
  
  // Verify wishlist was created 
  await expect(authenticatedPage.getByText(TEST_DATA.wishlist.title)).toBeVisible();
 
  await authenticatedPage.getByText(TEST_DATA.wishlist.title).click();

  // Edit wishlist
  await authenticatedPage.locator("button[data-testid='wishlistMoreButton']").click();
  await authenticatedPage.getByText("Rediger").click();
  
  await authenticatedPage.locator('#login-user_title').fill(TEST_DATA.wishlist.updatedTitle);
  await authenticatedPage.locator('#login-user_description').fill(TEST_DATA.wishlist.description);
  await authenticatedPage.locator("#login-user_endDateMonth").click();
  await authenticatedPage.locator(`div[title='${TEST_DATA.wishlist.endDate.month}']`).click();
  await authenticatedPage.locator("#login-user_endDateDay").click();
  await authenticatedPage.locator(`div[title='${TEST_DATA.wishlist.endDate.day}']`).click();
  await authenticatedPage.locator("#login-user_endDateYear").click();
  await authenticatedPage.locator(`div[title='${TEST_DATA.wishlist.endDate.year}']`).click();
  await authenticatedPage.locator("[data-testid='createWishlistSubmitButton']").click();
  
  // Verify wishlist update
  await expect(authenticatedPage.getByText(TEST_DATA.wishlist.updatedTitle)).toBeVisible();
  
  // Archive wishlist
  await authenticatedPage.locator("button[data-testid='wishlistMoreButton']").click();
  await authenticatedPage.getByText("Arkivér ønskeliste").click();
  await authenticatedPage.getByRole('button', { name: 'Arkivér' }).click();
  
  // Navigate to archived wishlists and delete
  await authenticatedPage.locator("button[name='User profile']").click();
  await authenticatedPage.getByText("Arkiveret og udløbet").click();
  await authenticatedPage.getByText(TEST_DATA.wishlist.updatedTitle).click();
  await authenticatedPage.getByText("Slet permanent").click();
  await expect(authenticatedPage.getByText('Slet ønskeliste')).toBeVisible();
  await authenticatedPage.locator("#button-modal-submit").click();
});

test('Wishlist item management: add, edit and delete wish', async ({ authenticatedPage }) => {
  // Navigate to overview page
  await authenticatedPage.goto('da/overview');
  await authenticatedPage.getByText('Min ønskeliste').click();
  
  // Add one item to wishlist
  await authenticatedPage.locator('#new-wish-card-div').click();
  await authenticatedPage.locator('button', { hasText: 'eller opret manuelt' }).click();
  await authenticatedPage.getByTestId('new-wish-form-title-input').fill(TEST_DATA.wish.initial.title);
  await authenticatedPage.locator('#create-wish_description').fill(TEST_DATA.wish.initial.description);
  await authenticatedPage.locator('input[placeholder="0"]').fill(TEST_DATA.wish.initial.price);
  await authenticatedPage.locator('#create-wish_url').fill(TEST_DATA.wish.initial.url);
  await authenticatedPage.getByTestId('new-wish-form-submit-btn').click();
  await expect(authenticatedPage.getByText(TEST_DATA.wish.initial.title)).toBeVisible();

  // Edit the added item
  await authenticatedPage.getByTestId('more-button-popover').click();
  await authenticatedPage.getByText("Rediger ønske").click();
  
  // Update wish details
  await authenticatedPage.getByTestId('new-wish-form-title-input').fill(TEST_DATA.wish.updated.title);
  await authenticatedPage.locator('#edit-wish_description').fill(TEST_DATA.wish.updated.description);
  await authenticatedPage.locator('input[placeholder="0"]').fill(TEST_DATA.wish.updated.price);
  await authenticatedPage.getByTestId('new-wish-form-submit-btn').click();
  
  // Verify the update
  await expect(authenticatedPage.getByText(TEST_DATA.wish.updated.title)).toBeVisible();

  // Delete the added item
  await authenticatedPage.getByTestId('more-button-popover').click();
  await authenticatedPage.getByText("Slet ønske").click();
  await authenticatedPage.getByText('Slet ønske').nth(2).click();
  await authenticatedPage.getByRole('button', { name: 'Slet' }).click();
  await expect(authenticatedPage.getByText('Ønsket blev slettet')).toBeVisible();
});


